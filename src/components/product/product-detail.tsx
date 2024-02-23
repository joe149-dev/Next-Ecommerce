import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductType } from "@/types/productType";
import { useGetProductDetailQuery } from "@/services/product";

interface Props {
    seo: string | undefined
}

const ProductDetail = ({seo}: Props) => {
    const {
        data: product,
        isLoading,
        isSuccess,
      } = useGetProductDetailQuery(`product/${seo}`);

  const formik = useFormik({
    initialValues: {
      title: product?.row?.title ?? "",
      seo: "",
      description: "",
      stockCode: "",
      barcode: "",
      associative: "",
      tax: "",
      confirm: false,
      updatedAt: "",
    } as ProductType,
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Must be 100 characters or less")
        .min(2, "Must be 2 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="title"
            name="title"
            type="text"
            autoComplete="title"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
        </div>
        {formik.touched.title && formik.errors.title ? (
          <div className="block text-sm font-medium text-red-700">
            {formik.errors.title}
          </div>
        ) : null}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default ProductDetail;
