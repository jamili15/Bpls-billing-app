"use client";

import PayerInfo from "@/components/PayerInfo";
import BillingInfo from "@/components/bplsbilling/Main";
import Image from "next/image";
import { Form } from "react-final-form";

export default function Home() {
  const onSubmit = (values: any) => {
    // Handle form submission
    console.log(values);
  };
  return (
    <div>
      {/* <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            className="flex flex-col items-start justify-start gap-5"
            onSubmit={handleSubmit}
          >
            <PayerInfo />
          </form>
        )}
      /> */}

      <BillingInfo moduleTitle={" Business and Licensing"} />
    </div>
  );
}
