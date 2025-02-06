const sql = require("mssql");
const { config } = require("./config");

let database = null;

async function executeQuery(query, values = [], paramNames = [], isStoredProcedure = true, outputParamName = null) {
    try {
      const pool = await sql.connect(config);
      const request = pool.request();
  
      if (values && paramNames) {
        for (let i = 0; i < values.length; i++) {
          request.input(paramNames[i], values[i]);
        }
      }
  
      // Handle output parameter
      if (outputParamName) {
        request.output(outputParamName, sql.Int);
      }
      
      // console.log("VALUES ", values);
      // console.log("PARAM ", paramNames);
      // console.log("QUERY " , query);
      // console.log("REQUEST ", request.parameters);
      values.forEach((val, index) => {
        if (typeof val === 'undefined') {
          console.error(`Undefined value found for ${paramNames[index]}`);
        }
      });
      
      let result;
      if (isStoredProcedure) {
        result = await request.execute(query);
      } else {
        result = await request.batch(query);
      }
  
      if (outputParamName) {
        result = { ...result, [outputParamName]: request.parameters[outputParamName].value };
      }
  
      return result;
    
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

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
/*
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

    async getUser(data) {
        config.log("Hej")
        const request = this.poolconnection.request();
        const result = await request.query(`SELECT TOP (10) * FROM [dbo].[person]`);

        return result.recordsets[0];
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
*/

/*


export const createDatabaseConnection = async () => {
    database = new Database(config);
    await database.connect();
    return database;
};
*/

module.exports = {
    connect: () => sql.connect(config),
    sql,
    executeQuery
  };