import React from "react";
import Protected from "../../Components/Protected";
import Profile from "../../Components/Profile";
export default function Index() {
  return (
    <Protected>
      <Profile></Profile>
    </Protected>
  );
}
