import { SignIn } from '@clerk/nextjs'
import React from 'react'

const LoginPage = () => {
  return (
    <>
    <div className="flex justify-center">

      <SignIn />
    </div>
    </>
  )
}

export default LoginPage