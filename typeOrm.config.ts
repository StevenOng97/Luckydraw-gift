export default {
  // host: process.env.DATABASE_HOST,
  // type: 'postgres',
  // port: process.env.DATABASE_PORT,
  // username: process.env.DATABASE_USERNAME,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_DB_NAME,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'luckydraw-gift', // Modify here\
  migrations: ['src/database/migrations/*.ts'],
  autoLoadEntities: true,
  synchronize: true,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
