import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Box } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { useAuth } from "../lib/AuthContext";
import pb from "../lib/pb";

const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  phone: z.string(),
  oldPassword: z.string().min(8).optional().or(z.literal("")),
  password: z.string().min(8).optional().or(z.literal("")),
  passwordConfirm: z.string().min(8).optional().or(z.literal("")),
});

type AccountData = z.infer<typeof schema>;

export const Route = createFileRoute("/account")({
  beforeLoad: ({ context, location }) => {
    if (!context.isLoading && !context.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Account,
});

function Account() {
  const [recordId, setRecordId] = useState<string>("");
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    userRecord,
    token,
    logout,
  } = useAuth();
  const { t } = useTranslation("common");

  // i18n.changeLanguage('es')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({
        to: "/login",
      });
    }
  }, [isAuthenticated]);

  function logoutHandler(): void {
    logout();
    navigate({
      to: "/login",
    });
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AccountData>({
    resolver: zodResolver(schema),
  });

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const userId = userRecord?.id ? userRecord.id : "";
      const record = await pb.collection("users").getOne(userId);
      setRecordId(record.id);
      setValue("email", record.email);
      setValue("name", record.name);
      setValue("phone", record.phone);
      return record;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: AccountData) => {
      let data = {
        name: formData.name,
        phone: formData.phone,
        // "oldPassword": formData.oldPassword,
        // "password": formData.password,
        // "passwordConfirm": formData.passwordConfirm
      };

      await pb.collection("users").update(recordId, data);

      if (
        formData.oldPassword &&
        formData.password &&
        formData.passwordConfirm &&
        formData.password === formData.passwordConfirm
      ) {

        let passwordData = {
          oldPassword: formData.oldPassword,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
        };
        await pb.collection("users").update(recordId, passwordData);

        logoutHandler();
      }

      return;
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      setValue("oldPassword", "");
      setValue("password", "");
      setValue("passwordConfirm", "");
    },
  });

  if (mutation.isPending) return "Loading...";

  if (mutation.isError)
    return "An error has occurred: " + mutation.error.message;

  const submitHandler: SubmitHandler<AccountData> = async (data) => {
    try {
      mutation.mutate({
        email: data.email,
        name: data.name,
        phone: data.phone,
        oldPassword: data.oldPassword,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
    } catch (error) {
      console.log("oopsie", error);
    }
  };

  return (
    <div>
      Account {t("Welcome to React")} {t("test")}
      <Box maxWidth="360px" p="2">
        <Form.Root onSubmit={handleSubmit(submitHandler)}>
          <Form.Field name="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              {...register("email")}
              type="text"
              disabled
              required
            />
            {errors.email && <div>{errors.email.message}</div>}
          </Form.Field>
          <Form.Field name="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control {...register("name")} type="text" required />
            {errors.name && <div>{errors.name.message}</div>}
          </Form.Field>
          <Form.Field name="phone">
            <Form.Label>Phone:</Form.Label>
            <Form.Control {...register("phone")} type="text" required />
            {errors.phone && <div>{errors.phone.message}</div>}
          </Form.Field>
          <Form.Field name="oldPassword">
            <Form.Label>Current Password:</Form.Label>
            <Form.Control {...register("oldPassword")} type="password" />
            {errors.oldPassword && <div>{errors.oldPassword.message}</div>}
          </Form.Field>
          <Form.Field name="password">
            <Form.Label>New Password:</Form.Label>
            <Form.Control {...register("password")} type="password" />
            {errors.password && <div>{errors.password.message}</div>}
          </Form.Field>
          <Form.Field name="passwordConfirm">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control {...register("passwordConfirm")} type="password" />
            {errors.passwordConfirm && (
              <div>{errors.passwordConfirm.message}</div>
            )}
          </Form.Field>
          <Form.Submit>{isSubmitting ? "Saving" : "Save"}</Form.Submit>
        </Form.Root>
      </Box>
    </div>
  );
}
