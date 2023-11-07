// This file parse and export all environment variables

export const nodeEnv = () => process.env.NODE_ENV;
export const appUrl = () => process.env.NEXT_PUBLIC_URL || 'http://localhost:8080';
export const apiUrl = () => process.env.NEXT_PUBLIC_API_URL || '';
export const uploadsUrl = () => process.env.NEXT_PUBLIC_UPLOADS_URL || '';
// export const googleAnalyticsId = () => process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';
export const googleVerification = () => process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '';
