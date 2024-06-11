"use client";

import BillingInfo from "@/components/bplsbilling/Main";
import MasterLayout from "@/components/layouts/MasterLayout";

import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const handler = () => {};
  const [id, setId] = useState(params.id);

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
  }, [setId]);

  return (
    <MasterLayout lgucaption={"lgu"} lguLogo={"/lgu-logo.png"}>
      <BillingInfo moduleTitle={" Business and Licensing"} />
    </MasterLayout>
  );
}
