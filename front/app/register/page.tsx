"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"

import {
  userNameSchema,
  userNameDefaultValue,
  UserNameInputForm,
} from '@/components/parts/UserNameForm';
import {
  passwordSchema,
  passwordDefaultValue,
  PasswordInputForm,
} from '@/components/parts/PasswordForm';
import {
  emailSchema,
  emailDefaultValue,
  EmailInputForm,
} from '@/components/parts/EmailForm';

import { gql } from 'graphql-request'
import { getFetcher } from "@/lib/fetch"

const FormSchema = z.object({
  ...userNameSchema,
  ...passwordSchema,
  ...emailSchema
});

const registerMutation = gql`
  mutation Register($registerSessionId: Int!, $name: String!, $email: String!, $password: String!) {
    register(input: { register_session_id: $registerSessionId, name: $name, email: $email, password: $password }) {
      ... on User {
        id
        name
        email_information {
          email
        }
      }
      ... on RecordNotFoundError {
        message
      }
    }
  }
`;

const sendEmailMutation = gql`
  mutation SendEmailRegisterSession($email: String!) {
    sendEmail(input: { email: $email }) {
      ... on User {
        id
        name
        email_information {
          email
        }
      }
      ... on AnonymousUser {
        register_session_id
        email
      }
      ... on RecordAlreadyExistError {
        message
      }
      ... on MailSendError {
        message
      }
    }
  }
`;

const verifyEmailMutation = gql`
  mutation VerifyEmailRegisterSession($registerSessionId: Int!, $email: String!, $emailPin: Int!) {
    verifyEmail(input: { register_session_id: $registerSessionId, email: $email, email_pin: $emailPin }) {
      ... on Email {
        email
        verified
      }
      ... on RecordNotFoundError {
        message
      }
    }
  }
`;

const fetcher = getFetcher();

// TODO registerSessionId をうまく渡せるかな
const verifyEmail = (registerSessionId: number, toast) => async (email: string, emailPin: number) => {
  const res = await fetcher(verifyEmailMutation, {
    registerSessionId,
    email,
    emailPin,
  });

  if (res.verifyEmail && res.verifyEmail.verified) { // TODO errorの場合error objectが返ってくる。type guardしたいが
    return true;

  } else {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(res, null, 2)}</code>
        </pre>
      ),
    });
    return false;
  }
};

const sendEmail = (setRegisterSessionId, toast) => async (email: string) => {
  const res = await fetcher(sendEmailMutation, {
    email: email,
  });

  if (res.sendEmail && res.sendEmail.register_session_id) { // TODO errorの場合error objectが返ってくる。type guardしたいが
    setRegisterSessionId(parseInt(res.sendEmail.register_session_id));
    return true;

  } else {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(res, null, 2)}</code>
        </pre>
      ),
    });
    return false;
  }
};

const onSubmit = (registerSessionId, router, toast) => async (formData: z.infer<typeof FormSchema>) => {
  const res = await fetcher(registerMutation, {
    registerSessionId: registerSessionId,
    name: formData.user_name,
    email: formData.email,
    password: formData.password,
  });

  if (res.register && res.register.id) { // TODO errorの場合error objectが返ってくる。type guardしたいが
    router.push('/'); // TODO server componentをreloadしてくれないとlogin userが取得できないが大丈夫？

  } else {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(res, null, 2)}</code>
        </pre>
      ),
    });
  }
}

export default function Register() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...(userNameDefaultValue('')),
      ...passwordDefaultValue,
      ...(emailDefaultValue(''))
    },
  });
  const [ registerSessionId, setRegisterSessionId ] = useState<number>(null);
  const { toast } = useToast();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit(registerSessionId, router, toast))} className="w-2/3 space-y-6">
            <UserNameInputForm form={form} />
            <EmailInputForm 
              form={form}
              verifyEmail={verifyEmail(registerSessionId, toast)}
              sendEmail={sendEmail(setRegisterSessionId, toast)}
            />
            <PasswordInputForm form={form} />
            <Button type="submit">登録</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
