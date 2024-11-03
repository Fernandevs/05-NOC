import { CheckService } from '@/domain/use-cases/checks/ckeck-service';
import { FileSystemDatasource } from '@/infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '@/infrastructure/repositories/log.repository.impl';
import { CronService } from '@/presentation/cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    CronService.createJob('*/5 * * * * *', () => {
      const url = 'http://google.com';
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      ).execute(url);
      // new CheckService().execute('http://localhost:3000');
    });
  }
}
