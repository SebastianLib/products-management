import { z } from "zod";
import { roles } from "../constants/roles"; 

export const roleValues = Object.values(roles) as [string, ...string[]];

export const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SigninValues = z.infer<typeof formSchema>;
