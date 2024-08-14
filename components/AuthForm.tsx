"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "./CustomFormField";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions";

const authFormSchema = (type:string) => z.object({
  // sign-up
  firstName: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
  lastName: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
  address: type === 'sign-up' ? z.string().max(50) : z.string().optional(),
  postalCode: type === 'sign-up' ? z.string().min(3).max(6) : z.string().optional(),
  state: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
  dob: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
  city: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
  
  // both
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  
});

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      state: "",
      dob: "",
      city: ""
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    if(type === 'sign-up'){
      const newUser = await signUp(values)
      setUser(newUser)
    }

    if(type === 'sign-in'){
      const user = await signIn({
        email: values.email,
        password: values.password
      })
      if(user) {
        setUser(user)
        router.push('/')
      }
    }

    setIsLoading(false);
  }

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href={"/"}
          className="cursor-pointer items-center flex flex-row gap-1 "
        >
          <Image src={"/icons/logo.svg"} width={32} height={32} alt="logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex gap-1">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600 mt-2">
              {user
                ? "Link your account to continue"
                : "Please fill in the form to continue"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* plaid link */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                <div className="flex justify-between">
                  <CustomFormField
                    form={form}
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                  />
                  <CustomFormField
                    form={form}
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                  />
                </div>
                  <CustomFormField
                    form={form}
                    name="address"
                    label="Address"
                    placeholder="123, Main Street"
                  />
                  <CustomFormField
                    form={form}
                    name="city"
                    label="City"
                    placeholder="ex: Mumbai"
                  />
                  <div className="flex justify-between">
                  <CustomFormField
                    form={form}
                    name="state"
                    label="State"
                    placeholder="ex: Delhi"
                  />
                  <CustomFormField
                    form={form}
                    name="postalCode"
                    label="Postal Code"
                    placeholder="ex: 110001"
                  />
                  </div>
                  <CustomFormField
                    form={form}
                    name="dob"
                    label="Date of Birth"
                    placeholder="dd/mm/yyyy"
                  />
                </>
              )}
              <CustomFormField
                form={form}
                name="email"
                label="Email"
                placeholder="Enter your email address"
              />
              <CustomFormField
                form={form}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />{" "}
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account."}
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "sign-in"}>
              <p className="form-link">
                {type === "sign-in" ? "Sign-up" : "Sign-in"}
              </p>
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
