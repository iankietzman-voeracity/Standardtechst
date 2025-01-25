// import { useState } from "react";
import { Box, Button } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../lib/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import pb from "../lib/pb";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
});

type RegisterData = z.infer<typeof schema>;

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const {
    isAuthenticated,
    login: login2
  } = useAuth();

  const navigate = useNavigate({
    from: "/register",
  });
  if (isAuthenticated) {
    navigate({
      to: "/protected",
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      console.log("data", data);
      await pb.collection('users').create(data)
      await pb.collection('users')
      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
      console.log(authData);
      login2()
      return authData;
    },
    onSuccess: (data) => {
      console.log("success", data);
      // login2();
      navigate({
        to: "/protected",
      });
    },
  });
    
  const login: SubmitHandler<RegisterData> = async (data) => {
    console.log(data);
    try {
      console.log("submitting", data);
      const authData = mutation.mutate({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm
      });
      console.log(authData);
    } catch (error) {
      console.log("oopsie", error);
    }
  };

  return (
      <>
        <Box maxWidth="360px" p="2">
          <Form.Root onSubmit={handleSubmit(login)}>
            <Form.Field name="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control {...register("email")} type="email" required />
              {errors.email && (
                <div>{errors.email.message}</div>
              )}
            </Form.Field>
            <Form.Field name="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control {...register("password")} type="password" required />
              {errors.password && (
                <div>{errors.password.message}</div>
              )}
            </Form.Field>

            <Form.Field name="password-confirm">
              <Form.Label>Password:</Form.Label>
              <Form.Control {...register("passwordConfirm")} type="password" required />
              {errors.password && (
                <div>{errors.password.message}</div>
              )}
            </Form.Field>
  
            <Form.Submit>{isSubmitting ? "Registering" : "Register"}</Form.Submit>
          </Form.Root>
        </Box>
      </>
    );
}

// export default Register;
