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
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dropdown from "./ui/Dropdown";
import BillItem from "@/model/BillItem";
import { useBillingContext } from "@/components/BplsContextController";

interface BillProps {
  refno: string;
}

const BillingInfo: React.FC<BillProps> = ({ refno }) => {
  const {
    open,
    loading,
    options,
    qtr,
    bill,
    handleOpen,
    handlePayOptionChange,
    handleClose,
  } = useBillingContext();

  console.log("qtr", qtr, "bill amount", bill?.amount);

  if (loading || !bill) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="flex space-x-2">
          <div className="w-5 h-5 bg-gray-100 rounded-full animate-bounce1"></div>
          <div className="w-5 h-5 bg-gray-100 rounded-full animate-bounce2"></div>
          <div className="w-5 h-5 bg-gray-100 rounded-full animate-bounce3"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
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
            bill.appno,
            bill.apptype,
            bill.appdate,
            bill.bin,
            bill.tradename,
            bill.ownername,
            bill.address,
            `${
              qtr === 1 ? "1st" : qtr === 2 ? "2nd" : qtr === 3 ? "3rd" : "4th"
            } Quarter`,
          ].map((value, index) => (
            <p key={index} className="text-sm">{`${value}`}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <Button
            className="shadow-md border border-[#335f96] mt-5"
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
              {bill.items.map((items: BillItem, index: any) => (
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
        <Modal open={open} onClose={handleClose}>
          <Box className="fixed flex flex-col items-center justify-start top-1/2 left-1/2 w-64 h-52 bg-white shadow-xl p-4 transform -translate-x-1/2 -translate-y-1/2 rounded-sm ">
            <Typography variant="h6" component="h2" className="pb-5">
              Pay Options
            </Typography>
            <Dropdown
              options={options}
              onChange={handlePayOptionChange}
              caption="Quarter to Bill"
            />
          </Box>
        </Modal>
        <div className="pr-5 pt-2">
          <div className="flex justify-end items-center gap-5">
            <div className="font-bold uppercase">Bill Amount</div>
            <div className="font-bold">
              <Currency currency="Php" amount={bill.amount ?? 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;
