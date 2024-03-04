import { SignInForm } from "@/features/auth/sign-in-form.server";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import React from "react";
import { Suspense } from "react";
import { Spinner } from "@/shared/ui/spinner";

export default function AuthenticationPage() {
  return (
    <>
      {" "}
      <div className="container relative  flex-col items-center justify-center self-center pt-24">
        <Card className="max-w-[350px] mx-auto">
          <CardHeader className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Войти в аккаунт
            </h1>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Suspense fallback={<Spinner />}>
              <SignInForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
