/*import { config } from 'dotenv'
import { Sequelize } from 'sequelize'

config()

// Create a new instance of Sequelize using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || '127.0.0.1', // Use Docker container's IP address or hostname
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Set to true to see SQL queries in the console
  }
)

export default sequelize
*/

import { config } from 'dotenv'
import { Sequelize } from 'sequelize'

config()

// Create a new instance of Sequelize using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || '127.0.0.1', // Use Docker container's IP address or hostname
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false, // Set to true to see SQL queries in the console
  }
)

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

export default sequelize
