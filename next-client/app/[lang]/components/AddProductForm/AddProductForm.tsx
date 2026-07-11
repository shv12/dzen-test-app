
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikErrors, FormikTouched } from "formik";
import axios from "axios";
import AppLink from "../AppLink/AppLink";
import { z } from "zod";
import type { FormFieldType } from "@/app/types/definitions";
import { createProductSchema } from "@/app/schemas/productSchema";
import { api } from "@/app/lib/api";
import { addProductAction } from "@/app/lib/redux/productsSlice";
import { addProductToAction } from "@/app/lib/redux/ordersSlice";
import { useAppDispatch, useAppSelector, useTranslations } from "@/app/lib/hooks";
import { ordersSelector, localeSelector, productTypesSelector } from "@/app/lib/redux/selectors";
import { useRouter } from "next/navigation";
import { ProductType } from "@/app/types/definitions";

const initialValues = {
    productType: '',
    productName: '',
    guaranteeFrom: '',
    guaranteeUntil: '',
    priceUAH: 0,
    priceUSD: 0,
    orderID: 0
};

export default function AddProductForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const ordersData = useAppSelector(ordersSelector);
  const { dict } = useAppSelector(localeSelector);
  const t = useTranslations(dict);
  const productSchema = createProductSchema(t);
  type ProductFormValues = z.infer<typeof productSchema>;
  const { productTypes } = useAppSelector(productTypesSelector);

  const fields: FormFieldType[] = [
      {
        name: 'productType',
        label: t('productType'),
        placeholder: t('typeOrSelectProductType'),
        type: "text",
        list: "productTypeList"
      },
      {
        name: 'productName',
        label: t('productName'),
        placeholder: t('typeProductName'),
        type: "text"
      },
      {
        name: 'guaranteeFrom',
        label: t('productGuaranteeFrom'),
        placeholder: t('selectProductGuaranteeFrom'),
        type: "date"
      },
      {
        name: 'guaranteeUntil',
        label: t('productGuaranteeUntil'),
        placeholder: t('selectProductGuaranteeUntil'),
        type: "date"
      },
      {
        name: 'priceUAH',
        label: t('priceUAH'),
        placeholder: t('enterPrice')
      },
      {
        name: 'priceUSD',
        label: t('priceUSD'),
        placeholder: t('enterPrice')
      },
  ];

  const formField = (
    { name, label, placeholder, type = "text", list  = ""}: FormFieldType,
    errors: FormikErrors<ProductFormValues>,
    touched: FormikTouched<ProductFormValues>
  ) => {
    const typedName = name as keyof ProductFormValues;

    return <div key={name} className="rounded bg-light mb-0 px-4">
          <label htmlFor={name}>{label}</label>
          <div>
        <Field type={ type}
                  id={name}
                  name={name}
          placeholder={placeholder}
          list={ list}
          className={`form-control w-full bg-white rounded border border-gray-500 p-2 ${touched[typedName] && errors[typedName] ? "is-invalid" : ""}`}
        />
        <datalist id="productTypeList">
          {productTypes.map(({productType}: ProductType) => <option key={ productType} value={productType}></option>)}
        </datalist>
      </div>
      {!touched[typedName] || !errors[typedName] ? <div className="mt-1 small text-transparent" >O</div> : ""}

      <ErrorMessage
        name={name}
        component="div"
        className="invalid-feedback d-block"
      />
      </div>;
  }

const handleSubmit = async (values: ProductFormValues, { resetForm }: {resetForm: () => void}) => {
  try {
    values.orderID = ordersData.currentOrder!.id;
    // console.log("AddProductForm :: handleSubmit :: values", values);
    const response = await api.post("/api/products/add", { payload: values });
    const { success, result } = response.data;
    if (success) {
      console.log("AddProductForm :: handleSubmit :: result", result);
      dispatch(addProductAction(result));
      let priceUAH = values.priceUAH;
      if (typeof priceUAH === 'string') {
        priceUAH = parseFloat(priceUAH);
      }
      let priceUSD = values.priceUSD;
      if (typeof priceUSD === 'string') {
        priceUSD = parseFloat(priceUSD);
      }
      dispatch(addProductToAction({
        orderID: ordersData.currentOrder!.id,
        priceUAH: priceUAH,
        priceUSD: priceUSD
      }));
      router.push("/orders");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create order");
      } else {
        setError("An unexpected error occured");
      }
    }
    resetForm();
  }


  const validateProduct = (values: ProductFormValues): FormikErrors<ProductFormValues> => {
    const errors: FormikErrors<ProductFormValues> = {};

    const result = productSchema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ProductFormValues;
        errors[path] = issue.message;
      });
    }

    return errors;
  }

  return <Formik
    initialValues={initialValues}
    validate={validateProduct}
    onSubmit={handleSubmit}
  >{
      ({ isSubmitting, errors, touched }) => (
    <Form>
      <div className="container-fluid">
          {fields.map((field) => {
            return formField(field, errors, touched);
          })}
        </div>
        <AppLink href="/orders" className="btn btn-secondary fw-medium mr-4">{t('cancel')}</AppLink>
        <button
          type="submit"
          className="btn btn-primary fw-medium"
          disabled={isSubmitting}
        >{t('addProduct')}</button>

    </Form>
  )}
  </Formik>;
}