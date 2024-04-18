"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { useToast } from "@/components/ui/use-toast"

import {
  userIdSchema,
  userIdDefaultValue,
  UserIdInputForm,
} from '@/components/parts/UserIdForm';
import {
  passwordSchema,
  passwordDefaultValue,
  PasswordInputForm,
} from '@/components/parts/PasswordForm';

import { gql } from 'graphql-request'
import { getFetcher } from "@/lib/fetch"

const fetcher = getFetcher();
const query = gql`
  mutation Login($id: ID!, $password: String!) {
    login(input: { id: $id, password: $password }) {
      id
      name
      email_information {
        email
      }
    }
  }
`

const FormSchema = z.object({
  ...userIdSchema,
  ...passwordSchema,
})

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...userIdDefaultValue,
      ...passwordDefaultValue,
    },
  })
  const { toast } = useToast();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit(router, toast))} className="w-2/3 space-y-6">
            <UserIdInputForm form={form} />
            <PasswordInputForm form={form} />
            <Button type="submit">ログイン</Button>
          </form>
        </Form>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Link href={'/register'}>
          <div className="w-100 h-20 flex items-center">
            <span>ユーザ登録</span>
          </div>
        </Link>
      </div>
    </main>
  );
}

const onSubmit = (router, toast) => async (formData: z.infer<typeof FormSchema>) => {

  const { data } = await fetcher(query, {
    input: {
      id: formData.user_id,
      password: formData.password,
    }
  });

  if (data) {
    router.push('/'); // TODO server componentをreloadしてくれないとlogin userが取得できないが大丈夫？

  } else {
    toast({
      title: "login failed!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
};
