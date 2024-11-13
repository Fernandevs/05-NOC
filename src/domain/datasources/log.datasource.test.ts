import { SeverityLevel } from '@prisma/client';
import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';

describe('log.datasource.ts LodDatasource', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test-message',
    level: LogSeverityLevel.high,
  });

  class MockLogDatasource extends LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test('should test the abstract class', async () => {
    const log = new MockLogDatasource();

    expect(log).toBeInstanceOf(MockLogDatasource);
    expect(typeof log.saveLog).toBe('function');
    expect(typeof log.getLogs).toBe('function');

    await log.saveLog(newLog);

    const logs = await log.getLogs(LogSeverityLevel.high);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
