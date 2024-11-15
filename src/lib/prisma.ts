import { PrismaClient } from "@prisma/client";

// Singleton instance of PrismaClient
let prisma: PrismaClient | undefined;

const prismaClientSingleton = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

// Define global type for prismaGlobal in development mode
declare global {
  // This makes sure that `global.prismaGlobal` is recognized in TypeScript.
  var prismaGlobal: PrismaClient | undefined;
}

const getPrismaClient = (): PrismaClient => {
  // Ensure the PrismaClient instance is only created once in development mode.
  if (process.env.NODE_ENV !== "production") {
    if (!global.prismaGlobal) {
      global.prismaGlobal = prismaClientSingleton();
    }
    return global.prismaGlobal;
  }

  return prismaClientSingleton();
};

export default getPrismaClient();