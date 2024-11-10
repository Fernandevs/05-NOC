// import { environment } from '@/config/plugins/env.plugin';
// import { LogRepository } from '@/domain/repositories/log.repository';
import { LogSeverityLevel } from '@/domain/entities/log.entity';
import { CheckService } from '@/domain/use-cases/checks/ckeck-service';
// import { SendEmailLogs } from '@/domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '@/infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '@/infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '@/infrastructure/repositories/log.repository.impl';
import { CronService } from '@/presentation/cron/cron-service';
// import { EmailService } from '@/presentation/email/email.service';

const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoLogDatasource()
);

// const emailService = new EmailService();

export class Server {
  public static async start() {
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    // 'ortizfernando05@gmail.com',
    // 'ortizfernando05@outlook.com',
    // ]);
    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs(['ortizfernando05@gmail.com', 'ortizfernando05@outlook.com'])
    CronService.createJob('*/5 * * * * *', () => {
      const url = 'http://google.com';
      new CheckService(
        logRepository,
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
