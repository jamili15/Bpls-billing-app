import { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { useState } from "react";
import { lookupService } from "@/common/lib/client";
import Bill from "@/model/Bill";

const BillingInfoController = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<string>("refno");
  const [validate, setValidate] = useState(false);
  const [refno, setRefno] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [option, setOption] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const svc = lookupService("BusinessBilling");
  const [qtr, setQtr] = useState<number | string | null>(4);
  const [bill, setBill] = useState<Bill>();

  const options = [1, 2, 3, 4];

  const handleRefNoChange = (value: string) => {
    setRefno(value);
    if (error) {
      setError(null);
    }

    setNextButtonDisabled(value.trim() === "");
  };

  const handleNextClickStep1 = async () => {
    setLoading(true);
    try {
      const res = await svc?.invoke("getBilling", {
        refno: refno,
        qtr: 4,
        showdetails: true,
      });
      console.log("res", res);
      if (res && res.error) {
        setError(res.error);
      } else if (res) {
        setStep("billinfo");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching billing information.");
    }
    setLoading(false);
  };

  const handleBack = () => {
    setStep("refno");
    setRefno("");
    setNextButtonDisabled(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  const handlePayOptionChange = async (qtr: number | string) => {
    setQtr(qtr);
    setOpen(false);
    try {
      const res = await svc?.invoke("getBilling", {
        refno: refno,
        qtr: qtr,
        showdetails: true,
      });
      setBill(new Bill(res));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loading,
    step,
    validate,
    error,
    setLoading,
    setStep,
    open,
    option,
    options,
    qtr,
    setValidate,
    refno,
    setRefno,
    setError,
    handleChange,
    handleClose,
    handleOpen,
    handleNextClickStep1,
    handleBack,
    handleRefNoChange,
    handlePayOptionChange,
    nextButtonDisabled,
  };
};

export default BillingInfoController;
