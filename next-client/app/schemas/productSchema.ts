import { z } from "zod";

export const createProductSchema = (t: (key: string) => string) => {
  return z.object({
    productType: z.string().min(1, t('errors.productTypeRequired')),
    productName: z.string().min(1, t('errors.productNameRequired')),
    guaranteeFrom: z.string().min(1, t('errors.dateRequired')),
    guaranteeUntil: z.string().min(1, t('errors.dateRequired')),
    priceUAH: z.coerce.number().gt(0, {message: t('errors.incorrectPriceValue')}),
    priceUSD: z.coerce.number(),
    orderID: z.number()
  });
};

// export type ProductFormValues = z.infer<typeof productSchema>;
