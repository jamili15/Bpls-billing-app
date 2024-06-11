import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface HomeProps {
  children: React.ReactNode;
  lgucaption?: string | undefined;
  lguLogo: string;
}

const MasterLayout: React.FC<HomeProps> = ({
  children,
  lgucaption,
  lguLogo,
}) => {
  return (
    <div className="flex flex-col items-center justify-between ">
      <Header lguLogo={lguLogo} lgucaption={lgucaption} />
      <main className="flex justify-start p-20">{children}</main>
      <Footer copyright={"@Copyright 2024 Filipizen"} />
    </div>
  );
};

export default MasterLayout;
