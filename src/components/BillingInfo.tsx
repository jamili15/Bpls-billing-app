"use client";

import React, { useEffect, useState } from "react";
import Table, { Column } from "@/components/ui/Table";
import { Button } from "@/common/io/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Bill } from "@/types";
import { lookupService } from "@/common/lib/client";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import Card from "@/common/ui/Card";
import { ActionBar } from "@/common/ui/ActionBar";
import Title from "@/common/io/Title";

const BillingInfo = (props: any) => {
  const bill: Bill = props.formValues.bill;
  const [qtr, setQtr] = React.useState<number | undefined>(4);
  const [showQtr, setShowQtr] = React.useState<number | undefined>(qtr);
  const { partner } = usePartnerContext();
  const svc = lookupService("BusinessBillingService");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChangeQtr = (event: SelectChangeEvent) => {
    setQtr(Number(event.target.value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const refno = bill?.bin || bill?.appno;
    try {
      const res: Bill = await svc?.invoke("getBilling", {
        partnerid: partner?.channelid,
        refno: refno,
        qtr: qtr,
        showdetails: true,
      });

      if (!res || res.error) {
        setError(res.error);
        setOpen(false);
      } else {
        props.form.change("bill", res);
        setOpen(false);
        setShowQtr(qtr);
        setError(res.error);
      }
    } catch (error) {
      console.error("Error submitting billing information:", error);
    } finally {
      setLoading(false);
    }
  };

  const billQtr = [];
  if (qtr) {
    for (let q = 1; q <= 4; q++) {
      billQtr.push(q);
    }
  } else {
    billQtr.push(1, 2, 3, 4);
  }

  const columns: Column[] = [
    {
      label: "Particulars",
      field: "account-lobname",
      align: "left",
      render: (item) => (
        <p>
          {item.lobname} - {item.account}
        </p>
      ),
    },
    { label: "Amount", field: "amount", align: "right" },
    { label: "Surcharge", field: "surcharge", align: "right" },
    { label: "Interest", field: "interest", align: "right" },
    { label: "Total", field: "total", align: "right" },
  ];

  return (
    <Card title={props.title} subTitleText={props.page.caption} error={error}>
      <div className="flex justify-start items-center">
        <div className="grid grid-rows-7 gap-2 font-semibold indent-8">
          {[
            "Application No.",
            "Application Type",
            "Dated Filed",
            "BIN",
            "Trade Name",
            "Owner Name",
            "Business Address",
            "Bill Quarter",
          ].map((label, index) => (
            <p key={index} className=" !text-sm">
              {label}
            </p>
          ))}
        </div>
        <div className="grid grid-rows-7 gap-2 indent-40">
          {[
            bill?.appno,
            bill?.apptype,
            bill?.appdate,
            bill?.bin,
            bill?.tradename,
            bill?.ownername,
            bill?.address,
            `${
              showQtr === 1
                ? "1st"
                : showQtr === 2
                ? "2nd"
                : showQtr === 3
                ? "3rd"
                : "4th"
            } Quarter`,
          ].map((value, index) => (
            <p key={index} className="text-sm">{`${value}`}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="!border border-solid shadow-sm  bg-transparent text-[#6200ee] hover:bg-[#6200ee12] hover:shadow-md mt-6 w-[17%]"
          variant="contained"
          size="small"
          onClick={handleOpen}
        >
          Pay option
        </Button>
        <Table
          columns={columns}
          items={props.formValues.bill?.items || []}
          totalAmountDue={props.formValues.bill?.amount}
          amountCaption="Bill Amount :"
        />
        <Modal open={open} onClose={handleOpen}>
          <Box className="fixed flex flex-col items-center justify-start top-1/2 left-1/2 w-64 h-52 bg-white shadow-xl p-4 transform -translate-x-1/2 -translate-y-1/2 rounded-sm ">
            <Typography variant="h6" component="h2" className="pb-5">
              Pay Options
            </Typography>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">
                Bill to Quarter
              </InputLabel>
              <Select
                value={qtr?.toString() ?? ""}
                onChange={handleChangeQtr}
                label="Bill to Quarter"
              >
                {billQtr.map((qtr) => (
                  <MenuItem key={qtr} value={qtr}>
                    {qtr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{ minWidth: 230 }}
              className="flex items-end justify-end gap-2 pt-10"
            >
              <Button
                className="bg-transparent shadow-none text-[#6300ee] hover:bg-[#6300ee10] hover:shadow-sm"
                variant="contained"
                size="small"
                onClick={handleOpen}
              >
                Cancel
              </Button>
              <Button
                className="shadow-sm border border-[#6300ee] bg-[#6300ee22] text-[#6200ee] hover:bg-[#6300ee32] hover:shadow-md"
                variant="contained"
                size="small"
                onClick={handleSubmit}
              >
                {loading ? <CircularProgress size={20} /> : "Submit"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <ActionBar className="justify-between mt-14 relative">
        <div className=" bg-gray-300 absolute bottom-14 h-[1px] w-full" />
        <Button
          onClick={props.onCancel}
          variant="text"
          className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
        >
          Back
        </Button>
        <Button onClick={props.onSubmit}>Confirm Payment</Button>
      </ActionBar>
    </Card>
  );
};

export default BillingInfo;
