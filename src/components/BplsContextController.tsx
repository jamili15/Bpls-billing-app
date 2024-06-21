"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { lookupService } from "@/common/lib/client";
import Bill from "@/model/Bill";
import { usePartnerContext } from "@/common/components/PartnerModel";

interface BillingInfoContext {
  loading: boolean;
  step: string;
  validate: boolean;
  errorMessage: string;
  error: boolean;
  open: boolean;
  options: number[];
  qtr: number | string | null;
  bill: Bill | null;
  helperText: string | null;
  refno: string;
  setRefno: (value: string) => void;
  setErrorMessage: (value: string) => void;
  setValidate: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setStep: (value: string) => void;
  setBill: (value: Bill | null) => void;
  handleClose: () => void;
  handleOpen: () => void;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  handleRefNoChange: (value: string) => void;
  nextButtonDisabled: boolean;
  handleRefNoBlur: () => void;
  handlePayOptionChange: (qtr: number | string) => Promise<void>;
}

const BillingContext = createContext<BillingInfoContext | undefined>(undefined);

export const BillingInfoProvider = ({ children }: { children: ReactNode }) => {
  const options = [1, 2, 3, 4];
  const [bill, setBill] = useState<Bill | null>(null);
  const [qtr, setQtr] = useState<number | string | null>(options[3]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<string>("refno");
  const [validate, setValidate] = useState(false);
  const [refno, setRefno] = useState<string>("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [helperText, setHelperText] = useState<string | null>(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const { channelId } = usePartnerContext();
  const svc = lookupService("BusinessBillingService");

  const handleRefNoChange = (value: string) => {
    setRefno(value);
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      setNextButtonDisabled(true);
      setError(false);
      setErrorMessage("");
    } else {
      setNextButtonDisabled(false);
      setError(false);
      setHelperText(null);
    }
  };

  const handleRefNoBlur = () => {
    if (refno.trim() === "") {
      setHelperText("Value is required");
      setError(true);
    } else {
      setHelperText(null);
      setError(false);
    }
  };

  const handleNext = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage("");
    try {
      const res = await svc?.invoke("getBilling", {
        partnerid: channelId,
        refno: refno,
        qtr: qtr,
        showdetails: true,
      });
      console.log("Billing info fetched", res);
      if (res === undefined) {
        setErrorMessage(`Cannot find business application ${refno}`);
        setError(true);
      } else {
        setBill(new Bill(res));
        setStep("billinfo");
      }
    } catch (error) {
      setErrorMessage(
        "Partner is currently not available. Please try again later."
      );
      setError(true);
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep("refno");
    setRefno("");
    setErrorMessage("");
    setError(false);
    setNextButtonDisabled(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePayOptionChange = async (qtr: number | string) => {
    setQtr(qtr);
    setOpen(false);
    const refno = bill?.bin || bill?.appno;
    try {
      const res = await svc?.invoke("getBilling", {
        partnerid: channelId,
        refno: refno,
        qtr: qtr,
      });
      setBill(new Bill(res));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BillingContext.Provider
      value={{
        loading,
        step,
        validate,
        errorMessage,
        error,
        open,
        options,
        qtr,
        bill,
        helperText,
        refno,
        setRefno,
        setErrorMessage,
        setValidate,
        setLoading,
        setStep,
        setBill,
        handleClose,
        handleOpen,
        handleNext,
        handleBack,
        handleRefNoChange,
        nextButtonDisabled,
        handleRefNoBlur,
        handlePayOptionChange,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBillingContext = (): BillingInfoContext => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBillingContext must be used within a BillingProvider");
  }
  return context;
};
