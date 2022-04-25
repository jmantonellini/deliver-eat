import React from "react";
import PantallaPedido from "../../components/Pedido/PantallaPedido";
import Styles from "./PantallaPedidoContainerStyle";

const PantallaPedidoContainer = () => {
  return (
    <div style={Styles.screen}>
      <PantallaPedido />;
    </div>
  );
};

export default PantallaPedidoContainer;
