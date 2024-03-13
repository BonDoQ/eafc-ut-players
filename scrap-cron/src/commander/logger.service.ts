import { Logger } from '@nestjs/common';

export class LoggerService {
  private static logger: Logger;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): Logger {
    if (!LoggerService.logger) {
      LoggerService.logger = new Logger('Commander');
    }
    return LoggerService.logger;
  }
}
