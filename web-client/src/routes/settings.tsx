import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  beforeLoad: ({ context, location }) => {
    console.log(context);
    
    if (!context.isLoading && !context.isAuthenticated) {
      console.log('redirecting')
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
  return <div>Settings</div>;
}
