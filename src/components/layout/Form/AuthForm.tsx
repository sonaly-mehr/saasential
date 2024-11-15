"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import Form from "@/components/ui/Forms/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation, UserRegister } from "@/lib/validationSchema";

import { registerUser } from "@/app/actions/auth.action";
import { FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/Forms/InputField";
import Image from "next/image";
import logo from '../../../../public/assets/images/logo.png'

interface FormProps {
  type: "register" | "login";
}

const AuthForm = ({ type }: FormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAuth = async (data: FieldValues) => {
    setLoading(true);
    try {
      if (type === "register") {
        const { firstName, lastName, email, password } = data;
        const res = await registerUser(firstName, lastName, email, password);
        if (res?.data?.id) {
          toast.success(res.message || "User registered successfully!");
          router.push("/login");
        } else {
          const errorMessage =
            typeof res === "string" ? res : "Something went wrong";
          toast.error(errorMessage);
        }
      } else if (type === "login") {
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (res && res.ok) {
          toast.success("Logged In!");
          router.push("/dashboard");
        } else {
          toast.error("Invalid email or password");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "An unexpected error occurred");
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <Image src={logo} alt="logo" className="w-20 h-20 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">
            {type === "register" ? "Create an Account" : "Sign In"}
          </h2>
        </div>

        <Form
          onSubmit={handleAuth}
          resolver={zodResolver(
            type === "register" ? UserRegister : LoginValidation
          )}
        >
          {type === "register" && (
            <>
              <div className="flex gap-3 items-center mb-4">
                <InputField
                  name="firstName"
                  placeholder="First name"
                  label="First Name"
                  // icon={<CircleUser className="text-gray-400" />}
                />
                <InputField
                  name="lastName"
                  placeholder="Last name"
                  label="Last Name"
                />
              </div>
            </>
          )}
          <InputField
            type="email"
            name="email"
            placeholder="Enter your email"
            label="Email"
            className="mb-4"
          />
          <InputField
            type="password"
            name="password"
            placeholder="Enter your password"
            label="Password"
            className="mb-4"
          />

          <Button type="submit" className="w-full py-3" disabled={loading}>
            {loading ? (
              'Proceccing..'
            ) : type === "register" ? (
              "Register"
            ) : (
              "Log In"
            )}
          </Button>
        </Form>

        <div className="mt-6 text-center">
          {type === "register" ? (
            <Link href="/login" className="text-primary hover:underline">
              <p className="text-sm">Already have an account? Sign In Here</p>
            </Link>
          ) : (
            <Link href="/register" className="text-primary hover:underline">
              <p className="text-sm">Don’t have an account? Register Here</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;