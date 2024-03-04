"use client"

import { z } from "zod"

import { Input } from "@/components/ui/input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export const userNameSchema = {
  user_name: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
};

export const userNameDefaultValue = {
  user_name: "",
};

export const UserNameInputForm = ({ form }) => (
  <>
    <FormField
      control={form.control}
      name="user_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>User Name</FormLabel>
          <FormControl>
            <Input placeholder="Name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

