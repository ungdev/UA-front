import { NextResponse, type NextRequest } from 'next/server';

export function generateCsp() {
  // generate random nonce converted to base64. Must be different on every HTTP page load
  const nonce = crypto.randomUUID();

  let csp = [] as { name: string; values: string[] }[];

  // test if CSP is working on development
  if (process.env.NODE_ENV !== 'development') {
    csp = [
      { name: 'default-src', values: ["'self'"] },
      {
        name: 'script-src',
        values: ["'report-sample'", "'self'", `'nonce-${nonce}'`, "'strict-dynamic'"],
      },
      {
        name: 'style-src',
        values: ["'report-sample'", "'self'", `'nonce-${nonce}'`, '*.googleapis.com'],
      },
      {
        name: 'connect-src',
        values: ["'self'", process.env.NEXT_PUBLIC_API_URL!, 'arena.utt.fr', '*.uttnetgroup.fr'],
      },
      { name: 'font-src', values: ["'self'", 'data:', 'fonts.gstatic.com', 'fonts.googleapis.com', 'github.com'] },
      {
        name: 'img-src',
        values: ["'self'", 'data:', 'https://arena.utt.fr'],
      },
      { name: 'worker-src', values: ["'self'", 'blob:'] },
      { name: 'frame-ancestors', values: ["'none'"] },
      { name: 'form-action', values: ["'self'"] },
      { name: 'frame-src', values: ["'self'", 'youtube.com', '*.google.com'] },
    ];
  }

  const cspString = csp
    .map((directive) => {
      return `${directive.name} ${directive.values.join(' ')}`;
    })
    .join('; ');

  return { csp: cspString, nonce };
}

export async function middleware(request: NextRequest) {
  // generate CSP and nonce
  const { csp, nonce } = generateCsp();

  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // set nonce request header to read in pages if needed
  requestHeaders.set('x-nonce', nonce);

  // set CSP header
  // switching for report-only or regular for repro on
  // https://github.com/vercel/next.js/issues/48966
  const headerKey =
    request.nextUrl.pathname === '/csp-report-only' ? 'content-security-policy-report-only' : 'content-security-policy';

  // Set the CSP header so that `app-render` can read it and generate tags with the nonce
  requestHeaders.set(headerKey, csp);

  // create new response
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Also set the CSP so that it is outputted to the browser
  response.headers.set(headerKey, csp);

  return response;
}
