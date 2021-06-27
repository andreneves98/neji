module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "neji",
    DB: "nejidb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};