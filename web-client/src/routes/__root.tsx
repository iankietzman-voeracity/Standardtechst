import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Button>Let's go</Button>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

export const Route = createRootRoute({
  component: App,
})
