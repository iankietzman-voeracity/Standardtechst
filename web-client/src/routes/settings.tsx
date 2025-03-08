import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Box } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { useAuth } from "../lib/AuthContext";
import pb from "../lib/pb";

const schema = z.object({
  language: z.string(),
  darkMode: z.boolean(),
});

type SettingsData = z.infer<typeof schema>;

export const Route = createFileRoute("/settings")({
  beforeLoad: ({ context, location }) => {
    console.log(context);

    if (!context.isLoading && !context.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Settings,
});

function Settings() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    userRecord,
    token,
    login,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsData>({
    resolver: zodResolver(schema),
  });

    const submitHandler: SubmitHandler<SettingsData> = async (data) => {
      // TODO: Remove once full error handling suite is in place
      console.log(data);
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
    <div>
      Settings

      <Box maxWidth="360px" p="2">
        <Form.Root onSubmit={handleSubmit(submitHandler)}>
          <Form.Field name="language">
            <Form.Label>Language:</Form.Label>
            <Form.Control {...register("language")} type="text" required />
            {errors.language && <div>{errors.language.message}</div>}
          </Form.Field>
          <Form.Field name="password">
            <Form.Label>Dark Mode:</Form.Label>
            <Form.Control {...register("darkMode")} type="text" required />
            {errors.darkMode && <div>{errors.darkMode.message}</div>}
          </Form.Field>

          <Form.Submit>{isSubmitting ? "Saving" : "Save"}</Form.Submit>
        </Form.Root>
      </Box>
    </div>
  )

}
