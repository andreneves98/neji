module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "NeveS375",
    DB: "nejidb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};