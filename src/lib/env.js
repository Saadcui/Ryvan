/**
 * Environment variable validation
 * Ensures required env vars are set on startup
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'MONGODB_URI',
  'JWT_SECRET',
];

export function validateEnv() {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please add them to your .env.local file`
    );
  }
}

/**
 * Get environment variable with fallback
 */
export function getEnv(key, fallback = null) {
  const value = process.env[key] || fallback;
  if (!value && !fallback) {
    console.warn(`Environment variable ${key} not found and no fallback provided`);
  }
  return value;
}
