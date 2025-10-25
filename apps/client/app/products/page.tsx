import React, { Suspense } from "react";
import ProductListPage from "../../components/products/ProductListPage";
import GlobalLoader from "../../components/global/global-loader";

const page = () => {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <ProductListPage />
    </Suspense>
  );
};

export default page;
