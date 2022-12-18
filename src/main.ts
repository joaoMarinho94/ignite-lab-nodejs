import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const kafkaConsumerService = app.get(KafkaConsumerService);

  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
