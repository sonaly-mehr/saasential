'use server'
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface RegisterUserResponse {
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
  };
}

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<RegisterUserResponse> => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return { message: "User registered successfully", data: newUser };
  } catch (error) {
    throw new Error(`Registration failed: ${(error as Error).message}`);
  }
};
