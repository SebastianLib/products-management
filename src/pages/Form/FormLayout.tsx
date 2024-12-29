import React, { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { Typography } from "@mui/material";

const FormLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastPart = path.substring(path.lastIndexOf("/") + 1);

  return (
    <PageLayout className="flex flex-col items-center pt-28">
      <Typography
        variant="h2"
        component="h2"
        sx={{ fontWeight: "bold", fontSize: { xs: "2rem", md: "2.5rem" } }}
      >
        Create {lastPart === "create-category" ? "Category" : "Product"}
      </Typography>
      <Outlet />
    </PageLayout>
  );
};

export default FormLayout;
