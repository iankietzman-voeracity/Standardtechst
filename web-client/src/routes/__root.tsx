import { Button } from "@radix-ui/themes";
import { useEffect } from "react";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";

import { useAuth } from "../lib/AuthContext";
import pb from "../lib/pb";

interface RouterAuthContext {
  isAuthenticated: boolean;
  isLoading: boolean;
}

function App() {
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

  useEffect(() => {
    // if (pb.authStore.isValid) {
    //   setIsAuthenticated(true);
    // }
    // TODO: Remove this line once auth flow is confidently finalized
    console.log(
      "user:",
      isAuthenticated,
      isLoading,
      userRecord,
      token,
      login,
      logout,
    );
  }, [isAuthenticated]);

  function logoutHandler(): void {
    logout();
    navigate({
      to: "/login",
    });
  }

  return (
    <>
      <div>
        {!isAuthenticated && (
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        )}
        {isAuthenticated && (
          <>
            <Link to="/settings">
              <Button>Settings</Button>
            </Link>
            <Link to="/account">
              <Button>Account</Button>
            </Link>
          </>
        )}
        {isAuthenticated && <Button onClick={logoutHandler}>Sign Out</Button>}
        {!isAuthenticated && (
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        )}
      </div>
      <hr />
      <Outlet />
    </>
  );
}

export const Route = createRootRouteWithContext<RouterAuthContext>()({
  component: App,
});
