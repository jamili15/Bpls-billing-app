import Service from "@/common/lib/server/remote-service";

export const getBilling = async ({
  refno,
  qtr = 4,
  showdetails = true,
}: {
  refno: string;
  qtr?: number;
  showdetails?: boolean;
}) => {
  const svc = Service.lookup("gdx/OnlineBusinessBillingService", "etracs");
  const bill = await svc.invoke("getBilling", { refno, qtr, showdetails });
  if (bill.status === "ERROR") {
    return { code: "01", error: bill.msg };
  }
  return bill;
};
