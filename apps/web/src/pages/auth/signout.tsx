import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import LoadingIndicator from "@/components/common/LoadingIndicator";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, [router]);

  return <LoadingIndicator />;
};

export default Logout;
