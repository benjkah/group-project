const sql = require("mssql");
const { config } = require("./config");

let database = null;

/*


export default class Database {
    config = {};
    poolconnection = null;
    connected = false;

    constructor(config) {
        this.config = config;
    }

    async connect() {
        try {
            this.poolconnection = await sql.connect(this.config);
            this.connected = true;
            console.log('Database connected successfully.');
            return this.poolconnection;
        } catch (error) {
            console.error('Error connecting to the database:', error);
            this.connected = false;
        }
    }

    async disconnect() {
        try {
            if (this.connected) {
                await this.poolconnection.close();
                this.connected = false;
                console.log('Database disconnected successfully.');
            }
        } catch (error) {
            console.error('Error disconnecting from the database:', error);
        }
    }
}
*/
class Database {
    config = {};
    poolconnection = null;
    connected = false;

    constructor(config) {
        this.config = config;
    }

    async connect() {
        try {
            this.poolconnection = await sql.connect(this.config);
            this.connected = true;
            console.log('Database connected successfully.');
            return this.poolconnection;
        } catch (error) {
            console.error('Error connecting to the database:', error);
            this.connected = false;
        }
    }

    async createPesron(data) {
        const request = this.poolconnection.request();
    
        request.input('id', sql.Int, data.id);
        request.input('name', sql.NVarChar(255), data.name);
    
        const result = await request.query(
            `INSERT INTO role (id, name) VALUES (@id, @name)`
        );
    
        return result.rowsAffected[0];
    }
}

const createDatabaseConnection = async () => {
    database = new Database(config)
    await database.connect() 
    return(database)
}

module.exports = {
    createDatabaseConnection: async () => await createDatabaseConnection(),
    connect: async () => await sql.connect(config),
    database: new Database,
    sql
};


/*


export const createDatabaseConnection = async () => {
    database = new Database(config);
    await database.connect();
    return database;
};
*/