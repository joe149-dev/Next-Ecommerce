import { useGetCategoryProductsQuery } from '@/services/category';
import { useRouter } from 'next/router'
import React from 'react'

const Category = () => {
const router = useRouter()

const {
  data: product,
  isLoading,
  isSuccess,
} = useGetCategoryProductsQuery(`category/${router.query.slug}`);

return (
    <div>Category {router.query.slug}</div>
  )
}

export default Category