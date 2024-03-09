export const databaseConnectionUrl = (): string => {
  const connectionString: string = process.env.MONGO_DB_CONNECTION_URL;
  const connectionPassword: string = process.env.MONGO_DB_CONNECTION_PASSWORD;
  const databaseName: string = process.env.MONGO_DB_NAME;
  const username: string = process.env.MONGO_DB_USER_NAME;
  let connectionStringWithCredentials = connectionString.replace(
    '<password>',
    connectionPassword,
  );
  connectionStringWithCredentials = connectionStringWithCredentials.replace(
    '<database_name>',
    databaseName,
  );
  connectionStringWithCredentials = connectionStringWithCredentials.replace(
    '<username>',
    username,
  );

  return connectionStringWithCredentials;
};
