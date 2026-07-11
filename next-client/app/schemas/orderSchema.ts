import { z } from "zod";

export const createOrderSchema = (t: (key: string) => string) => z.object({
    orderName: z.string().min(1, t("errors.orderNameRequired")),
});

// export type OrderFormValues = z.infer<typeof orderSchema>;