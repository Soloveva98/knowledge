import { PrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		accelerateUrl: process.env.DATABASE_URL ?? "",
	}).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };

// import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const globalForPrisma = global as unknown as {
// 	prisma: PrismaClient;
// };

// const adapter = new PrismaPg({
// 	connectionString: process.env.DATABASE_URL ?? "",
// });

// const prisma =
// 	globalForPrisma.prisma ||
// 	new PrismaClient({
// 		adapter,
// 	});

// if (process.env.NODE_ENV !== "production") {
// 	globalForPrisma.prisma = prisma;
// }

// export { prisma };
