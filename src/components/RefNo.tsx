import { TextField } from "@mui/material";
import React from "react";
import { Field } from "react-final-form";

interface RefAccountProps {
  value?: string;
  onChange: (value: string) => void;
  error?: boolean | string | null;
  helperText?: React.ReactNode;
}

const RefAccount: React.FC<RefAccountProps> = ({
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <Field
      name="accountNo"
      render={({ input, meta }) => (
        <TextField
          {...input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          id="accountNo"
          label="Account No."
          variant="standard"
          className="!w-full"
          required
          error={error || (meta.error && meta.touched)}
          helperText={
            helperText || (meta.error && meta.touched ? meta.error : "")
          }
        />
      )}
    />
  );
};

export default RefAccount;
