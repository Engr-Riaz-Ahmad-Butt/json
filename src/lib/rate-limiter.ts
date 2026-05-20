import Redis from 'ioredis';

const LIMIT = 10; // requests per IP per day

type Result = { allowed: boolean; remaining: number; resetAt: number };

function nextMidnightUTC() {
  const now = new Date();
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return d.getTime();
}

// Redis-backed limiter when REDIS_URL is set; otherwise fallback to in-memory Map
const REDIS_URL = process.env.REDIS_URL;
let redis: Redis | null = null;
if (REDIS_URL) {
  try {
    redis = new Redis(REDIS_URL);
  } catch (err) {
    // fall back to in-memory if Redis cannot be initialized
    // eslint-disable-next-line no-console
    console.warn('Failed to initialize Redis for rate-limiter, falling back to in-memory', err);
    redis = null;
  }
}

const inMemory = new Map<string, { count: number; resetAt: number }>();

export async function consumeRequest(ip: string): Promise<Result> {
  const today = new Date().toISOString().slice(0, 10);
  const key = `ai:rate:${ip}:${today}`;
  const resetAt = nextMidnightUTC();

  if (redis) {
    // Use Redis INCR and EXPIRE to maintain counts with TTL until next midnight UTC
    const now = Date.now();
    const ttlSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000));
    try {
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, ttlSeconds);
      }
      const allowed = count <= LIMIT;
      return { allowed, remaining: Math.max(0, LIMIT - count), resetAt };
    } catch (err) {
      // On Redis failure, fall back to in-memory behaviour
      // eslint-disable-next-line no-console
      console.warn('Redis error in rate limiter, falling back to memory', err);
    }
  }

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

  if (redis) {
    try {
      const countStr = await redis.get(key);
      const used = countStr ? parseInt(countStr, 10) : 0;
      return { remaining: Math.max(0, LIMIT - used), resetAt };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Redis error in getRemaining, falling back to memory', err);
    }
  }

  const entry = inMemory.get(key);
  const used = entry ? entry.count : 0;
  return { remaining: Math.max(0, LIMIT - used), resetAt };
}
