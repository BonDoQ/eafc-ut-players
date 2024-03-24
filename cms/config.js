module.exports = function (env) {
  return {
    // Railway inputs
    ADMIN_EMAIL: env.ADMIN_EMAIL,
    ADMIN_PASSWORD: env.ADMIN_PASSWORD,
    KEY: env.KEY,
    SECRET: env.SECRET,

    // Reference: https://docs.railway.app/deploy/exposing-your-app
    PORT: env.PORT,

    // Reference: https://docs.railway.app/develop/variables#railway-provided-variables
    PUBLIC_URL: "/",

    // Database variables from Railway PostgreSQL Plugin
    // Reference: https://docs.railway.app/plugins/postgresql
    DB_CLIENT: "pg",
    DB_HOST: env.PGPRIVATEHOST,
    DB_PASSWORD: env.PGPASSWORD,
    DB_USER: env.PGUSER,
    DB_PORT: env.PGPORT,
    DB_DATABASE: env.PGDATABASE,

    // Storage Location
    STORAGE_LOCATIONS: process.env.STORAGE_LOCATIONS,
    STORAGE_R2_DRIVER: process.env.STORAGE_R2_DRIVER,
    STORAGE_R2_KEY: process.env.STORAGE_R2_KEY,
    STORAGE_R2_SECRET: process.env.STORAGE_R2_SECRET,
    STORAGE_R2_ENDPOINT: process.env.STORAGE_R2_ENDPOINT,
    STORAGE_R2_BUCKET: process.env.STORAGE_R2_BUCKET,
    STORAGE_R2_REGION: process.env.STORAGE_R2_REGION,
    STORAGE_R2_ROOT: process.env.STORAGE_R2_ROOT,
  };
};
