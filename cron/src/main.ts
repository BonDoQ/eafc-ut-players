import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { LoggerService } from './commander/logger.service';

async function bootstrap() {
  const logger = LoggerService.getInstance();
  await CommandFactory.run(AppModule, logger);
}

bootstrap();
