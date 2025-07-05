// react hooks
import { useEffect } from "react"
// bootstrap component
import { Container, Row, Col } from "react-bootstrap"
// redux hooks
import { useAppDispatch, useAppSelector } from "@/store/hooks"
// redux actions
import { actGetCategories } from "@/store/categories/categoriesSlice"
// interfaces and types
import type { ICategory } from "@/interfaces"
// components
import { CategoriesSkeleton } from "@/skeleton/skeleton"
import Error from "./Error"
import Category from "@/components/eCommerce/Category/Category"

const Categories = () => {

  const dispatch = useAppDispatch()
  const { loading, records, error } = useAppSelector(state => state.categories)
  console.log(loading, records, error)

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories())
    }
  }, [dispatch, records])

  // renders
  const renderCategories = records.length > 0 ? records.map((cat: ICategory) => (
    <Col key={cat.id} md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
      <Category {...cat} />
    </Col>
  )
  ) : <h2 className="text-center text-info">there are no categories</h2>

  if (loading === "pending") return <CategoriesSkeleton />
  if (loading === "failed") return <Error />

  return (
    <Container>
      <Row>
        {renderCategories}
      </Row>
    </Container>

  )
}

export default Categories