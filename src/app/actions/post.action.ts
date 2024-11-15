"use server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function CreateSitePost(data: any, siteId: string) {
  const session = await getSession();
  const userId = session?.user?.id;
  try {
    const postData = await prisma.post.create({
      data: {
        title: data.title,
        smallDescription: data.smallDescription,
        slug: data.slug,
        articleContent: JSON.parse(data.articleContent),
        image: data.image,
        siteId,
        userId,
      },
    });
    return { message: "Post created successfully!", data: postData };
  } catch (error) {
    throw new Error(`Post creation failed: ${(error as Error).message}`);
  }
}

//Get all Site Data
export async function getSitePostData() {
  const session = await getSession();
  const userId = session?.user?.id;
  const data = await prisma.post.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

//Get single Site post
export async function getSinglePostData(articleId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: articleId,
    },
  });

  return data;
}
export async function EditPostActions(data: any, articleId: string) {
  const session = await getSession();
  const userId = session?.user?.id;

  try{
  const postData = await prisma.post.update({
    where: {
      userId,
      id: articleId,
    },
    data: {
      title: data.title,
      smallDescription: data.smallDescription,
      slug: data.slug,
      articleContent: data.articleContent,
      image: data.image,
    },
  });
  
  console.log("Update result:", postData);
  return { message: "Post updated successfully!", data: postData };
}
  catch (error) {
    throw new Error(`Post updation failed: ${(error as Error).message}`);
  }

}

export async function getPostsBySlug(slug: string) {
  try {
    const data = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
      select: {
        articleContent: true,
        title: true,
        smallDescription: true,
        image: true,
        createdAt: true,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deletePost(postId: string) {
  const session = await getSession();
  const userId = session?.user?.id;

  const data = await prisma.post.delete({
    where: {
      userId,
      id: postId,
    },
  });
  return data;
}
