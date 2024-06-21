import { TextField } from "@mui/material";
import React from "react";
import { Field } from "react-final-form";

interface RefAccountProps {
  value?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: boolean | string | null;
  helperText?: React.ReactNode;
}

const RefAccount: React.FC<RefAccountProps> = ({
  value,
  onChange,
  onBlur,
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
          onBlur={onBlur}
          id="accountNo"
          label="BIN or Application No."
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
