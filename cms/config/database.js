module.exports = ({ env }) => ({
  connection: {
    client: 'mongo',
    connection: {
      uri: env('DATABASE_URI'),
      database: env('DATABASE_NAME'),
    },
    useNullAsDefault: true,
  },
});
