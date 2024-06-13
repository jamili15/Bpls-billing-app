"use client";

import EmailVerification from "@/common/components/EmailVerification";
import { usePartnerContext } from "@/common/components/PartnerModel";
import MasterLayout from "@/common/layouts/MasterLayout";
import BplsBilling from "@/components/BplsBilling";

import BillingInfo from "@/components/BplsBilling";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { title, setId, resources } = usePartnerContext();
  const [step, setStep] = useState<string>("billing");

  const handler = () => {
    setStep("billing");
  };

  useEffect(() => {
    if (params.id) {
      setId(params.id);
    }
    console.log("ID", title);
  }, [setId]);

  if (step === "email") {
    return (
      <MasterLayout lgucaption={title} lguLogo={resources}>
        <EmailVerification
          moduleTitle=" Business Online Billing and Payment"
          onSuccess={handler}
        />
      </MasterLayout>
    );
  } else if (step === "billing") {
    return (
      <MasterLayout lgucaption={title} lguLogo={resources}>
        <BplsBilling moduleTitle={"Business Online Billing and Payment "} />
      </MasterLayout>
    );
  }
}
