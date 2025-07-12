import { Navigate } from "react-router";

import Heading from '@/components/common/Heading/Heading'
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import Input from "@/components/forms/Input/Input";
import useLogin from "@/hooks/useLogin";


const Login = () => {
  const { loading, error, accessToken, searchParams, register, handleSubmit, submitForm, formErrors } = useLogin()

  // for protecting route 
  if (accessToken) {
    return <Navigate to={"/"} />
  }

  return (
    <Container>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }} style={{ marginBottom: '40px' }}>
          {searchParams.get("message") === "account_created" &&
            <Alert variant="success">your account has been created, Login now...</Alert>
          }
          {searchParams.get("message") === "login_required" &&
            <Alert variant="danger">You must login first</Alert>
          }
          {error && <Alert variant="danger" className="mt-3">Email OR Password is not correct</Alert>}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              register={register}
              error={formErrors.email?.message as string}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={formErrors.password?.message as string}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading ...
                </>
              ) : "login"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login