import React from "react";
import DashboarLayout from "../../components/DashboardLayout";
import Protected from "../../components/Protected";
export default function Index() {
  return (
    <Protected>
      <DashboarLayout></DashboarLayout>
    </Protected>
  );
}
