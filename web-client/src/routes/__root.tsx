import { RecordModel } from "pocketbase";
import { Button, Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";

import { useAuth, useSettings } from "../lib/AuthContext";
import pb from "../lib/pb";

interface RouterAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
}

function App() {
  const [record, setRecord] = useState<RecordModel | null>(null);
  const [two, setTwo] = useState<string>("null");
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    userRecord,
    token,
    login,
    logout,
  } = useAuth();
  let recordData: RecordModel | null = null;
  if (userRecord?.id) {
    const data = useSettings(userRecord.id);
    recordData = data ? data : null;
  }

  const { i18n, t } = useTranslation("common");

  useEffect(() => {
    if (record) {
      i18n.changeLanguage(record.language);
    }
  }, [record]);

  useEffect(() => {
    setRecord(recordData ? recordData : null);
  }, [recordData]);

  function logoutHandler(): void {
    logout();
    navigate({
      to: "/login",
    });
  }

  return (
    <Theme appearance={record?.dark_mode} accentColor="tomato">
      <div>
        {!isAuthenticated && (
          <Link to="/login">
            <Button>{t("Sign In")}</Button>
          </Link>
        )}
        {isAuthenticated && (
          <>
            <Link to="/settings">
              <Button>{t("Settings")}</Button>
            </Link>
            <Link to="/account">
              <Button>{t("Account")}</Button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <Button onClick={logoutHandler}>{t("Sign Out")}</Button>
        )}
        {!isAuthenticated && (
          <Link to="/register">
            <Button>{t("Register")}</Button>
          </Link>
        )}
      </div>
      <hr />
      <Outlet />
    </Theme>
  );
}

export const Route = createRootRouteWithContext<RouterAuthContext>()({
  component: App,
});
