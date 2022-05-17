require("dotenv").config();
module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    define: {
        timestamps: true,
        underscored: true
    },
    dialectOptions: {
        useUTC: true,
    },
    timezone: '-03:00',
}