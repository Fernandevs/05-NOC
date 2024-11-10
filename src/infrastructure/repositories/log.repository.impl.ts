import { LogDatasource } from '@/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '@/domain/entities/log.entity';
import { LogRepository } from '@/domain/repositories/log.repository';

export class LogRepositoryImpl extends LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {
    super();
  }

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
