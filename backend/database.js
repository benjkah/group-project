const sql = require("mssql");
const { config } = require("./config");

/**
 * connect to DB
 * @returns 
 */
function connect() {
  return sql.connect(config);
}


/**
 * communicates with the database through sql
 * @param {*} query SQL cood
 * @param {[]} values 
 * @param {[]} paramNames 
 * @param {boolean} isStoredProcedure 
 * @param {null} outputParamName 
 * @returns 
 */
async function executeQuery(
  query,
  values = [],
  paramNames = [],
  isStoredProcedure = true,
  outputParamName = null
) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    if (values && paramNames) {
      for (let i = 0; i < values.length; i++) {
        request.input(paramNames[i], values[i]);
      }
    }

    if (outputParamName) {
      request.output(outputParamName, sql.Int);
    }

    let result;
    if (isStoredProcedure) {
      result = await request.execute(query);
    } else {
      // Use .query instead of .batch if you prefer. For single-statement T-SQL, .query() is typical:
      result = await request.query(query);
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

module.exports = {
  connect,
  executeQuery
};