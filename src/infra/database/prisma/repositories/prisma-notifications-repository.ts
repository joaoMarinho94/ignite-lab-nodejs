import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repositories';
import { Injectable } from '@nestjs/common/decorators';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });
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
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }
}
