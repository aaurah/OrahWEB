import { type Request, type Response, type NextFunction } from "express";

/**
 * Speed Insights middleware for Express
 * 
 * This middleware injects Vercel Speed Insights tracking script into HTML responses.
 * Based on @vercel/speed-insights v2.0.0
 * 
 * Note: Speed Insights tracks client-side Web Vitals (LCP, FID, CLS, etc.)
 * For API-only servers that return JSON, this middleware won't have an effect
 * unless the server starts serving HTML pages.
 * 
 * @see https://vercel.com/docs/speed-insights
 * 
 * Usage:
 * ```typescript
 * import { injectSpeedInsights } from './middlewares/speedInsights.js';
 * app.use(injectSpeedInsights());
 * ```
 */
export function injectSpeedInsights() {
  return (_req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    res.send = function (body: any): Response {
      // Only inject into HTML responses
      const contentType = res.getHeader('content-type');
      const isHtml = contentType && typeof contentType === 'string' && contentType.includes('text/html');

      if (isHtml && typeof body === 'string' && body.includes('</head>')) {
        // Inject Speed Insights script before closing head tag
        // Uses Vercel's standard script path which is served by Vercel's infrastructure
        const speedInsightsScript = `
  <script>
    window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/speed-insights/script.js"></script>`;
        
        body = body.replace('</head>', `${speedInsightsScript}\n</head>`);
      }

      // Call the original send with the potentially modified body
      return originalSend.call(this, body);
    };

    next();
  };
}

/**
 * Get Speed Insights configuration status
 * Useful for health checks or status endpoints
 */
export function getSpeedInsightsStatus() {
  return {
    enabled: true,
    package: '@vercel/speed-insights',
    version: '^2.0.0',
    type: 'client-side',
    note: 'Speed Insights tracks client-side performance metrics in browsers. For API-only responses, metrics are not collected.'
  };
}
