'use client';

import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

export const userNameSchema = {
  user_name: z.string().min(2, {
    message: 'Email must be at least 2 characters.',
  }),
};

export type UserNameValue = {
  user_name: string;
};

export type UserNameDefaultValue = (defaultValue: string) => UserNameValue;
export const userNameDefaultValue: UserNameDefaultValue = defaultValue => ({
  user_name: defaultValue,
});

export const UserNameInputForm: React.FC<{ form: UseFormReturn<any> }> = ({ form }) => (
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
