import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Box } from "@radix-ui/themes";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { languages } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import pb from "../lib/pb";

const schema = z.object({
  language: z.string(),
  darkMode: z.string(),
});

type SettingsData = z.infer<typeof schema>;

export const Route = createFileRoute("/settings")({
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
  component: Settings,
});

function Settings() {
  const [recordId, setRecordId] = useState<string>("");
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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SettingsData>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();
  const { i18n, t } = useTranslation("common");

  // TODO: Convert to useSettings hook
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["userSettings"],
    queryFn: async () => {
      const userId = userRecord?.id ? userRecord.id : "";
      const record = await pb
        .collection("user_settings")
        .getFirstListItem(`user_id="${userId}"`);
      setRecordId(record.id);
      setValue("language", record.language);
      setValue("darkMode", record.dark_mode);
      return record;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: SettingsData) => {
      const data = {
        language: formData.language,
        dark_mode: formData.darkMode,
      };
      await pb.collection("user_settings").update(recordId, data);
      return data;
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: (data) => {
      i18n.changeLanguage(data.language);
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
      console.log("saved!");
    },
  });

  if (mutation.isPending) return "Loading...";

  if (mutation.isError)
    return "An error has occurred: " + mutation.error.message;

  const submitHandler: SubmitHandler<SettingsData> = async (data) => {
    try {
      mutation.mutate({
        language: data.language,
        darkMode: data.darkMode,
      });
    } catch (error) {
      console.log("oopsie", error);
    }
  };

  return (
    <div>
      {t("Settings")}
      <Box maxWidth="360px" p="2">
        <Form.Root onSubmit={handleSubmit(submitHandler)}>
          <Form.Field name="language">
            <Form.Label>{t("Language")}:</Form.Label>
            <Form.Control {...register("language")} asChild required>
              <select>
                {languages.map((language) => (
                  <option
                    key={language.languageCode}
                    value={language.languageCode}
                  >
                    {language.language}
                  </option>
                ))}
              </select>
            </Form.Control>
            {errors.language && <div>{errors.language.message}</div>}
          </Form.Field>
          <Form.Field name="dark_mode">
            <Form.Label>{t("Dark Mode")}:</Form.Label>
            <Form.Control {...register("darkMode")} asChild required>
              <select>
                <option value="dark">{t("Dark")}</option>
                <option value="light">{t("Light")}</option>
              </select>
            </Form.Control>
            {errors.darkMode && <div>{errors.darkMode.message}</div>}
          </Form.Field>
          <Form.Submit>{isSubmitting ? t("Saving") : t("Save")}</Form.Submit>
        </Form.Root>
      </Box>
    </div>
  );
}
