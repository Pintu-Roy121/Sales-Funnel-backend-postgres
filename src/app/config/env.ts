import dotenv from "dotenv";

dotenv.config();

type TEnvVars = {
  PORT: string;
  DATABASE_URL: string;
  NODE_ENV: string;
  BCRYPT_SALT_ROUND: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
};

const loadEnvVariables = (): TEnvVars => {
  const requireEnvVariables: string[] = [
    "PORT",
    "DATABASE_URL",
    "NODE_ENV",
    "BCRYPT_SALT_ROUND",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD"
  ];

  const missing = requireEnvVariables.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing environment variables: ${missing.join(", ")}.\n` +
      "Create a .env file (see .env.example) or export these vars before running.",
    );
  }

  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  };
};

export const envVars = loadEnvVariables();
