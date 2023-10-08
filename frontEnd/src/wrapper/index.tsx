import React from "react";
import QueryClients from "./QueryClient";
import { CssBaseline } from "@mui/material";
type child = {
  children: React.ReactNode;
};
const index = ({ children }: child) => {
  return (
    <QueryClients>
      <CssBaseline />
      {children}
    </QueryClients>
  );
};

export default index;
