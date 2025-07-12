import Heading from '@/components/common/Heading/Heading';
import Input from "@/components/forms/Input/Input";

import Form from 'react-bootstrap/Form';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Navigate } from "react-router";
import useRegister from "@/hooks/useRegister";


const Register = () => {

  const {
        loading, error, accessToken, register,
        handleSubmit, formErrors, submitForm, emailAvailabilityStatus, emailOnBlurHandler
    } = useRegister()

  // for protecting route 
  if (accessToken) {
    return <Navigate to={"/"} />
  }
  
  return (
    <Container>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }} style={{ marginBottom: '40px' }}>
          <Form onSubmit={handleSubmit(submitForm)}>

            <Input
              label="First Name"
              name="firstName"
              register={register}
              error={formErrors.firstName?.message as string}
            />

            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={formErrors.lastName?.message as string}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                formErrors.email?.message as string
                  ? formErrors.email?.message as string
                  : emailAvailabilityStatus === "notAvailable"
                    ? "email already exists"
                    : emailAvailabilityStatus === "failed"
                      ? "Error form the server."
                      : ""
              }
              formText={emailAvailabilityStatus === "checking" ? "we are checking email availability" : ""}
              success={emailAvailabilityStatus === "available" ? "email is available" : ""}
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={formErrors.password?.message as string}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={formErrors.confirmPassword?.message as string}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus === "checking"
                  ? true
                  : false
              }
            >
              {
                loading === "pending" ? (
                  <>
                    <Spinner animation="border" size="sm"></Spinner> Loading ...
                  </>
                ) : "submit"
              }
            </Button>
            {error && <p style={{ color: "red", marginTop: "20px", textAlign: "center" }}>{error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register