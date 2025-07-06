// react hooks
import { useEffect } from "react"
// bootstrap component
import { Container } from "react-bootstrap"
// redux hooks
import { useAppDispatch, useAppSelector } from "@/store/hooks"
// redux actions
import { actGetCategories } from "@/store/categories/categoriesSlice"
// interfaces and types
import type { ICategory } from "@/interfaces"
// components
import Category from "@/components/eCommerce/Category/Category"
import { LoadingAndErrorCategories } from "@/components/feedback/LoadingAndError/LoadingAndError"
import GridList from "@/components/common/GridList/GridList"

const Categories = () => {

  const dispatch = useAppDispatch()
  const { loading, records, error } = useAppSelector(state => state.categories)
  console.log(loading, records, error)

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories())
    }
  }, [dispatch, records])

  return (
    <Container>
      <LoadingAndErrorCategories status={loading} error={error}>
        <GridList<ICategory> records={records} renderItems={(cat: ICategory) => <Category {...cat} />} />
      </LoadingAndErrorCategories>
    </Container>

  )
}

export default Categories