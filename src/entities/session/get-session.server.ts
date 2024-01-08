"use server";
import { nextAuthConfig } from "@/shared/lib/auth";
import { getServerSession } from "next-auth";

export const getSession = () => getServerSession(nextAuthConfig);
