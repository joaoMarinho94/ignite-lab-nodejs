import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['renewing-urchin-9074-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'cmVuZXdpbmctdXJjaGluLTkwNzQkiwy7Dz07cy1q0UH7cVW75VRaqpEEmz2wBEk',
          password:
            'pRPW_qWn8w3pPMqp1_ljUA1A_mbUuneGiUV-ZYk-18L1IIufRl5G7SNPXG6D6ZgIHI4teg==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
