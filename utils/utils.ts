/**
 * Check if the environment is `production`.
 */
export const isProduction = () => process.env.NODE_ENV === "production";
