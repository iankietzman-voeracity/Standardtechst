import { BaseSyntheticEvent, useState } from "react";
import { Box, Button, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from '@tanstack/react-router'

type loginData = {
  name: string
}

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const [count, setCount] = useState(0);

  const mutation = useMutation({
    mutationFn: async (data: loginData) => {
      const t = await (await fetch('http://127.0.0.1:8090/hello/klsjdf', {
        method: 'POST',
        body: JSON.stringify(data)
      })).json()
      console.log('test', t)
      return t
    },
    onSuccess: (data) => {
      console.log('success', data)
    }

  })

  if (mutation.isPending) return 'Loading...'

  if (mutation.isError) return 'An error has occurred: ' + mutation.error.message

  function login(e: BaseSyntheticEvent) {
    console.log(e);
    
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log('submitting', data, data.name, typeof(data.email));
    mutation.mutate( {
      name: data.email
    } )
    
  }

  return (
    <>
      <Box maxWidth="360px" p="2">
        <Form.Root
          onSubmit={login}
        >
          <Form.Field name="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" required/>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </Form.Field>
          <Form.Field name="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" required/>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your password
            </Form.Message>
          </Form.Field>

          <Form.Submit>Login</Form.Submit>
        </Form.Root>
      </Box>
    </>
  );
}

// export default Login;
