import { z } from "zod";
import { conformZodMessage } from "@conform-to/zod";
import prisma from "./prisma";

export const UserRegister = z.object({
  firstName: z.string().min(1, "Please enter your first name!"),
  lastName: z.string().min(1, "Please enter your last name!"),
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginValidation = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// export const SiteValidation = z.object({
//   name: z.string().min(1, "Please enter site name!"),
//   description: z.string().min(5, "Please enter site description !"),
//   subdirectory: z.string().min(1, "Please enter subdirectory!"),
// });

export const PostValidation = z.object({
  title: z.string().min(1, "Please enter title!"),
  smallDescription: z.string().min(5, "Please enter small description !"),
  slug: z.string().min(1, "Slug is required!"),
  image: z.string().min(1, "Cover image is required"),
  articleContent: z.string().min(5, "Article content is required"),
});

export const UpdatePostValidation = z.object({
  title: z.string().min(1, "Please enter title!"),
  smallDescription: z.string().min(5, "Please enter small description !"),
  slug: z.string().min(1, "Slug is required!"),
  image: z.string().min(1, "Cover image is required"),
  // articleContent: z.().min(5, "Article content is required"),
});

async function isSubdirectoryUnique(subdirectory: string): Promise<boolean> {
  const existingSite = await prisma.site.findUnique({
    where: { subdirectory },
  });
  return !existingSite;
}

export const SiteCreationSchema = z.object({
  subdirectory: z
    .string()
    .min(1, "Please enter subdirectory!")
    .max(40)
    .regex(/^[a-z]+$/, "Subdirectory must only use lowercase letters.")
    .transform((value) => value.toLocaleLowerCase()), // Normalize the value to lowercase
    // .refine(async (subdirectory) => {
    //   const isUnique = await isSubdirectoryUnique(subdirectory); // Asynchronous check
    //   return isUnique; // Return false if not unique
    // }, {
    //   message: "Subdirectory is already taken",
    // }),

  name: z.string().min(1, "Please enter site name!").max(35),
  description: z.string().min(1, "Please enter site description!").max(150),
});