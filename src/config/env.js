import { toBoolean, toInt } from 'validator'

(!process.env.IS_PRODUCTION) && require('dotenv').config()

const env = process.env

export default {
    SERVICE_PORT: env.PORT || 3000,
    NODE_ENV: env.NODE_ENV,
    IS_PRODUCTION: env.IS_PRODUCTION,
    DB_LOGS: toBoolean(env.DB_LOGS),
    GKEY: env.GKEY,
    SERVICE_DB: {
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        host: env.DB_HOSTNAME,
        port: env.DB_PORT,
    },
    DB_OPTIONS: {
        timezone: toBoolean(env.DB_OPTIONS_TIMEZONE),
        supportBigNumbers: toBoolean(env.DB_OPTIONS_SUPPORTBIGNUMBERS),
        dateStrings: toBoolean(env.DB_OPTIONS_DATESTRINGS),
        multipleStatements: toBoolean(env.DB_OPTIONS_MULTIPLESTATEMENTS),
        maxPoolConnections: toInt(env.DB_OPTIONS_MAXPOOLCONNECTIONS),
    },
}