"use client"

import { useReducer } from 'react';
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <InputForm />
      </div>
    </main>
  );
}

const EMAIL_ACTION_INPUT = 'INPUT';
const EMAIL_ACTION_SEND = 'SEND';
const EMAIL_ACTION_VERIFIED = 'VERIFIED';
const EMAIL_ACTION_CLEAR = 'CLEAR';

const EMAIL_VERIFICATION_NONE = 'NONE';
const EMAIL_VERIFICATION_YET = 'YET';
const EMAIL_VERIFICATION_SEND = 'SEND';
const EMAIL_VERIFICATION_VERIFIED = 'VERIFIED';

const initialState = { email_verification: EMAIL_VERIFICATION_NONE };

function reducer(state, action) {
  switch (action.type) {
    case EMAIL_ACTION_INPUT:
      return { email_verification: EMAIL_VERIFICATION_YET };
    case EMAIL_ACTION_SEND:
      return { email_verification: EMAIL_VERIFICATION_SEND };
    case EMAIL_ACTION_VERIFIED:
      return { email_verification: EMAIL_VERIFICATION_VERIFIED };
    case EMAIL_ACTION_CLEAR:
      return { email_verification: EMAIL_VERIFICATION_NONE };
    default:
      throw new Error();
  }
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "User Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  email_pin: z.string().min(2, {
    message: "Pin Number that you accepted by your Email",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

function onSubmit(data: z.infer<typeof FormSchema>) {
  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}

const emailOnChange = (dispatch) => (data: any) => {
  console.log('emailOnChange', data.target.value);
  if (data.target.value) {
    dispatch({ type: EMAIL_ACTION_CLEAR });
  } else {
    dispatch({ type: EMAIL_ACTION_INPUT });
  }
}

const emailSend = (dispatch) => () => {
  console.log('emailSend');
  dispatch({ type: EMAIL_ACTION_SEND })
};

const emailPinOnChange = (dispatch) => (data: string) => {
  console.log('emailPinOnChange');
  if (data) {
    dispatch({ type: EMAIL_ACTION_VERIFIED });
  }
};

const EmailInputForm = (form) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="email" {...field} onChange={emailOnChange(dispatch)}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {state.email_verification === EMAIL_VERIFICATION_YET && (
          <Button type="botton" onClick={emailSend(dispatch)}>Email Pin Number 送信</Button>
      )}
      {state.email_verification === EMAIL_VERIFICATION_SEND && (
        <FormField
          control={form.control}
          name="email_pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Pin Number</FormLabel>
              <FormControl>
                <Input type="password" placeholder="pin number" {...field} onChange={emailPinOnChange(dispatch)}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {state.email_verification === EMAIL_VERIFICATION_VERIFIED && (
        <p>Email Verified</p>
      )}
    </>
  );
};

function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      email_pin: "",
      password: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input placeholder="user name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <EmailInputForm form={form} />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">登録</Button>
      </form>
    </Form>
  )
}
