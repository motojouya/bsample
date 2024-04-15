"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"

import { useLoginUser } from "@/app/LoginUserProvider"
import {
  emailSchema,
  emailDefaultValue,
  EmailInputForm,
} from '@/components/parts/EmailForm';

import { gql } from 'graphql-request'
import { getFetcher } from "@/lib/fetch"

const FormSchema = z.object({
  ...emailSchema
});

const changeEmailMutation = gql`
  mutation ChangeEmail($email: String!) {
    changeEmail(input: { email: $email }) {
      id
      name
      email {
        email
      }
    }
  }
`;

const sendEmailMutation = gql`
  mutation SendEmail($email: String!) {
    sendEmail(input: { email: $email })
  }
`;

const verifyEmailMutation = gql`
  mutation VerifyEmailLogined($email: String!, $emailPin: Email!) {
    verifyEmail(input: { register_session_id: null, email: $email, email_pin: $emailPin })
  }
`;

const fetcher = getFetcher();

const sendEmail = (toast) => (email: string) => {
  const { data } = fether(sendEmailMutation, {
    input: {
      email: email,
    }
  });

  if (data) { // TODO errorの場合error objectが返ってくる。type guardしたいが
    return true;

  } else {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    return false;
  }
};

const verifyEmail = (toast) => (email: string, email_pin: string) => {
  const { data } = fether(verifyEmailMutation, {
    input: {
      register_session_id: null,
      email,
      email_pin,
    }
  });

  if (data === true) { // TODO errorの場合error objectが返ってくる。type guardしたいが
    return true;

  } else {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    return false;
  }
};

const onSubmit = (router, toast) => (formData: z.infer<typeof FormSchema>) => {
  const { data } = fether(changeEmailMutation, {
    input: {
      email: formData.email,
    }
  });

  if (data.id) { // TODO errorの場合error objectが返ってくる。type guardしたいが
    router.reload(); // TODO server componentをreloadしてくれないとlogin userが取得できないが大丈夫？

  } else {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
}

export default function Home() {

  const loginUser = useLoginUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...(emailDefaultValue(loginUser.email))
    },
  })

  const { toast } = useToast();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit(router, toast))} className="w-2/3 space-y-6">
            <EmailInputForm
              form={form}
              verifyEmail={verifyEmail(toast)}
              sendEmail={sendEmail(toast)}
            />
            <Button type="submit">登録</Button>
          </form>
        </Form>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Link href={'/setting'}>
          <div className="w-100 h-20 flex items-center">
            <span>設定へ</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
