"use client";
import React from "react";
import Auth from "../../components/Auth";
import userAuthStore from "../../lib/features/userAuth/userAuthStore";
import Loading from "../../components/Loading";

const page = () => {
  const { loading } = userAuthStore();
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Auth mode="signin" />
    </div>
  );
};

export default page;
