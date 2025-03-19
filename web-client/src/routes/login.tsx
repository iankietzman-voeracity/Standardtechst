import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Box } from "@radix-ui/themes";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { useAuth } from "../lib/AuthContext";
import pb from "../lib/pb";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginData = z.infer<typeof schema>;

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    userRecord,
    token,
    login,
  } = useAuth();

  const navigate = useNavigate({
    from: "/login",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate({
        to: "/account",
      });
    }
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
      return authData;
    },
    onSuccess: () => {
      login();
      navigate({
        to: "/protected",
      });
    },
  });

  if (mutation.isPending) return "Loading...";

  if (mutation.isError)
    return "An error has occurred: " + mutation.error.message;

  const loginHandler: SubmitHandler<LoginData> = async (data) => {
    // TODO: Remove once full error handling suite is in place
    try {
      const authData = mutation.mutate({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log("oopsie", error);
    }
  };

  return (
    <>
      <Box maxWidth="360px" p="2">
        <Form.Root onSubmit={handleSubmit(loginHandler)}>
          <Form.Field name="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control {...register("email")} type="email" required />
            {errors.email && <div>{errors.email.message}</div>}
          </Form.Field>
          <Form.Field name="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control {...register("password")} type="password" required />
            {errors.password && <div>{errors.password.message}</div>}
          </Form.Field>

          <Form.Submit>{isSubmitting ? "Signing in" : "Sign in"}</Form.Submit>
        </Form.Root>
      </Box>
    </>
  );
}
