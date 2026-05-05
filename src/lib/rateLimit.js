const WINDOW_MS = 60 * 1000;
const MAX_ENTRIES = 5000;

const globalWithRateLimit = globalThis;

if (!globalWithRateLimit.__routeRateLimitStore) {
  globalWithRateLimit.__routeRateLimitStore = new Map();
}

const store = globalWithRateLimit.__routeRateLimitStore;

function getClientIp(req) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}

function cleanup(now) {
  if (store.size <= MAX_ENTRIES) return;

  for (const [key, value] of store.entries()) {
    if (value.resetAt <= now) store.delete(key);
    if (store.size <= MAX_ENTRIES) break;
  }
}

export function limitByIp(req, routeKey, max = 20, windowMs = WINDOW_MS) {
  const now = Date.now();
  const ip = getClientIp(req);
  const key = `${routeKey}:${ip}`;

  cleanup(now);

  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const nextState = { count: 1, resetAt: now + windowMs };
    store.set(key, nextState);
    return {
      limited: false,
      remaining: Math.max(0, max - 1),
      retryAfter: Math.ceil(windowMs / 1000),
    };
  }

  existing.count += 1;
  if (existing.count > max) {
    return {
      limited: true,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return {
    limited: false,
    remaining: Math.max(0, max - existing.count),
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}
