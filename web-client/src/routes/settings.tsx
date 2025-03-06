import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { Box } from "@radix-ui/themes";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

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
  component: RouteComponent,
});

function RouteComponent() {
  return <div>
    Settings

    <table>
      <tbody>
        <tr>
          <td>Language</td>
          <td><input /></td>
        </tr>
        <tr>
          <td>Dark Mode</td>
          <td><input /></td>
        </tr>
      </tbody>
    </table>

  </div>;

}
