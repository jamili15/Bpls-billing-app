"use client";

import { Button, TextField } from "@mui/material";
import React, { MouseEventHandler } from "react";
import { Field } from "react-final-form";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

interface PayerInfoProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBack?: MouseEventHandler<HTMLButtonElement>;
}

const PayerInfo: React.FC<PayerInfoProps> = ({ value, onChange, onBack }) => {
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <Field
        name="payerName"
        render={({ input, meta }) => (
          <div>
            <TextField
              {...input}
              value={value}
              onChange={onChange}
              id="payerName"
              label="Payer Name"
              variant="standard"
              className="w-full"
              required
            />
          </div>
        )}
      />
      <Field
        name="payerAddress"
        render={({ input, meta }) => (
          <div>
            <TextField
              {...input}
              value={value}
              onChange={onChange}
              id="payerAddress"
              label="Payer Address"
              variant="standard"
              className="w-full"
              required
            />
          </div>
        )}
      />
      <>
        <div className="bg-gray-300 w-full h-[0.5px] mt-8" />

        <div className="flex items-center justify-between px-5 w-full ">
          <Button
            className="font-bold text-[#6200EE] hover:bg-[#b898e626] px-5"
            size="medium"
            onClick={onBack}
          >
            Back
          </Button>
          <LoadingButton
            size="medium"
            onClick={handleClick}
            endIcon={
              <SendIcon
                className={`${loading ? "block text-transparent" : "hidden"}`}
              />
            }
            loading={loading}
            loadingPosition="end"
            variant="outlined"
            className={`   
            bg-[#6200EE] text-white font-semibold hover:bg-[#7319f0] hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.3)] duration-200"
          `}
          >
            {"Confirm Payment"}
          </LoadingButton>
        </div>
      </>
    </div>
  );
};

export default PayerInfo;
