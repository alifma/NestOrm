export const config = () => ({
  jwt_secret: process.env.JWT_SECRET,
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: ['dist/src/entity/*.entity.js'],
    migrations: [
      'dist/src/db/migrations/*.js'
    ],
    logging: true,
    cli: {
      migrationsDir: 'src/db/migrations'
    }
  }
});