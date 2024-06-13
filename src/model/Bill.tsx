import BillItem from "../model/BillItem";

class Bill {
  address: string;
  amount: number;
  appdate: string;
  appno: string;
  apptype: string;
  bin: string;
  email: string;
  expirydate: string;
  ownername: string;
  tradename: string;
  txntype: string;
  txnttypename: string;
  qtr: number | string | void;
  items: BillItem[];

  public constructor(data: any) {
    const info = data?.info || {};
    this.address = data?.info.address;
    this.amount = data?.info.amount;
    this.appdate = data?.info.appdate;
    this.appno = data?.info.appno;
    this.apptype = data?.info.apptype;
    this.bin = data?.info.bin;
    this.email = data?.info.email;
    this.expirydate = data?.info.expirydate;
    this.ownername = data?.info.ownername;
    this.tradename = data?.info.tradename;
    this.txntype = data?.info.txntype;
    this.txnttypename = data?.info.txntypename;
    this.qtr = data?.qtr;
    this.items = (info.items || []).map((item: any) => new BillItem(item));
  }
}

export default Bill;
