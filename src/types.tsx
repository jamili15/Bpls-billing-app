export type Bill = {
  ownername: string;
  tradename: string;
  address: string;
  appno: string;
  bin: string;
  appdate: string;
  apptype: string;
  expirydate: string;
  email: string;
  mobileno: string | null;
  amount: number;
  txntype: string;
  txntypename: string;
  qtr: string;
  particulars: string;
  items: BillItem[];
  error: string;
};

export type BillItem = {
  lobname: string;
  account: string;
  amount: number;
  discount: number;
  surcharge: number;
  interest: number;
  total: number;
};
