/**
 * Types for the virtual '@env' module produced by react-native-dotenv
 * (configured in babel.config.js).
 *
 * Every value is optional: babel is set to allowUndefined, so a missing .env
 * yields undefined rather than failing the build. Consumers must supply their
 * own fallback — see src/api/config.tsx.
 */
declare module '@env' {
  export const GOOGLE_MAP_KEY: string | undefined;
  export const ORS_API_KEY: string | undefined;
}
