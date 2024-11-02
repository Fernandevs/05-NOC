import { CheckService } from '@/domain/use-cases/checks/ckeck-service';
import { CronService } from '@/presentation/cron/cron-service';

export class Server {
  public static start() {
    CronService.createJob('*/5 * * * * *', () => {
      const url = 'http://google.com';
      new CheckService(
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      ).execute(url);
      // new CheckService().execute('http://localhost:3000');
    });
  }
}
