import Service from "@/common/lib/server/remote-service";
import { Bill } from "@/types";

export const getBilling = async ({
  partnerid,
  refno,
  qtr = 4,
  showdetails = true,
}: {
  partnerid: string;
  refno: string;
  qtr?: number;
  showdetails?: boolean;
}) => {
  try {
    const svc = Service.lookup(
      `${partnerid}:OnlineBusinessBillingService`,
      "etracs"
    );

    const bill = await svc.invoke("getBilling", {
      refno,
      qtr,
      showdetails,
    });

    const data: Bill = {
      ...bill.info,
      particulars: `Business Identification Number (BIN) ${bill?.info.bin}`,
      qtr: qtr,
    };

    if (bill.status === "ERROR") {
      return { code: "01", error: bill.msg };
    }
    return data;
  } catch (error) {
    return {
      code: "01",
      error: error,
    };
  }
};
