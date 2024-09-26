import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Here you can add logic to clear authentication tokens, localStorage, etc.
    // After that, redirect the user to the login page
    setTimeout(() => {
      router.push("/login"); // Redirect to login page after logout
    }, 1000); // 1 second delay for a smoother transition
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl">Logging out...</h1>
    </div>
  );
}
