import { useAuth } from "../lib/AuthContext";
import pb from "../lib/pb";
import { Box } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

console.log("token", pb.authStore.token);

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
    login: login2,
    logout: logout2,
  } = useAuth();

  const navigate = useNavigate({
    from: "/login",
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
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      console.log("data", data);

      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
      console.log(authData);
      return authData;
    },
    onSuccess: (data) => {
      console.log("success", data);
      login2();
      navigate({
        to: "/protected",
      });
    },
  });

  if (mutation.isPending) return "Loading...";

  if (mutation.isError)
    return "An error has occurred: " + mutation.error.message;

  const login: SubmitHandler<LoginData> = async (data) => {
    console.log(data);
    try {
      console.log("submitting", data);
      const authData = mutation.mutate({
        email: data.email,
        password: data.password,
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

          <Form.Submit>{isSubmitting ? "Signing in" : "Sign in"}</Form.Submit>
        </Form.Root>
      </Box>
    </>
  );
}

// export default Login;
