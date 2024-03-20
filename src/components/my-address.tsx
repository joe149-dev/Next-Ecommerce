import {
  useGetCityQuery,
  useGetDistrictQuery,
  useGetTownQuery,
  useGetUserAddressQuery,
  useSetUserAddressMutation,
  useUpdateUserAddressMutation,
} from "@/services/address";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";

const MyAddress = () => {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");

  const { data: cities, isSuccess } = useGetCityQuery("/address/cities");
  const { data: districts, isSuccess: districtIsSuccess } = useGetDistrictQuery(
    `/address/city/${city}`
  );
  const { data: towns, isSuccess: townIsSuccess } = useGetTownQuery(
    `/address/districts/${city}/${district}`
  );

  const { data: userAddress, isSuccess: userAddressIsSuccess } =
    useGetUserAddressQuery("/address/user-address");

  const [setUserAddress, result] = useSetUserAddressMutation();
  const [updateUserAddress] = useUpdateUserAddressMutation();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: -1,
      name: "",
      city: "",
      district: "",
      town: "",
      addressLine: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(100, "Must be 100 characters or less")
        .min(2, "Must be 2 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      if (values.id > 0) {
        updateUserAddress(values);
      } else {
        setUserAddress(values);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      id: formik.values.id,
      city: city,
      district: district,
      town: town,
      name: formik.values.name,
      addressLine: formik.values.addressLine,
    });
  }, [city, district, town]);

  useEffect(() => {
    if (userAddressIsSuccess) {
      setCity(userAddress.address.city);
      setDistrict(userAddress.address.district);
      setTown(userAddress.address.town);
      formik.setValues({
        id: userAddress.address.id,
        city: city,
        district: district,
        town: town,
        name: userAddress.address.name,
        addressLine: userAddress.address.addressLine,
      });
    }
  }, [userAddressIsSuccess]);

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div className="w-full px-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Address Name
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className="block text-sm font-medium text-red-700">
            {formik.errors.addressLine}
          </div>
        ) : null}
      </div>
      <div className="w-full flex flex-wrap">
        <div className="w-1/3 px-2">
          <select
            onChange={(e) => setCity(e.target.value)}
            className="w-full items-end rounded border appearance-none text-white border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
          >
            <option value={-1}>Şehir Seçiniz...</option>
            {isSuccess &&
              cities.cities.map((k: any, i: number) => {
                if (k === city) {
                  return (
                    <option key={i} value={k} selected>
                      {k}
                    </option>
                  );
                } else {
                  return (
                    <option key={i} value={k}>
                      {k}
                    </option>
                  );
                }
              })}
          </select>
        </div>
        <div className="w-1/3 px-2">
          <select
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full items-end rounded border appearance-none text-white border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
          >
            <option value={-1}>İlçe Seçiniz...</option>
            {districtIsSuccess &&
              districts.districts.map((k: any, i: number) => {
                if (k === district) {
                  return (
                    <option key={i} value={k} selected>
                      {k}
                    </option>
                  );
                } else {
                  return (
                    <option key={i} value={k}>
                      {k}
                    </option>
                  );
                }
              })}
          </select>
        </div>
        <div className="w-1/3 px-2">
          <select
            onChange={(e) => setTown(e.target.value)}
            className="w-full items-end rounded border appearance-none text-white border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
          >
            <option value={-1}>Mahalle & Köy Seçiniz...</option>
            {townIsSuccess &&
              towns.towns.map((k: any, i: number) => {
                if (k === town) {
                  return (
                    <option key={i} value={k} selected>
                      {k}
                    </option>
                  );
                } else {
                  return (
                    <option key={i} value={k}>
                      {k}
                    </option>
                  );
                }
              })}
          </select>
        </div>
      </div>
      <div className="w-full px-2">
        <label
          htmlFor="addressLine"
          className="block text-sm font-medium text-gray-700"
        >
          Address Line
        </label>
        <div className="mt-1">
          <input
            id="addressLine"
            name="addressLine"
            type="text"
            autoComplete="addressLine"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.addressLine}
          />
        </div>
        {formik.touched.addressLine && formik.errors.addressLine ? (
          <div className="block text-sm font-medium text-red-700">
            {formik.errors.addressLine}
          </div>
        ) : null}
      </div>

      <div className="w-full px-2">
        <button
          type="submit"
          className="w-full mx-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {formik.values.id > 0 ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default MyAddress;
