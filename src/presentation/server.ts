// import { CheckService } from '@/domain/use-cases/checks/ckeck-service';
import { CheckServiceMultiple } from '@/domain/use-cases/checks/ckeck-service-multiple';
// import { SendEmailLogs } from '@/domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '@/infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '@/infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '@/infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '@/infrastructure/repositories/log.repository.impl';
import { CronService } from '@/presentation/cron/cron-service';
// import { EmailService } from '@/presentation/email/email.service';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource());

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
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
