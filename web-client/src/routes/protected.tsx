import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/protected")({
  beforeLoad: ({ context, location }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Protected route</div>;
}
