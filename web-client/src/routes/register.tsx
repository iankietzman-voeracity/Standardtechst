import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: Register,
})

function Register() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Button>Register</Button>
      </div>
    </>
  )
}

// export default Register;
