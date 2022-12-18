import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repositories';
import { Injectable } from '@nestjs/common/decorators';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    throw new Error('Method not implemented.');
  }

  countManyByRecipientId(recipientId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notifition = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notifition) return null;

    return PrismaNotificationMapper.toDomain(notifition);
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }
}
