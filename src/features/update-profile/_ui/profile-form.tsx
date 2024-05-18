"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import { AvatarField } from "./avatar-field";
import { useUpdateProfile } from "../_vm/use-update-profile";
import { UserId } from "@/kernel/domain/user";
import { Profile } from "@/entities/user/profile";

const profileFormSchema = z.object({
  name: z.string().max(30, {
    message: "Username must not be longer than 30 characters.",
  }),
  email: z.string().email(),
  image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const getDefaultValues = (profile: Profile) => ({
  email: profile.email,
  image: profile.image ?? undefined,
  name: profile.name ?? "",
});

export function ProfileForm({
  onSuccess,
  submitText = "Сохранить",
  profile,
  userId,
}: {
  userId: UserId;
  profile: Profile;
  onSuccess?: () => void;
  submitText?: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(profile),
  });

  const updateProfile = useUpdateProfile();

  const handleSubmit = form.handleSubmit(async (data) => {
    const newProfile = await updateProfile.update({
      userId,
      data,
    });

    form.reset(getDefaultValues(newProfile));
    onSuccess?.();
  });

  const email = form.watch("email");
  const name = form.watch("name");

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватарка</FormLabel>
              <FormControl>
                <AvatarField
                  value={field.value}
                  onChange={field.onChange}
                  name={name ?? ""}
                  email={email ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {updateProfile.isPending && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-label="Обновление профиля"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
