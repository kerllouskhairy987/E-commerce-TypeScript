import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useParams } from "react-router"
// interfaces and types
import type { IProduct } from "@/interfaces"
// bootstrap component
import actGetProductsByCatPrefix from "@/store/products/act/actGetProductsByCatPrefix"
import { Container, Row, Col } from "react-bootstrap"
// components
import Product from "@/components/eCommerce/Product/Product"
import Error from "./Error"
import { ProductSkeleton } from "@/skeleton/skeleton"
import { productsCleanUp } from "@/store/products/productsSlice"

const Products = () => {

  const { prefix } = useParams()
  const dispatch = useAppDispatch()
  const { loading, records, error } = useAppSelector(state => state.products)
  console.log(loading, records, error)

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(`${prefix}`))
    return () => { dispatch(productsCleanUp()) }
  }, [dispatch, prefix])

  // renders
  const renderProducts = records.length > 0 ? records.map((pro: IProduct) => (
    <Col key={pro.id} md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
      <Product {...pro} />
    </Col>
  )
  ) : <h2 className="text-center text-info">there are no categories</h2>

  if (loading === "pending") return <ProductSkeleton />
  if (loading === "failed") return <Error />

  return (
    <Container>
      <Row>
        {renderProducts}
      </Row>
    </Container>
  )
}

export default Products