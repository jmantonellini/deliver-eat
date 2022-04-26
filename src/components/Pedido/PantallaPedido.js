import React, { useEffect, useState } from "react";
import MapWrapper from "../GoogleMaps/MapWrapper";
import Dropzone from "../Dropzone/Dropzone";
import Styles from "./PantallaPedidoStyles";
import CustomInput from "../Input/CustomInput";
import { INPUT_TYPES } from "../../constants/TypeKeys";
import { ciudadesAcotado } from "../../constants/Ciudades";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { distanceInMeters } from "../../utils/GoogleMapsAPI";
import DialogContainer from "../Dialog/DialogContainer";
import { billingTypes } from "../../constants/Billing";
import { calculatePrice } from "../../utils/Billing";
import { DateTimePicker, DesktopDateTimePicker } from "@mui/x-date-pickers";
import { parseISO } from "date-fns";

const PantallaPedido = () => {
  const [isError, setIsError] = useState(false);
  const [addressFromData, setAddressFromData] = useState({ city: "CORDOBA" });
  const [addressToData, setAddressToData] = useState({ city: "CORDOBA" });
  const [productData, setProductData] = useState({});
  const [billingData, setBillingData] = useState({ billingType: "efectivo" });
  const [deliveryData, setDeliveryData] = useState({
    deliveryType: "inmediata",
  });
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [tripDistance, setTripDistance] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [openedDialog, setOpenedDialog] = useState(false);
  const [dialog, setDialog] = useState({});

  const success = (param) => {
    console.log("SUCCESS", param.coords);
    setCurrentLocation({
      lat: param.coords.latitude,
      lng: param.coords.longitude,
    });
  };
  const error = (param) => {
    console.log("ERROR", param);
  };

  const options = (param) => {
    console.log(param);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const handleChangeDelivery = (key, value) => {
    const newVariables = { ...deliveryData, [key]: value };
    setDeliveryData(newVariables);
  };

  const handleChangeAddressFrom = (key, value) => {
    const newVariables = { ...addressFromData, [key]: value };
    setAddressFromData(newVariables);
  };

  const addressFromInputs = [
    {
      type: INPUT_TYPES.SELECT,
      tooltip: "Ciudades de Córdoba",
      value: addressFromData?.city,
      key: "city",
      label: "Ciudad",
      handleChange: handleChangeAddressFrom,
      menuItems: ciudadesAcotado,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Nombre de la calle",
      value: addressFromData?.street,
      key: "street",
      label: "Calle",
      handleChange: handleChangeAddressFrom,
    },
    {
      type: INPUT_TYPES.TEXT,
      textType: "number",
      tooltip: "Número de la calle",
      value: addressFromData?.number,
      key: "number",
      label: "Número",
      handleChange: handleChangeAddressFrom,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Referencia para ubicar al cadete.",
      value: addressFromData?.reference,
      key: "reference",
      label: "Referencia",
      handleChange: handleChangeAddressFrom,
    },
  ];

  const handleChangeAddressTo = (key, value) => {
    const newVariables = { ...addressFromData, [key]: value };
    setAddressToData(newVariables);
  };

  const addressToInputs = [
    {
      type: INPUT_TYPES.SELECT,
      tooltip: "Ciudades de Córdoba",
      value: addressToData?.city,
      key: "city",
      label: "Ciudad",
      handleChange: handleChangeAddressTo,
      menuItems: ciudadesAcotado,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Nombre de la calle",
      value: addressToData?.street,
      key: "street",
      label: "Calle",
      handleChange: handleChangeAddressTo,
    },
    {
      type: INPUT_TYPES.TEXT,
      textType: "number",
      tooltip: "Número de la calle",
      value: addressToData?.number,
      key: "number",
      label: "Número",
      handleChange: handleChangeAddressTo,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Referencia para ubicar al cadete.",
      value: addressToData?.reference,
      key: "reference",
      label: "Referencia",
      handleChange: handleChangeAddressTo,
    },
  ];

  const handleChangeProduct = (key, value) => {
    const newVariables = { ...productData, [key]: value };
    setProductData(newVariables);
  };

  const productInputs = [
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Descripción del producto",
      value: productData?.description,
      multiline: true,
      key: "description",
      label: "Descripción",
      handleChange: handleChangeProduct,
    },
  ];

  const handleChangeBilling = (key, value) => {
    const newVariables = { ...billingData, [key]: value };
    setBillingData(newVariables);
    if (key === "price") {
    }
  };

  const billingInputs = [
    {
      type: INPUT_TYPES.SELECT,
      tooltip: "Forma de pago",
      value: billingData?.billingType,
      key: "billingType",
      label: "Forma de pago",
      handleChange: handleChangeBilling,
      menuItems: billingTypes,
      required: true,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Monto a pagar",
      value: billingData?.payment,
      key: "payment",
      label: "Monto",
      required: true,
      props: {
        max: 100,
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      },
      handleChange: handleChangeBilling,
    },
  ];

  const billingCardInputs = [
    {
      type: INPUT_TYPES.MASKED_TEXT,
      tooltip: "Número de la tarjeta",
      value: billingData?.cardNumber,
      key: "cardNumber",
      label: "Número",
      mask: "9999 9999 9999 9999",
      maskChar: "X",
      required: true,
      handleChange: handleChangeBilling,
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Nombre y apellido como aparecen en la tarjeta",
      value: billingData?.cardName,
      key: "cardName",
      label: "Nombre y apellido",
      required: true,
      handleChange: handleChangeBilling,
    },
    {
      type: INPUT_TYPES.MASKED_TEXT,
      tooltip: "Mes de vencimiento de la tarjeta",
      value: billingData?.cardMonth,
      key: "cardMonth",
      label: "Mes",
      mask: "99",
      maskChar: "M",
      required: true,
      handleChange: handleChangeBilling,
    },
    {
      type: INPUT_TYPES.MASKED_TEXT,
      tooltip: "Año de vencimiento de la tarjeta",
      value: billingData?.cardYear,
      key: "cardYear",
      label: "Año",
      mask: "9999",
      maskChar: "A",
      required: true,
      handleChange: handleChangeBilling,
    },
    {
      type: INPUT_TYPES.MASKED_TEXT,
      tooltip: "Clave de la tarjeta",
      value: billingData?.key,
      key: "key",
      label: "CVC",
      mask: "999",
      maskChar: "X",
      required: true,
      handleChange: handleChangeBilling,
    },
  ];

  const validationProps = {
    accept: ["image/jpeg"],
    maxSize: 5000000,
  };

  const handleMapClick = (latLng) => {
    const distance = distanceInMeters(latLng, currentLocation);
    setTripDistance(Math.trunc(distance));
    setDeliveryPrice(calculatePrice(distance));
  };

  const handleDropzoneUpload = (id, file, hasError) => {
    handleChangeProduct("image", file);
    setIsError(false);
  };

  const handleDropzoneRejected = (id, errors, error) => {
    setDialog({
      title: "Imagen incorrecta",
      text: "La imagen debe pesar menos de 5MB.",
      isError: true,
    });
    setIsError(true);
    setOpenedDialog(true);
  };

  const handleDropzoneDelete = (id, hasError) => {
    handleChangeProduct("image", null);
    handleDropzoneError(hasError);
  };

  const handleDropzoneError = (dropzoneHasError) => {};

  const handleError = (hasError) => {
    console.log("ERROR", hasError);
  };

  const handleOnDrop = (accepted, rejected, id) => {
    if (accepted.length > 0) {
      const newError = handleError(false);
      handleDropzoneUpload(id, accepted[0], newError);
    }
    if (rejected.length > 0) {
      const newError = handleError(true);
      handleDropzoneRejected(id, rejected[0].errors, newError);
    }
  };

  const handleCloseDialog = () => {
    setOpenedDialog(false);
  };

  const handleSubmit = () => {};

  const date = new Date().toLocaleString();
  console.log(date);

  return (
    <div>
      <Paper style={Styles.container}>
        <Typography variant="h5">Pedir lo que sea</Typography>
        <div style={Styles.sectionContainer}>
          <div style={Styles.inputContainer}>
            <FormLabel style={{ textAlign: "center" }}>Desde</FormLabel>
            {addressFromInputs.map((input, i) => (
              <CustomInput key={i} input={input} />
            ))}
          </div>
          <div style={Styles.inputContainer}>
            <FormLabel style={{ textAlign: "center" }}>
              Seleccione un punto
            </FormLabel>
            <MapWrapper
              geolocation={currentLocation}
              onMapClick={handleMapClick}
            />
          </div>
          <div style={Styles.inputContainer}>
            <FormLabel style={{ textAlign: "center" }}>Hasta</FormLabel>

            {addressToInputs.map((input, i) => (
              <CustomInput key={i} input={input} />
            ))}
          </div>
        </div>
        <div style={Styles.sectionContainer}>
          <Typography>
            Distancia: {(tripDistance * 0.001).toFixed(2)}kms
          </Typography>
          <Typography>Precio de entrega: ${deliveryPrice}</Typography>
        </div>
        <div style={Styles.sectionContainer}>
          <Dropzone
            label="Imagen"
            error={isError}
            {...validationProps}
            onDrop={(accepted, rejected) =>
              handleOnDrop(accepted, rejected, "productImage1")
            }
            onDelete={() => handleDropzoneDelete("productImage1", isError)}
          />
          {productInputs.map((input, i) => (
            <CustomInput key={i} input={input} />
          ))}
        </div>
        <div style={Styles.sectionContainer}>
          {billingInputs.map((input, i) => (
            <CustomInput key={i} input={input} />
          ))}
        </div>
        {billingData?.billingType !== "efectivo" && (
          <div style={Styles.sectionContainer}>
            {billingCardInputs.map((input, i) => (
              <CustomInput key={i} input={input} />
            ))}
          </div>
        )}
        <div style={Styles.sectionContainer}>
          <FormControl>
            <FormLabel>Forma de entrega</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={deliveryData?.deliveryType}
              onChange={(e) =>
                handleChangeDelivery("deliveryType", e.target.value)
              }
            >
              <FormControlLabel
                value="inmediata"
                control={<Radio />}
                label="Entrega inmediata"
              />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Fecha específica"
              />
            </RadioGroup>
            {deliveryData?.deliveryType === "custom" && (
              <DateTimePicker
                label="Fecha y hora"
                value={deliveryData?.dateAndTime}
                minDate={parseISO(Date())}
                onChange={(e) => handleChangeDelivery("dateAndTime", e)}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          </FormControl>
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Pedir
        </Button>
      </Paper>
      <div>
        <DialogContainer
          openedDialog={openedDialog}
          handleCloseDialog={handleCloseDialog}
          dialog={dialog}
        />
      </div>
    </div>
  );
};

export default PantallaPedido;
