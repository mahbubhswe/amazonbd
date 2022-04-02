import React from "react";
import Protected from "../../components/Protected";
import Profile from "../../components/Profile";
export default function Index() {
  return (
    <Protected>
      <Profile></Profile>
    </Protected>
  );
}
