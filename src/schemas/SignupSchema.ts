import { z } from "zod";
import { roles } from "../constants/roles"; 

export const roleValues = Object.values(roles) as [string, ...string[]];

export const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(1, "Full Name is required"),
  otp: z.string().min(1, "Password is required"),
  mobile: z.string().min(1, "Phone number is required"),
  role: z.enum(roleValues),
});

export type SignupValues = z.infer<typeof formSchema>;
