import { Server } from '@/presentation/server';
import { LogModel, MongoDatabase } from '@/data/mongo';
import { environment } from '@/config/plugins/env.plugin';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: environment.MONGO_DB_NAME,
    mongoUrl: environment.MONGO_URL,
  });

  Server.start();
}
