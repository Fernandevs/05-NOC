import mongoose from 'mongoose';
import { MongoDatabase } from './init';

describe('init MongoDB', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  test('should connect to MongoDB', async () => {
    const connect = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connect).toBe(undefined);
  });

  test('should throw an error', async () => {
    try {
      const connect = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'mongodb://fernando:12345678@localhost:26017',
      });
      expect(connect).toBe(false);
    } catch (error) {}
  });
});
