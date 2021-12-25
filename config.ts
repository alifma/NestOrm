export const config = () => ({
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
    cli: {
      migrationsDir: 'src/db/migrations'
    },
  }
});