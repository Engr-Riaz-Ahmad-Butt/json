const LIMIT = 10; // requests per IP per day

type Result = { allowed: boolean; remaining: number; resetAt: number };

function nextMidnightUTC() {
  const now = new Date();
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return next.getTime();
}

function getLimiterKey(ip: string) {
  const today = new Date().toISOString().slice(0, 10);
  return `ai:rate:${ip}:${today}`;
}

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

async function callUpstash<T = unknown>(segments: Array<string | number>) {
  const config = getRedisConfig();
  if (!config) {
    throw new Error("upstash_not_configured");
  }

  const path = segments.map((segment) => encodeURIComponent(String(segment))).join("/");
  const response = await fetch(`${config.url}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Upstash error ${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as { result?: T };
  return data.result;
}

const inMemory = new Map<string, { count: number; resetAt: number }>();

async function consumeFromMemory(ip: string): Promise<Result> {
  const key = getLimiterKey(ip);
  const resetAt = nextMidnightUTC();

  let entry = inMemory.get(key);
  if (!entry || entry.resetAt <= Date.now()) {
    entry = { count: 0, resetAt };
    inMemory.set(key, entry);
  }

  entry.count += 1;
  const allowed = entry.count <= LIMIT;
  return { allowed, remaining: Math.max(0, LIMIT - entry.count), resetAt };
}

async function getRemainingFromMemory(ip: string) {
  const key = getLimiterKey(ip);
  const resetAt = nextMidnightUTC();
  const entry = inMemory.get(key);
  const used = entry ? entry.count : 0;
  return { remaining: Math.max(0, LIMIT - used), resetAt };
}

async function consumeFromUpstash(ip: string): Promise<Result> {
  const key = getLimiterKey(ip);
  const resetAt = nextMidnightUTC();
  const resetAtSeconds = Math.floor(resetAt / 1000);

  const nextCount = Number((await callUpstash<number | string>(["incr", key])) ?? 0);
  if (nextCount === 1) {
    await callUpstash(["expireat", key, resetAtSeconds]);
  }

  const allowed = nextCount <= LIMIT;
  return { allowed, remaining: Math.max(0, LIMIT - nextCount), resetAt };
}

async function getRemainingFromUpstash(ip: string) {
  const key = getLimiterKey(ip);
  const resetAt = nextMidnightUTC();
  const raw = await callUpstash<number | string | null>(["get", key]);
  const used = raw === null || raw === undefined ? 0 : Number(raw);
  return { remaining: Math.max(0, LIMIT - used), resetAt };
}

export async function consumeRequest(ip: string): Promise<Result> {
  if (process.env.NODE_ENV === "development") {
    return { allowed: true, remaining: 999, resetAt: nextMidnightUTC() };
  }

  if (getRedisConfig()) {
    try {
      return await consumeFromUpstash(ip);
    } catch (error) {
      console.error("[rate-limiter] Falling back to in-memory store:", error);
    }
  }

  return consumeFromMemory(ip);
}

export async function getRemaining(ip: string): Promise<{ remaining: number; resetAt: number }> {
  if (process.env.NODE_ENV === "development") {
    return { remaining: 999, resetAt: nextMidnightUTC() };
  }

  if (getRedisConfig()) {
    try {
      return await getRemainingFromUpstash(ip);
    } catch (error) {
      console.error("[rate-limiter] Falling back to in-memory store:", error);
    }
  }

  return getRemainingFromMemory(ip);
}
