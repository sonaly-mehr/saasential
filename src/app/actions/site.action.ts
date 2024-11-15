"use server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export interface SiteData {
  name: string;
  description: string;
  subdirectory: string;
}

async function isSubdirectoryUnique(subdirectory: string): Promise<boolean> {
  const existingSite = await prisma.site.findUnique({
    where: { subdirectory },
  });
  return !existingSite;
}

type CreateSiteResponse =
  | {
      message: string;
      data: {
        id: string;
        name: string;
        description: string;
        subdirectory: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        userId: string | null;
      };
      error?: undefined;
      redirectTo?: undefined;
    }
  | {
      error: string;
      redirectTo?: string; // Add redirectTo as an optional property
      message?: undefined;
      data?: undefined;
    };

  export async function CreateSiteAction(data: SiteData): Promise<CreateSiteResponse> {
    const session = await getSession();
    const userId = session?.user?.id;
  
    if (!userId) {
      return { error: "User not authenticated" };
    }
  
    const CreateSite = async () => {
      try {
        const siteData = await prisma.site.create({
          data: {
            ...data,
            userId,
          },
        });
  
        return { message: "Site created successfully!", data: siteData };
      } catch (error) {
        return { error: `Site creation failed: ${(error as Error).message}` };
      }
    };
  
    try {
      const [subStatus, sites] = await Promise.all([
        prisma.subscription.findUnique({
          where: { userId },
          select: { status: true },
        }),
        prisma.site.findMany({ where: { userId } }),
      ]);
  
      if (!subStatus || subStatus.status !== "active") {
        if (sites.length < 1) {
          return await CreateSite();
        } else {
          return {
            error: "User already has a site. Upgrade to create more.",
            redirectTo: "/dashboard/pricing",
          };
        }
      } else if (subStatus?.status === "active") {
        return await CreateSite();
      }
  
      // Fallback return in case no conditions match
      return { error: "Unexpected subscription status" };
    } catch (error) {
      return { error: `Unexpected error: ${(error as Error).message}` };
    }
  }

//Get all Site Data
export async function getSiteData() {
  const session = await getSession();
  const userId = session?.user?.id;
  const data = await prisma.site.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

//Get Single Site data Posts
export async function getSingleSiteData(siteId: string) {
  const session = await getSession();
  const userId = session?.user?.id;
  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId,
    },
    select: {
      subdirectory: true,
      posts: {
        select: {
          id: true,
          image: true,
          title: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return data;
}

export async function getPostsBySubdirectory(subDir: string) {
  try {
    const data = await prisma.site.findUnique({
      where: {
        subdirectory: subDir,
      },
      select: {
        id: true,
        name: true,
        posts: {
          select: {
            smallDescription: true,
            title: true,
            image: true,
            createdAt: true,
            slug: true,
            id: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function UpdateImage(formData: FormData) {
  const session = await getSession();
  const userId = session?.user?.id;

  await prisma.site.update({
    where: {
      id: formData.get("siteId") as string,
      userId,
    },
    data: {
      imageUrl: formData.get("imageUrl") as string,
    },
  });
  return true;
}

export async function DeleteSite(formData: FormData) {
  const session = await getSession();
  const userId = session?.user?.id;
  try {
    await prisma.site.delete({
      where: {
        id: formData.get("siteId") as string,
        userId,
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting site:", error);
    return false;
  }
}

// Get Sites and post

export async function getData() {
  const session = await getSession();
  const userId = session?.user?.id;

  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.post.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);
  return { sites, articles };
}
