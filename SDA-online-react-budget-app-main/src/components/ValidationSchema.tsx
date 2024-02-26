import { z } from "zod";

export const validationSchema = z.object({
  amountData: z.number().positive(),
});

export const tragetValidationSchema = z.object({
  targetData: z.number().positive(),
});

export const transferValidationSchema = z.object({
  transferData: z.number().min(1),
});
