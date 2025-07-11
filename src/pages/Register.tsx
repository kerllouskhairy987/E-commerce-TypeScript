import { useForm } from "react-hook-form"
import useCheckEmailAvailability from "@/hooks/useCheckEmailAvailability";
import type { SubmitHandler } from "react-hook-form";
import { signUpSchema, type TSignUpType } from "@/validation/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from '@/components/common/Heading/Heading';
import Input from "@/components/forms/Input/Input";

import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';




const Register = () => {
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<TSignUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema)
  })

  const submitForm: SubmitHandler<TSignUpType> = (data) => {
    console.log(data)
  }

  // check email
  const { emailAvailabilityStatus, enteredEmail, checkEmailAvailability, resetCheckEmailAvailability } = useCheckEmailAvailability()
  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email")
    const value = e.target.value
    const { isDirty, invalid } = getFieldState("email")
    console.log({ isDirty, invalid })
    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      checkEmailAvailability(e.target.value)
    }

    if (isDirty && invalid && enteredEmail) {
      // reset
      resetCheckEmailAvailability()
    }
  }

  // useCheckEmailAvailability

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
              error={errors.firstName?.message as string}
            />

            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message as string}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                errors.email?.message as string
                  ? errors.email?.message as string
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
              error={errors.password?.message as string}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword?.message as string}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register