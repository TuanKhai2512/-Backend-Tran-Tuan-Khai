import { Sequelize } from 'sequelize';
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } from './constants';

// Add retry logic for database connection
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
  retry: {
    max: 5,
    timeout: 3000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Function to handle database connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
  } catch (error) {
    process.exit(1);
  }
};

export { sequelize }; 