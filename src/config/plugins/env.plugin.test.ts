import { environment } from './env.plugin';

describe('env.plugin.ts', () => {
  test('should return env options', () => {
    console.log(environment);
    
    expect(environment).toEqual({
      PORT: 3000,
      MAILER_EMAIL: 'ortizfernando05@gmail.com',
      MAILER_SECRET_KEY: 'lror oyqz mqfl evyx',
      MAILER_SERVICE: 'gmail',
      MONGO_URL: 'mongodb://root:12345678@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'root',
      MONGO_PASS: '12345678',
      PROD: false
    });
  });

  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./env.plugin');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
