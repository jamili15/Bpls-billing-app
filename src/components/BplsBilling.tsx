"use client";

import React, { useEffect, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { Form } from "react-final-form";
import RefNo from "./RefNo";
import BillingInfoController from "./BplsBillingController";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import BillingInfo from "./BillingInfo";

interface BillInfoProps {
  moduleTitle: string;
}

const BplsBilling: React.FC<BillInfoProps> = ({ moduleTitle }) => {
  const {
    step,
    loading,
    refno,
    error,

    handleNextClickStep1,
    handleBack,
    handleRefNoChange,
  } = BillingInfoController();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="bg-white w-[700px] py-5 flex items-center justify-center rounded-md shadow-md text-[16px]">
      <div className="p-10 w-full">
        <div className="flex flex-col gap-2 pb-2">
          <h1 className="capitalize text-[26.4px] font-bold ">{moduleTitle}</h1>
          <h2 className="text-green-500 capitalize text-[20.4px] font-bold">
            Billing Information
          </h2>
          <p className="pb-5">
            A validation key will be sent to your email or mobile phone. Please
            make sure your email is valid and you have access to it.
          </p>
        </div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form
              className="flex flex-col items-start justify-start gap-10"
              onSubmit={handleSubmit}
            >
              {step === "refno" && (
                <div className="relative flex flex-col w-full gap-6">
                  <RefNo
                    onChange={handleRefNoChange}
                    error={error}
                    helperText={error}
                  />
                </div>
              )}
              {step === "billinfo" && <BillingInfo refno={refno} />}
              <div className="bg-gray-300 w-full h-[0.5px] mt-8" />
              <div className="flex items-center justify-between px-5 w-full ">
                <Button
                  className="font-bold text-[#6200EE] hover:bg-[#b898e626] px-5"
                  size="medium"
                  onClick={refno.trim() !== "" ? handleBack : undefined}
                >
                  Back
                </Button>

                <LoadingButton
                  size="medium"
                  onClick={handleNextClickStep1}
                  endIcon={
                    <SendIcon
                      className={`${
                        loading ? "block text-transparent" : "hidden"
                      }`}
                    />
                  }
                  loading={loading}
                  loadingPosition="end"
                  variant="outlined"
                  disabled={refno.trim() === ""}
                  className={`${
                    loading || refno.trim() === ""
                      ? "bg-gray-200 font-bold text-gray-500 !border-none"
                      : "bg-[#6200EE] !text-white font-bold hover:bg-[#7319f0] hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
                  } `}
                >
                  Next
                </LoadingButton>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default BplsBilling;
