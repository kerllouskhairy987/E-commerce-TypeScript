// bootstrap component
import Product from "@/components/eCommerce/Product/Product"
import { Container, Row, Col } from "react-bootstrap"

const Products = () => {
  return (
    <Container>
      <Row>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2 p-3 rounded gap-2">
          <Product />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2 p-3 rounded gap-2">
          <Product />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2 p-3 rounded gap-2">
          <Product />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2 p-3 rounded gap-2">
          <Product />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2 p-3 rounded gap-2">
          <Product />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2 p-3 rounded gap-2">
          <Product />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2 p-3 rounded gap-2">
          <Product />
        </Col>
        <Col md={3} xs={6} className="d-flex justify-content-center mb-5 mt-2 p-3 rounded gap-2">
          <Product />
        </Col>
      </Row>
    </Container>
  )
}

export default Products