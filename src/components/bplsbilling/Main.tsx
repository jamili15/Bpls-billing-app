"use client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MouseEventHandler, useEffect, useState } from "react";
import Currency from "../ui/Currency";
import Paper from "@mui/material/Paper";

interface BillInfoProps {
  onBack?: MouseEventHandler<HTMLButtonElement>;
  moduleTitle: string;
  subTitleText?: string;
  descriptionText?: string;
}

const BillingInfo: React.FC<BillInfoProps> = ({
  onBack,
  moduleTitle,
  subTitleText,
  descriptionText,
}) => {
  //   const { acctno } = useWaterBillingContext();
  //   const svcAcct = lookupService("WaterService");
  //   const { channelId } = usePartnerContext();
  //   const [bill, setBill] = useState<Bill>();

  //   const loadData = async () => {
  //     try {
  //       const res = await svcAcct?.invoke("getBilling", {
  //         partnerid: channelId,
  //         refno: acctno,
  //       });
  //       setBill(new Bill(res));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     loadData();
  //   }, []);

  const bill = [
    {
      surcharge: "202",
      amount: "30",
      total: "20",
      interest: "21313",
      particulars: "comshop comshop comshop ",
    },
    {
      surcharge: "202",
      amount: "120",
      total: "340",
      interest: "21313",
      particulars: "comshop",
    },
    {
      surcharge: "202",
      amount: "10",
      total: "20",
      interest: "21313",
      particulars: "comshop",
    },
    {
      surcharge: "202",
      amount: "550",
      total: "770",
      interest: "21313",
      particulars: "comshop",
    },
  ];

  const totalAmountDue = [{ remarks: "Bill Amount ", amountdue: "amount" }];

  return (
    <div className="bg-white w-[700px] py-5 flex items-center justify-center rounded-md shadow-md text-[16px]">
      <div className="p-10 w-full">
        <div className="flex flex-col gap-2 pb-2">
          <h1 className="capitalize text-[26.4px] font-bold ">{moduleTitle}</h1>
          <h2 className="text-green-500 capitalize text-[20.4px] font-bold">
            Billing Information
          </h2>
          {/* {showInvalidKey && (
            <p className="text-[#b00020] text-sm text-center bg-[#f5f5dc] p-2 rounded border">
              Invalid Key Value
            </p>
          )}
          {accountNoError && (
            <p className="text-[#b00020] text-sm text-center bg-[#f5f5dc] p-2 rounded border">
              Incorrect Account Number. Please check and try again.
            </p>
          )} */}
          <p>
            A validation key will be sent to your email or mobile phone. Please
            make sure your email is valid and you have access to it.
          </p>
        </div>
        <div className="w-full flex flex-col gap-5">
          {/* <div className="flex justify-start w-full !text-[20px]">
            <div className="grid grid-rows-7 gap-2 font-bold indent-12 w-full">
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
                <p key={index} className="text-start">
                  {label}
                </p>
              ))}
            </div>
            <div>
              <div className="grid grid-rows-7 gap-2 font-semibold w-full">
                {[
                  "09090909",
                  "RENEW",
                  "2024-01-31",
                  "13131231232",
                  "TRU STORE A",
                  "DELA CRUZ, JUAN",
                  "MAN-UP, ALTAVAS, AKLAN",
                  "4th Quarter",
                ].map((value, index) => (
                  <p key={index} className="text-start">{`${value}`}</p>
                ))}
              </div>
            </div>
          </div> */}
          <div className="flex flex-col gap-2">
            <h1 className="text-center">Billing Summary</h1>
            <TableContainer
              component={Paper}
              className="max-h-[500px] !h-[450px]  overflow-auto"
            >
              <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead className="sticky top-0 bg-white shadow-md">
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
                  {bill.map((config: any, index: any) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="uppercase"
                      >
                        {config.particulars}
                      </TableCell>
                      <TableCell align="right">
                        <Currency amount={config.amount} />
                      </TableCell>
                      <TableCell align="right">
                        <Currency amount={config.surcharge} />
                      </TableCell>
                      <TableCell align="right">
                        <Currency amount={config.interest} />
                      </TableCell>
                      <TableCell align="right">
                        <Currency amount={config.total} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div>
              {totalAmountDue.map((row: any, index: number) => (
                <div
                  key={`${index}`}
                  className="flex justify-end items-center gap-5"
                >
                  <div className="font-bold uppercase">{row.remarks}</div>

                  <div className="font-bold">
                    <Currency currency="Php" amount={"12112"} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInfo;
