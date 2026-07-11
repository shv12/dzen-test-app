'use client';

import { useState } from "react";
import { z } from "zod";
import {useRouter} from "next/navigation"
import { Formik, Form, Field, ErrorMessage, FormikErrors, FormikTouched } from "formik";
import AppLink from "../AppLink/AppLink";
import { FormFieldType } from "@/app/types/definitions";
import { createOrderSchema } from "@/app/schemas/orderSchema";
import { api } from "@/app/lib/api";
import axios from "axios";
import { useAppDispatch, useAppSelector, useTranslations } from "@/app/lib/hooks";
import { addOrderAction } from "@/app/lib/redux/ordersSlice";
import { localeSelector } from "@/app/lib/redux/selectors";

export default function AddOrderForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { dict } = useAppSelector(localeSelector);
  const t = useTranslations(dict);
  const orderSchema = createOrderSchema(t);
  type OrderFormValues = z.infer<typeof orderSchema>;

  const [error, setError] = useState<string | null>(null);

  const fields: FormFieldType[] = [
    {
      name: 'orderName',
      label: t("orderName"),
      placeholder: t("enterOrderName"),
      type: 'text',
      errorMessage: 'Order name is required',
      isValid: true
    },
  ];

  const formField = ({name, label, placeholder}: FormFieldType, errors: FormikErrors<OrderFormValues>, touched: FormikTouched<OrderFormValues>) => {
    const typedName = name as keyof OrderFormValues;

    return <div key={name} className="rounded bg-light mb-4 p-4">
          <label htmlFor={name}>{label}</label>
          <div>
              <Field type="text"
                  id={name}
                  name={name}
          placeholder={placeholder}
          className={`form-control w-full bg-white rounded border border-gray-500 p-2 ${touched[typedName] && errors[typedName] ? "is-invalid" : ""}`}
              />
      </div>
      {!touched[typedName] || !errors[typedName] ? <div className="mt-1 small text-transparent" >O</div> : ""}

      <ErrorMessage
        name={name}
        component="div"
        className="invalid-feedback d-block"
      />
      </div>;
  }

  const initialValues: OrderFormValues = {
    orderName: ''
  }

  const handleSubmit = async (values: OrderFormValues, { resetForm }: {resetForm: () => void}) => {
    try {
      const response = await api.post("/seed", { action: "addOrder", payload: values });
      const { success, result } = response.data;
      if (success) {
        dispatch(addOrderAction(result));
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

  const validateOrder = (values: OrderFormValues): FormikErrors<OrderFormValues> => {
    const errors: FormikErrors<OrderFormValues> = {};

    const result = orderSchema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof OrderFormValues;
        errors[path] = issue.message;
      });
    }

    return errors;
  }

  return <Formik
    initialValues={initialValues}
    validate={validateOrder}
    onSubmit={handleSubmit}
  >{ ({isSubmitting, errors, touched}) => (
      <Form>
        <div className="container-fluid">
            {fields.map((field) => {
                return formField(field, errors, touched);
            })}
        </div>
        <AppLink href="/orders" className="btn btn-secondary fw-medium mr-4">{dict.cancel as string}</AppLink>
        <button
          type="submit"
          className="btn btn-primary fw-medium"
          disabled={ isSubmitting}
        >{dict.addOrder as string}</button>

      </Form>
  )

  }</Formik>

}