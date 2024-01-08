"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import { useEmailSignIn } from "../_vm/use-email-sign-in";
import { generateLink } from "../_lib";

export function EmailSignInForm({ testToken }: { testToken?: string }) {
  const form = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  const emailSignIn = useEmailSignIn({ isTest: !!testToken });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => emailSignIn.signIn(data.email))}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={emailSignIn.isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={emailSignIn.isPending}>
            {emailSignIn.isPending && (
              <Spinner className="mr-2 h-4 w-4 animate-spin" label="Вход" />
            )}
            Войти через Email
          </Button>
          {testToken && emailSignIn.isSuccess && (
            <a
              className="text-sm text-muted-foreground text-underline"
              href={generateLink({
                callbackUrl: emailSignIn.callbackUrl ?? "",
                token: testToken,
                email: form.getValues("email"),
              })}
            >
              Упрощённый тестовый вход
            </a>
          )}
        </div>
      </form>
    </Form>
  );
}
