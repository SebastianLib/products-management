import { z } from "zod";

export const createProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Name is required"),
  price: z
    .number()
    .min(0, "Price must be at least 0")
    .or(z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format").transform(Number)), 
  quantity: z.number().min(0, "Quantity must be at least 0"),
  categoryId: z.number().positive("Category ID must be a positive number"),
});

export type CreateProductSchema = z.infer<typeof createProductFormSchema>;

export const createProductDefaultValues: Partial<CreateProductSchema> = {
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};
