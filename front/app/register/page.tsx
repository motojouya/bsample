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
import useSWR from 'swr'
import { getFetcher } from "@/lib/fetch"

const FormSchema = z.object({
  ...userNameSchema,
  ...passwordSchema,
  ...emailSchema
});

const fetcher = getFetcher();

const registerMutation = gql`
  mutation ($input: RegisterInput) {
    register(input: $input) {
      id
      name
      email {
        email
      }
    }
  }
`;

const sendEmailMutation = gql`
  mutation ($input: SendEmailInput) {
    sendEmail(input: $input)
  }
`;

const verifyEmailMutation = gql`
  mutation ($input: VerifyEmailInput) {
    verifyEmail(input: $input)
  }
`;

// TODO registerSessionId をうまく渡せるかな
const verifyEmail = (registerSessionId, toast) => (email: string, email_pin: string) => {
  const { data } = fether(verifyEmailMutation, {
    input: {
      register_session_id: registerSessionId,
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

const sendEmail = (setRegisterSessionId, toast) => (email: string) => {
  const { data } = fether(sendEmailMutation, {
    input: {
      email: email,
    }
  });

  if (data) { // TODO errorの場合error objectが返ってくる。type guardしたいが
    setRegisterSessionId(data);
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

function onSubmit = (router, toast) => (data: z.infer<typeof FormSchema>) {
  const { data } = fether(registerMutation, {
    input: {
      register_session_id: data.register_session_id,
      name: data.name,
      email: data.email,
      password: data.password,
    }
  });

  if (data.id) { // TODO errorの場合error objectが返ってくる。type guardしたいが
    router.push('/'); // TODO server componentをreloadしてくれないとlogin userが取得できないが大丈夫？

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

export default function Register() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...(userNameDefaultValue('')),
      ...passwordDefaultValue,
      ...(emailDefaultValue(''))
    },
  });
  const [ registerSessionId, setRegisterSessionId ] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit(router, toast))} className="w-2/3 space-y-6">
            <UserNameInputForm form={form} />
            <EmailInputForm 
              form={form}
              registerSessionId={registerSessionId}
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
