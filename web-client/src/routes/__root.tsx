import { useAuth } from "../lib/AuthContext";
import pb from "../lib/pb";
import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";

interface RouterAuthContext {
  isAuthenticated: boolean
}

function App() {
  const navigate = useNavigate();
  // const [authenticated, setAuthenticated] = useState(false)
  const {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    userRecord,
    token,
    login,
    logout: logout2,
  } = useAuth();

  useEffect(() => {
    console.log("changed", isAuthenticated);
    if (pb.authStore.isValid) {
      // setAuthenticated(true)
      setIsAuthenticated(true);
    }
    console.log(isAuthenticated, isLoading, userRecord, token, login, logout2);
  }, [isAuthenticated]);

  function logout(): void {
    logout2();
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
        {isAuthenticated && <Button onClick={logout}>Sign Out</Button>}
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
