import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Invoice } from '@prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string): Promise<Invoice[]> {
    return this.prisma.invoice.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        due_date: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string): Promise<Invoice> {
    const invoice = await this.prisma.invoice.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }
}