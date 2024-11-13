import { LogEntity, LogSeverityLevel } from './log.entity';

describe('log.entity.ts', () => {
  const data = {
    message: 'test message',
    level: LogSeverityLevel.low,
    origin: 'log.entity.test.ts',
  };

  test('should first create a log entity instance', async () => {
    const log = new LogEntity(data);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(data.message);
    expect(log.level).toBe(data.level);
    expect(log.origin).toBe(data.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a log entity instance form json', async () => {
    const json =
      '{"level":"low","message":"Service http://google.com working","createdAt":"2024-11-10T20:08:20.264Z","origin":"check-service.ts"}';
    const log = LogEntity.fromJson(json);

    expect(log.message).toBe('Service http://google.com working');
    expect(log.level).toBe('low');
    expect(log.origin).toBe('check-service.ts');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a log entity instance from object', async () => {
    const log = LogEntity.fromObject(data);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(data.message);
    expect(log.level).toBe(data.level);
    expect(log.origin).toBe(data.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
