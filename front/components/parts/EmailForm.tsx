'use client';

import Link from 'next/link';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const EMAIL_VERIFICATION_NONE = 'NONE';
const EMAIL_VERIFICATION_YET = 'YET';
const EMAIL_VERIFICATION_SEND = 'SEND';
const EMAIL_VERIFICATION_VERIFIED = 'VERIFIED';

export const emailSchema = {
  email: z.string().min(2, {
    message: 'Email must be at least 2 characters.',
  }),
  email_pin: z.string().min(2, {
    message: 'Pin Number that you accepted by your Email',
  }),
  email_status: z.string().min(2, {}),
};

export const emailDefaultValue = defaultValue => ({
  email: defaultValue,
  email_pin: '',
  email_status: EMAIL_VERIFICATION_NONE,
});

const emailOnChange = (field, setValue) => e => {
  if (e.target.value) {
    field.onChange(e);
    setValue('email_status', EMAIL_VERIFICATION_YET);
  } else {
    field.onChange(e);
    setValue('email_status', EMAIL_VERIFICATION_NONE);
  }
};

const emailSend = (getValues, setValue, sendEmail) => async () => {
  const email = getValues('email');
  const result = await sendEmail(email);
  if (result) {
    setValue('email_status', EMAIL_VERIFICATION_SEND);
  }
};

const emailPinOnChange = (field, getValues, setValue, verifyEmail) => async e => {
  const pinNumber = e.target.value;

  field.onChange(e);
  if (pinNumber && pinNumber.length === 6) {
    const email = getValues('email');
    const result = await verifyEmail(email, parseInt(pinNumber));
    if (result) {
      setValue('email_status', EMAIL_VERIFICATION_VERIFIED);
    }
  }
};

export const EmailInputForm = ({ form, sendEmail, verifyEmail }) => {
  const emailStatus = form.getValues('email_status');
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="email" {...field} onChange={emailOnChange(field, form.setValue)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {emailStatus === EMAIL_VERIFICATION_YET && (
        <Button type="botton" onClick={emailSend(form.getValues, form.setValue, sendEmail)}>
          Email Pin Number 送信
        </Button>
      )}
      {emailStatus === EMAIL_VERIFICATION_SEND && (
        <FormField
          control={form.control}
          name="email_pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Pin Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="pin number"
                  onChange={emailPinOnChange(field, form.getValues, form.setValue, verifyEmail)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {emailStatus === EMAIL_VERIFICATION_VERIFIED && <p>Email Verified</p>}
    </>
  );
};
