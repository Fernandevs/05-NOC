import { Server } from '@/presentation/server';
import { MongoDatabase } from '@/data/mongo';
import { environment } from '@/config/plugins/env.plugin';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: environment.MONGO_DB_NAME,
    mongoUrl: environment.MONGO_URL,
  });

  /* const prisma = new PrismaClient();
  const logs = await prisma.logModel.findMany({
    where: {
      level: 'HIGH'
    }
  }) */

  /* const newLog = await prisma.logModel.create({
    data: {
      level: 'HIGH',
      message: 'Test message',
      origin: 'app.ts',
    }
  }); */

  // console.log(logs);

  Server.start();
}
