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
    <div className="flex flex-col items-center justify-between gap-10">
      <Header lguLogo={lguLogo} lgucaption={lgucaption} />
      <main className=" flex items-center justify-center pt-10s">
        {children}
      </main>
      <Footer copyright={"@Copyright 2024 Filipizen"} />
    </div>
  );
};

export default MasterLayout;
