import { Prisma } from "@prisma/client";
import { z } from "zod";

// At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

const passwordMessage =
  "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.";

// Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Register Schema
export const registerSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().regex(passwordRegex, passwordMessage),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["user", "admin"]).optional(),
});

// Types
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type User = Prisma.UserGetPayload<{ omit: { password: true } }>;
export type Product = Prisma.ProductGetPayload<{}>;
