// This file parse and export all environment variables

export const nodeEnv = (): string => process.env.NODE_ENV;
export const apiUrl = (): string => process.env.NEXT_PUBLIC_API_URL || '';
export const googleAnalyticsId = (): string => process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';
export const googleVerification = (): string => process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '';
