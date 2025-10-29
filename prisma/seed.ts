import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      name: 'BRONZE',
      description: 'Plano básico com funcionalidades limitadas',
      price: 0,
    },
    {
      name: 'SILVER',
      description: 'Plano intermediário com funcionalidades adicionais',
      price: 29.99,
    },
    {
      name: 'GOLD',
      description: 'Plano completo com todos os recursos',
      price: 59.99,
    },
  ];

  for (const plan of plans) {
    await prisma.plans.upsert({
      where: { name: plan.name },
      update: {},
      create: plan,
    });
  }

  console.log('Seed de planos concluída!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
