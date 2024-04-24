'use client';

import Link from 'next/link';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControllerRenderProps, UseFormSetValue, UseFormGetValues, UseFormReturn } from 'react-hook-form';

const EMAIL_VERIFICATION_NONE = 'NONE' as const;
const EMAIL_VERIFICATION_YET = 'YET' as const;
const EMAIL_VERIFICATION_SEND = 'SEND' as const;
const EMAIL_VERIFICATION_VERIFIED = 'VERIFIED' as const;
type EmailStatus =
  | typeof EMAIL_VERIFICATION_NONE
  | typeof EMAIL_VERIFICATION_YET
  | typeof EMAIL_VERIFICATION_SEND
  | typeof EMAIL_VERIFICATION_VERIFIED;

export const emailSchema = {
  email: z.string().min(2, {
    message: 'Email must be at least 2 characters.',
  }),
  email_pin: z.string().min(2, {
    message: 'Pin Number that you accepted by your Email',
  }),
  email_status: z.string().min(2, {}),
};

export type EmailValue = {
  email: string;
  email_pin: string;
  email_status: EmailStatus;
};

export type EmailDefaultValue = (defaultValue: string) => EmailValue;
export const emailDefaultValue: EmailDefaultValue = defaultValue => ({
  email: defaultValue,
  email_pin: '',
  email_status: EMAIL_VERIFICATION_NONE,
});

export type SendEmail = (email: string) => Promise<boolean>;
export type VerifyEmail = (email: string, email_pin: number) => Promise<boolean>;

type EmailOnChange = (
  field: ControllerRenderProps<any, 'email'>,
  setValue: UseFormSetValue<any>,
) => (event: React.ChangeEvent<HTMLInputElement>) => void;
const emailOnChange: EmailOnChange = (field, setValue) => event => {
  if (event.target.value) {
    field.onChange(event);
    setValue('email_status', EMAIL_VERIFICATION_YET);
  } else {
    field.onChange(event);
    setValue('email_status', EMAIL_VERIFICATION_NONE);
  }
};

type EmailSend = (
  getValues: UseFormGetValues<any>,
  setValue: UseFormSetValue<any>,
  sendEmail: SendEmail,
) => () => Promise<void>;
const emailSend: EmailSend = (getValues, setValue, sendEmail) => async () => {
  const email = getValues('email');
  const result = await sendEmail(email);
  if (result) {
    setValue('email_status', EMAIL_VERIFICATION_SEND);
  }
};

type EmailPinOnChange = (
  field: ControllerRenderProps<any, 'email_pin'>,
  getValues: UseFormGetValues<any>,
  setValue: UseFormSetValue<any>,
  verifyEmail: VerifyEmail,
) => (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
const emailPinOnChange: EmailPinOnChange = (field, getValues, setValue, verifyEmail) => async event => {
  const pinNumber = event.target.value;

  field.onChange(event);
  if (pinNumber && pinNumber.length === 6) {
    const email = getValues('email');
    const result = await verifyEmail(email, parseInt(pinNumber));
    if (result) {
      setValue('email_status', EMAIL_VERIFICATION_VERIFIED);
    }
  }
};

// FIXME UseFormReturnの型が合わずanyにしちゃってる
export const EmailInputForm: React.FC<{
  form: UseFormReturn<any>;
  sendEmail: SendEmail;
  verifyEmail: VerifyEmail;
}> = ({ form, sendEmail, verifyEmail }) => {
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
        <Button type="button" onClick={emailSend(form.getValues, form.setValue, sendEmail)}>
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
