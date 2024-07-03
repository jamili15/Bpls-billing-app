"use client";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Currency from "./ui/Currency";
import Paper from "@mui/material/Paper";
import { Button } from "@/common/io/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Bill, BillItem } from "@/types";

import { lookupService } from "@/common/lib/client";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { usePartnerContext } from "@/common/components/Email/PartnerModel";
import Card from "@/common/ui/Card";
import { ActionBar } from "@/common/ui/ActionBar";

const BillingInfo = (props: any) => {
  const bill = props.formValues.bill;
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
    const refno = bill?.info.bin || bill?.info.appno;
    try {
      const res: Bill = await svc?.invoke("getBilling", {
        partnerid: partner?.channelid,
        refno: refno,
        qtr: qtr,
        showdetails: true,
      });
      console.log("RES \n\n\n ===>", res);
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
            bill?.info.appno,
            bill?.info.apptype,
            bill?.info.appdate,
            bill?.info.bin,
            bill?.info.tradename,
            bill?.info.ownername,
            bill?.info.address,
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
        <div>
          <Button
            className="!border border-solid shadow-sm  bg-transparent text-[#6200ee] hover:bg-[#6200ee12] hover:shadow-md mt-5"
            variant="contained"
            size="small"
            onClick={handleOpen}
          >
            Pay option
          </Button>
        </div>
        <h1 className="text-center">Billing Summary</h1>
        <TableContainer
          component={Paper}
          className="max-h-[500px] !h-[360px] overflow-auto"
        >
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead className="sticky top-0 bg-white shadow-sm">
              <TableRow className="uppercase">
                <TableCell className="font-bold">Particulars</TableCell>
                <TableCell align="right" className="font-bold">
                  Amount
                </TableCell>
                <TableCell align="right" className="font-bold">
                  Surcharge
                </TableCell>
                <TableCell align="right" className="font-bold">
                  Interest
                </TableCell>
                <TableCell align="right" className="font-bold">
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bill?.info.items.map((items: BillItem, index: any) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row" className="uppercase">
                    {items.lobname} - {items.account}
                  </TableCell>
                  <TableCell align="right">
                    <Currency amount={items.amount} />
                  </TableCell>
                  <TableCell align="right">
                    <Currency amount={items.surcharge} />
                  </TableCell>
                  <TableCell align="right">
                    <Currency amount={items.interest} />
                  </TableCell>
                  <TableCell align="right">
                    <Currency amount={items.total} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
        <div className="pr-5 pt-2">
          <div className="flex justify-end items-center gap-5">
            <div className="font-bold uppercase">Bill Amount</div>
            <div className="font-bold">
              <Currency currency="Php" amount={bill?.info.amount ?? 0} />
            </div>
          </div>
        </div>
      </div>
      <ActionBar>
        <Button
          onClick={props.onCancel}
          variant="text"
          className="font-bold text-[#6200EE] bg-white hover:bg-[#b898e626] px-5"
        >
          Back
        </Button>
        <Button onClick={props.onSubmit}>Next</Button>
      </ActionBar>
    </Card>
  );
};

export default BillingInfo;
