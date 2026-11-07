// Google Analytics 4 measurement ID for the "Company Portfolio" web stream.
export const gaMeasurementId = 'G-V5E2120Z76';

// Loaded only in production builds, so local development and the browser tests never send visits.
export const analyticsEnabled = process.env.NODE_ENV === 'production';
