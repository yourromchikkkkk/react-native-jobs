import requireEnv from './requireEnv';

export const EXPO_PUBLIC_RAPID_API_KEY = requireEnv(
  'EXPO_PUBLIC_RAPID_API_KEY',
  process.env.EXPO_PUBLIC_RAPID_API_KEY
);
