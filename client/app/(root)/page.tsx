'use client'

import Image from "next/image";
import Loading from "../loading";
import { Suspense, useEffect, useState  } from "react";

export default function Home() {

  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    fetch("http://localhost:3000/auth").then(
      res => res.json()
    ).then(
      data => {
        setMessage(data.message)
      }
    )
  }, )
  return (
    <>
    {message}
    </>
  );
}
