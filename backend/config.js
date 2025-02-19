
const config = {
    server: process.env.DB_AZURE_SERVER,
    database: process.env.DB_AZURE_DATABASE,
    user: process.env.DB_AZURE_USER,
    password: process.env.DB_AZURE_PASSWORD,
    options: {
      encrypt: true,
      //trustedConnection: true,
      enableArithAbort: true,
      trustServerCertificate: false,
    },
};

module.exports = {
    config
}