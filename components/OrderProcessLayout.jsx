import React from "react";
import { Stepper, Step } from "react-form-stepper";
import Protected from "./Protected";
export default function OrderProcessLayout({ activeStep, children }) {
  return (
    <Protected>
      <Stepper
        steps={[
          { label: "Shipping" },
          { label: "Billing" },
          { label: "Completed" },
        ]}
        activeStep={activeStep}
      />
      {children}
    </Protected>
  );
}
