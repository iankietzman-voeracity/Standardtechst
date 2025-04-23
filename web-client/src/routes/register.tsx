import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { useAuth } from "../lib/AuthContext";
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
  const { isAuthenticated, login } = useAuth();
  const { t } = useTranslation("common");

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
      await pb.collection("users").create(data);
      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
      login();
      return authData;
    },
    onSuccess: () => {
      navigate({
        to: "/protected",
      });
    },
  });

  const loginHandler: SubmitHandler<RegisterData> = async (data) => {
    try {
      const authData = mutation.mutate({
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
      return authData;
    } catch (error) {
      console.log("oopsie", error);
    }
  };

  return (
    <>
      {t("Register")}
      <Box maxWidth="360px" p="2">
        <Form.Root onSubmit={handleSubmit(loginHandler)}>
          <Form.Field name="email">
            <Form.Label>{t("Email")}:</Form.Label>
            <Form.Control {...register("email")} type="email" required />
            {errors.email && <div>{errors.email.message}</div>}
          </Form.Field>
          <Form.Field name="password">
            <Form.Label>{t("Password")}:</Form.Label>
            <Form.Control {...register("password")} type="password" required />
            {errors.password && <div>{errors.password.message}</div>}
          </Form.Field>

          <Form.Field name="password-confirm">
            <Form.Label>{t("Confirm Password")}:</Form.Label>
            <Form.Control
              {...register("passwordConfirm")}
              type="password"
              required
            />
            {errors.password && <div>{errors.password.message}</div>}
          </Form.Field>

          <Form.Submit>
            {isSubmitting ? t("Registering") : t("Register")}
          </Form.Submit>
        </Form.Root>
      </Box>
    </>
  );
}
