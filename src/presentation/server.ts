// import { envs } from '@/config/plugins/env.plugin';
// import { CheckService } from '@/domain/use-cases/checks/ckeck-service';
import { SendEmailLogs } from '@/domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '@/infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '@/infrastructure/repositories/log.repository.impl';
// import { CronService } from '@/presentation/cron/cron-service';
import { EmailService } from '@/presentation/email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    new SendEmailLogs(emailService, fileSystemLogRepository).execute([
      'ortizfernando05@gmail.com',
      'ortizfernando05@outlook.com',
    ]);
    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs(['ortizfernando05@gmail.com', 'ortizfernando05@outlook.com'])
    // CronService.createJob('*/5 * * * * *', () => {
    // const url = 'http://google.com';
    // new CheckService(
    // fileSystemLogRepository,
    // () => console.log(`${url} is ok`),
    // (error) => console.error(error)
    // ).execute(url);
    // new CheckService().execute('http://localhost:3000');
    // });
  }
}
