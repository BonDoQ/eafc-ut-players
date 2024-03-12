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
  };
};
