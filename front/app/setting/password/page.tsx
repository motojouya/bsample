'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { useToast, ToastFunc } from '@/components/ui/use-toast';

import { passwordSchema, passwordDefaultValue, PasswordInputForm } from '@/components/parts/PasswordForm';
import { useLoginUser } from '@/app/LoginUserProvider';

import { gql } from 'graphql-request';
import { getFetcher } from '@/lib/fetch';

export const dynamic = 'force-dynamic';

const FormSchema = z.object({
  ...passwordSchema,
});

const changePasswordMutation = gql`
  mutation ChangePassword($password: String!) {
    changePassword(input: { password: $password }) {
      id
      name
      email_information {
        email
      }
    }
  }
`;

const fetcher = getFetcher();

type OnSubmit = (router: AppRouterInstance, toast: ToastFunc) => (formData: z.infer<typeof FormSchema>) => Promise<void>;
const onSubmit: OnSubmit = (router, toast) => async formData => {
  const res = await fetcher(changePasswordMutation, {
    input: {
      password: formData.password,
    },
  });

  if (res.changePassword && res.changePassword.id) {
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

const PasswordForm: React.FC<{
  router: AppRouterInstance,
  toast: ToastFunc,
}> = ({ router, toast }) => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...passwordDefaultValue,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit(router, toast))} className="w-2/3 space-y-6">
            <PasswordInputForm form={form} />
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

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();

  const loginUser = useLoginUser();
  if (!loginUser) {
    router.push('/');
    return null;

  } else {
    return (
      <PasswordForm
        toast={toast}
        router={router}
      />
    );
  }
}
