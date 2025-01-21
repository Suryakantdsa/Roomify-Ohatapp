"use client";
import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const ProtectedLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const loading = useAuth();
  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
