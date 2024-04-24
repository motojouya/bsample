'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { useToast, ToastFunc } from '@/components/ui/use-toast';

import { LoginUser, useLoginUser } from '@/app/LoginUserProvider';
import { emailSchema, emailDefaultValue, EmailInputForm } from '@/components/parts/EmailForm';

import { gql } from 'graphql-request';
import { getFetcher } from '@/lib/fetch';

export const dynamic = 'force-dynamic';

const FormSchema = z.object({
  ...emailSchema,
});

const changeEmailMutation = gql`
  mutation ChangeEmail($email: String!) {
    changeEmail(input: { email: $email }) {
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
  mutation SendEmailLogined($email: String!) {
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
  mutation VerifyEmailLogined($email: String!, $emailPin: Int!) {
    verifyEmail(input: { register_session_id: null, email: $email, email_pin: $emailPin }) {
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

type SendEmail = (toast: ToastFunc) => (email: string) => Promise<boolean>;
const sendEmail: SendEmail = toast => async email => {
  const res = await fetcher(sendEmailMutation, {
    input: {
      email: email,
    },
  });

  if (res.sendEmail && res.sendEmail.id) {
    // TODO errorの場合error objectが返ってくる。type guardしたいが
    return true;
  } else {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(res, null, 2)}</code>
        </pre>
      ),
    });
    return false;
  }
};

type VerifyEmail = (toast: ToastFunc) => (email: string, email_pin: number) => Promise<boolean>;
const verifyEmail: VerifyEmail = toast => async (email, email_pin) => {
  const res = await fetcher(verifyEmailMutation, {
    input: {
      register_session_id: null,
      email,
      email_pin,
    },
  });

  if (res.verifyEmail && res.verifyEmail.verified) {
    // TODO errorの場合error objectが返ってくる。type guardしたいが
    return true;
  } else {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(res, null, 2)}</code>
        </pre>
      ),
    });
    return false;
  }
};

type OnSubmit = (
  router: AppRouterInstance,
  toast: ToastFunc,
) => (formData: z.infer<typeof FormSchema>) => Promise<void>;
const onSubmit: OnSubmit = (router, toast) => async formData => {
  const res = await fetcher(changeEmailMutation, {
    input: {
      email: formData.email,
    },
  });

  if (res.changeEmail && res.changeEmail.id) {
    // TODO errorの場合error objectが返ってくる。type guardしたいが
    router.refresh(); // TODO server componentをreloadしてくれないとlogin userが取得できないが大丈夫？
  } else {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(res, null, 2)}</code>
        </pre>
      ),
    });
  }
};

const EmailForm: React.FC<{
  loginUser: LoginUser;
  router: AppRouterInstance;
  toast: ToastFunc;
}> = ({ loginUser, router, toast }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...emailDefaultValue(loginUser.email),
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit(router, toast))} className="w-2/3 space-y-6">
            <EmailInputForm form={form} verifyEmail={verifyEmail(toast)} sendEmail={sendEmail(toast)} />
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
};

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();

  const loginUser = useLoginUser();
  if (!loginUser) {
    router.push('/');
    return null;
  } else {
    return <EmailForm loginUser={loginUser} toast={toast} router={router} />;
  }
}
