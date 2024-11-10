import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '@/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '@/domain/entities/log.entity';

export class PostgresLogDatasource extends LogDatasource {
  private readonly prisma: PrismaClient;
  private readonly severityEnum;

  constructor() {
    super();
    this.prisma = new PrismaClient();
    this.severityEnum = {
      low: SeverityLevel.LOW,
      medium: SeverityLevel.MEDIUM,
      high: SeverityLevel.HIGH,
    };
  }

  async saveLog(log: LogEntity): Promise<void> {
    const level = this.severityEnum[log.level];
    const newLog = await this.prisma.logModel.create({
      data: {
        ...log,
        level,
      },
    });
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = this.severityEnum[severityLevel];
    const logs = await this.prisma.logModel.findMany({
      where: {
        level,
      },
    });

    return logs.map(LogEntity.fromObject);
  }
}
