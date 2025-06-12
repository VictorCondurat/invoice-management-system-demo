import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      email: 'demo@acme.com',
      password: passwordHash,
      name: 'Demo User',
    },
  });

  const invoices: Prisma.InvoiceCreateManyInput[] = Array.from({
    length: 100,
  }).map(() => ({
    vendor_name: faker.company.name(),
    amount: faker.finance.amount({ min: 50, max: 5000 }),
    due_date: faker.date.soon(),
    description: faker.commerce.productDescription(),
    user_id: user.id,
    paid: faker.datatype.boolean(),
  }));

  await prisma.invoice.createMany({ data: invoices });
}

main().finally(() => prisma.$disconnect());
