import { type Request, type Response, type NextFunction } from "express";

/**
 * Web Analytics middleware for Express
 * 
 * This middleware injects Vercel Web Analytics tracking script into HTML responses.
 * Based on @vercel/analytics v2.0.1
 * 
 * Note: Web Analytics tracks page views and visitor data on the client-side.
 * For API-only servers that return JSON, this middleware won't have an effect
 * unless the server starts serving HTML pages.
 * 
 * @see https://vercel.com/docs/analytics
 * 
 * Usage:
 * ```typescript
 * import { injectWebAnalytics } from './middlewares/webAnalytics.js';
 * app.use(injectWebAnalytics());
 * ```
 */
export function injectWebAnalytics() {
  return (_req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    res.send = function (body: any): Response {
      // Only inject into HTML responses
      const contentType = res.getHeader('content-type');
      const isHtml = contentType && typeof contentType === 'string' && contentType.includes('text/html');

      if (isHtml && typeof body === 'string' && body.includes('</head>')) {
        // Inject Web Analytics script before closing head tag
        // Uses Vercel's standard script path which is served by Vercel's infrastructure
        const webAnalyticsScript = `
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>`;
        
        body = body.replace('</head>', `${webAnalyticsScript}\n</head>`);
      }

      // Call the original send with the potentially modified body
      return originalSend.call(this, body);
    };

    next();
  };
}

/**
 * Get Web Analytics configuration status
 * Useful for health checks or status endpoints
 */
export function getWebAnalyticsStatus() {
  return {
    enabled: true,
    package: '@vercel/analytics',
    version: '^2.0.1',
    type: 'client-side',
    note: 'Web Analytics tracks page views and visitor data in browsers. For API-only responses, metrics are not collected.'
  };
}
