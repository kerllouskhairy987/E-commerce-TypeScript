import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useParams } from "react-router"
// interfaces and types
import type { IProduct } from "@/interfaces"
// bootstrap component
import actGetProductsByCatPrefix from "@/store/products/act/actGetProductsByCatPrefix"
import { Container } from "react-bootstrap"
// components
import Product from "@/components/eCommerce/Product/Product"
import { productsCleanUp } from "@/store/products/productsSlice"
import { LoadingAndErrorProducts } from "@/components/feedback/LoadingAndError/LoadingAndError"
import GridList from "@/components/common/GridList/GridList"

const Products = () => {

  const { prefix } = useParams()
  const dispatch = useAppDispatch()
  const { loading, records, error } = useAppSelector(state => state.products)
  console.log(loading, records, error)

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(`${prefix}`))
    return () => { dispatch(productsCleanUp()) }
  }, [dispatch, prefix])

  // // renders
  // const renderProducts = records.length > 0 ? records.map((pro: IProduct) => (
  //   <Col key={pro.id} md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2">
  //     <Product {...pro} />
  //   </Col>
  // )
  // ) : <h2 className="text-center text-info">there are no categories</h2>

  return (
    <Container>
      <LoadingAndErrorProducts status={loading} error={error}>
        <GridList<IProduct> records={records} renderItems={(pro: IProduct) => <Product {...pro} />} />
        {/* Update with Generic */}
        {/* <Row> {renderProducts} </Row> */}
      </LoadingAndErrorProducts>
    </Container>
  )
}

export default Products