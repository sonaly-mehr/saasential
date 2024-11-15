import prisma from "@/lib/prisma";


export const getUser = async(userId: string) => {
    const data = await prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return data;
  }