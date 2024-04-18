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
  userNameSchema,
  userNameDefaultValue,
  UserNameInputForm,
} from '@/components/parts/UserNameForm';

import { gql } from 'graphql-request'
import { getFetcher } from "@/lib/fetch"

const FormSchema = z.object({
  ...userNameSchema,
});

const changeUserInformationMutation = gql`
  mutation ChangeUserInformation($name: String!) {
    changeUserInformation(input: { name: $name }) {
      id
      name
      email_information {
        email
      }
    }
  }
`;

const fetcher = getFetcher();

const onSubmit = (router, toast) => (formData: z.infer<typeof FormSchema>) => {
  const { data } = fether(changeUserInformationMutation, {
    input: {
      name: formData.name,
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
      ...(userNameDefaultValue(loginUser.name)),
    },
  })

  const { toast } = useToast();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit(router, toast))} className="w-2/3 space-y-6">
            <UserNameInputForm form={form} />
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
