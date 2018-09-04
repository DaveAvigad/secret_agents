import Sequelize from 'sequelize'
import operatorsAliases from './op_aliases'
import config from '../config/env'

const { SERVICE_DB, NODE_ENV, DB_OPTIONS, DB_LOGS } = config

/**
 * The database connection.
 *
 * @class SequelizeDB
 */

class SequelizeDB {
    /**
     * Constructor.
     *
     * @class SequelizeDB
     * @constructor
     */
    constructor(db = SERVICE_DB, options = DB_OPTIONS) {
        const { database, host, username, password, port } = db
        this.sequelize = new Sequelize(
            database, username, password, {
                host,
                port,
                operatorsAliases,
                dialect: 'mysql',
                dialectOptions: {
                    timezone: options.timezone,
                    supportBigNumbers: options.multipleStatements,
                    dateStrings: options.multipleStatements,
                    multipleStatements: options.multipleStatements,
                },
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000,
                    acquire: 20000,
                    evict: 5000
                },
                logging: DB_LOGS ? console.log : false,
            }
        )
        
        this.sequelize
            .authenticate()
            .then(() => console.log('%s:: creating instance for schema %s at %s',
                this.constructor.name, database, NODE_ENV
            ))
            .catch(err => console.error('Unable to connect to the database:', err))
        return this.sequelize
    }
}

export default  new SequelizeDB()
