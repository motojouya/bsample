'use client';

import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

export const passwordSchema = {
  password: z.string().min(2, {
    message: 'Email must be at least 2 characters.',
  }),
};

export const passwordDefaultValue = {
  password: '',
};

// FIXME UseFormReturnの型が合わずanyにしちゃってる
export const PasswordInputForm: React.FC<{ form: UseFormReturn<any> }> = ({ form }) => (
  <>
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input placeholder="password" type="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);
