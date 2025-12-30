interface RateLimitData {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests = new Map<string, RateLimitData>();
  private readonly limit: number;
  private readonly windowMs: number;

  constructor(limit = 5, windowMs = 15 * 60 * 1000) { // 5 requests per 15 minutes
    this.limit = limit;
    this.windowMs = windowMs;
  }

  check(identifier: string): { allowed: boolean; remaining: number; reset: Date } {
    const now = Date.now();
    const userData = this.requests.get(identifier);

    if (!userData) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return {
        allowed: true,
        remaining: this.limit - 1,
        reset: new Date(now + this.windowMs),
      };
    }

    if (now > userData.resetTime) {
      // Reset window
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return {
        allowed: true,
        remaining: this.limit - 1,
        reset: new Date(now + this.windowMs),
      };
    }

    if (userData.count >= this.limit) {
      return {
        allowed: false,
        remaining: 0,
        reset: new Date(userData.resetTime),
      };
    }

    userData.count++;
    return {
      allowed: true,
      remaining: this.limit - userData.count,
      reset: new Date(userData.resetTime),
    };
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter();