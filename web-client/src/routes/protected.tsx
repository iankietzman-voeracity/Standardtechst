import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/protected")({
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
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Protected route</div>;
}
