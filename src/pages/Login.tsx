import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form";
import Heading from '@/components/common/Heading/Heading'
import { signInSchema, type TSignInType } from '@/validation/signInSchema'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Input from "@/components/forms/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {


  const { register, handleSubmit, formState: { errors } } = useForm<TSignInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema)
  })

  const submitForm: SubmitHandler<TSignInType> = (data) => {
    console.log(data)
  }


  return (
    <Container>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }} style={{ marginBottom: '40px' }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="Email Address"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message as string}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password?.message as string}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login