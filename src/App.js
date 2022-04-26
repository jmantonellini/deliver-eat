import React from "react";
import PantallaPedidoContainer from "./containers/Pedido/PantallaPedidoContainer";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import theme from "./constants/Theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <PantallaPedidoContainer />;
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
