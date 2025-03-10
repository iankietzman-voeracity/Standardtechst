import { AuthProvider, useAuth } from "./lib/AuthContext";
import { Theme } from "@radix-ui/themes";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    isAuthenticated: false,
    isLoading: false,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AuthRouterContextBridge() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading)
    return (
      <Theme appearance="dark" accentColor="tomato">
        <QueryClientProvider client={queryClient}>
          <RouterProvider
            router={router}
            context={{ isAuthenticated, isLoading }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Theme>
    );
}

function App() {
  return (
    <AuthProvider>
      <AuthRouterContextBridge />
    </AuthProvider>
  );
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
