const LIMIT = 10; // requests per IP per day

type Result = { allowed: boolean; remaining: number; resetAt: number };

function nextMidnightUTC() {
  const now = new Date();
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return d.getTime();
}

const inMemory = new Map<string, { count: number; resetAt: number }>();

export async function consumeRequest(ip: string): Promise<Result> {
  // Dev mode: bypass rate limiting entirely
  if (process.env.NODE_ENV === 'development') {
    return { allowed: true, remaining: 999, resetAt: nextMidnightUTC() };
  }

  const today = new Date().toISOString().slice(0, 10);
  const key = `ai:rate:${ip}:${today}`;
  const resetAt = nextMidnightUTC();

  // Fallback in-memory limiter
  let entry = inMemory.get(key);
  if (!entry || entry.resetAt <= Date.now()) {
    entry = { count: 0, resetAt };
    inMemory.set(key, entry);
  }
  entry.count += 1;
  const allowed = entry.count <= LIMIT;
  return { allowed, remaining: Math.max(0, LIMIT - entry.count), resetAt };
}

export async function getRemaining(ip: string): Promise<{ remaining: number; resetAt: number }> {
  const today = new Date().toISOString().slice(0, 10);
  const key = `ai:rate:${ip}:${today}`;
  const resetAt = nextMidnightUTC();

  const entry = inMemory.get(key);
  const used = entry ? entry.count : 0;
  return { remaining: Math.max(0, LIMIT - used), resetAt };
}
