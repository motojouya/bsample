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

export const userIdSchema = {
  user_id: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
};

export const userIdDefaultValue = {
  user_id: "",
};

export const UserIdInputForm = ({ form }) => (
  <>
    <FormField
      control={form.control}
      name="user_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>User Id</FormLabel>
          <FormControl>
            <Input placeholder="id" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

