// This file parse and export all environment variables

export const nodeEnv = (): string => process.env.NODE_ENV;
export const uploadsUrl = (): string => process.env.NEXT_PUBLIC_UPLOADS_URL || '';
export const googleVerification = (): string => process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '';
