import React from "react";
import { Helmet } from "react-helmet-async";
import PackagesSection from "../components/PackagesSection";

const Payment = () => {
  return (
    <>
      <Helmet>
        <title>LSAT Tutoring Packages & Payment | LSAT Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PackagesSection />
    </>
  );
};

export default Payment;
