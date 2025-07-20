import { NextApiRequest, NextApiResponse } from 'next';

// Simple rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(clientId: string): {
  allowed: boolean;
  remaining: number;
  reset: number;
  limit: number;
} {
  const now = Date.now();
  const userLimit = rateLimitStore.get(clientId);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset rate limit window
    const resetTime = now + RATE_LIMIT_WINDOW;
    rateLimitStore.set(clientId, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: RATE_LIMIT - 1,
      reset: Math.floor(resetTime / 1000),
      limit: RATE_LIMIT,
    };
  }

  if (userLimit.count >= RATE_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      reset: Math.floor(userLimit.resetTime / 1000),
      limit: RATE_LIMIT,
    };
  }

  userLimit.count++;
  const remaining = Math.max(0, RATE_LIMIT - userLimit.count);
  return {
    allowed: true,
    remaining,
    reset: Math.floor(userLimit.resetTime / 1000),
    limit: RATE_LIMIT,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Check if AI endpoint is configured
  const aiEndpoint = process.env.AI_THEME_ENDPOINT;
  const authToken = process.env.AI_THEME_AUTH_TOKEN;

  if (!aiEndpoint) {
    return res.status(503).json({
      success: false,
      error: 'AI theme generation service is not configured',
    });
  }

  try {
    // Extract the path from the dynamic route
    const { path } = req.query;
    const pathString = Array.isArray(path) ? path.join('/') : path || '';

    // Apply rate limiting for theme generation requests (only in production)
    if (
      req.method === 'POST' &&
      pathString === 'generate-theme' &&
      process.env.NODE_ENV !== 'development'
    ) {
      const clientId =
        (req.headers['x-forwarded-for'] as string) ||
        req.connection.remoteAddress ||
        'unknown';
      const rateLimitResult = checkRateLimit(clientId);

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', rateLimitResult.limit);
      res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining);
      res.setHeader('X-RateLimit-Reset', rateLimitResult.reset);

      if (!rateLimitResult.allowed) {
        return res.status(429).json({
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
          rateLimitInfo: {
            remaining: rateLimitResult.remaining,
            reset: rateLimitResult.reset,
            limit: rateLimitResult.limit,
          },
        });
      }
    }

    // Build target URL
    const targetUrl = `${aiEndpoint}/${pathString}`;

    // Add query parameters if any (excluding the path parameter)
    const { path: _, ...queryParams } = req.query;
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v));
      } else if (value) {
        searchParams.append(key, value);
      }
    });
    const finalUrl = searchParams.toString()
      ? `${targetUrl}?${searchParams}`
      : targetUrl;

    // Prepare headers - copy from incoming request and add auth
    const headers: Record<string, string> = {};

    // Copy relevant headers from the incoming request
    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type'];
    }
    if (req.headers['accept']) {
      headers['Accept'] = req.headers['accept'];
    }

    // Add auth token if available
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    // Prepare body
    let body: string | undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    // Call the external AI service
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(finalUrl, {
      method: req.method,
      headers,
      body,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Copy response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Get the response data
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Forward the status code and response
    res.status(response.status);
    if (typeof data === 'string') {
      res.send(data);
    } else {
      res.json(data);
    }
  } catch (error) {
    console.error('Theme generator middleware error:', error);

    // Handle timeout or network errors
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return res.status(408).json({
          success: false,
          error: 'Request timeout - the AI service took too long to respond',
        });
      }
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to connect to AI theme generation service',
    });
  }
}
