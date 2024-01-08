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
import { Profile } from "@/entities/profile/domain";
import { useUpdateProfileMutation } from "../_queries";

const profileFormSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
});

const getDefaultValues = (profile: Profile) => {
  return {
    name: profile.name ?? "",
    email: profile.email ?? "",
    image: profile.image,
  };
};

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({
  profile,
  onSuccess,
  submitText = "Сохранить",
}: {
  profile: Profile;
  onSuccess?: () => void;
  submitText?: string;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(profile),
  });

  const updateProfile = useUpdateProfileMutation();

  function onSubmit(data: ProfileFormValues) {
    updateProfile.mutate(
      { ...profile, ...data },
      {
        onSuccess: async (data) => {
          form.reset(getDefaultValues(data));
          onSuccess?.();
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
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
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватарка</FormLabel>
              <FormControl>
                <AvatarField
                  value={field.value}
                  onChange={field.onChange}
                  profile={profile}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateProfile.isPending}>
          {updateProfile.isPending && (
            <Spinner
              className="mr-2 h-4 w-4 animate-spin"
              label="Обновление профиля"
            />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
