import React, { useEffect, useState } from "react";
import MapWrapper from "../GoogleMaps/MapWrapper";
import Dropzone from "../Dropzone/Dropzone";
import Styles from "./PantallaPedidoStyles";
import Input from "../Input/Input";
import { INPUT_TYPES } from "../../constants/TypeKeys";
import { ciudadesAcotado } from "../../constants/Ciudades";
import { Paper, Typography } from "@mui/material";
import { distanceInMeters } from "../../utils/GoogleMapsAPI";
import DialogContainer from "../Dialog/DialogContainer";
import { billingTypes } from "../../constants/Billing";

const PantallaPedido = () => {
  const [isError, setIsError] = useState(false);
  const [addressData, setAddressData] = useState({ city: "CORDOBA" });
  const [productData, setProductData] = useState({});
  const [billingData, setBillingData] = useState({ billingType: "efectivo" });
  const [fields, setFields] = useState({});
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [tripDistance, setTripDistance] = useState(0);
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

  const handleChangeAddress = (key, value) => {
    const newVariables = { ...addressData, [key]: value };
    setAddressData(newVariables);
  };

  const addressInputs = [
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Nombre de la calle",
      value: addressData?.street,
      key: "street",
      label: "Calle",
      handleChange: handleChangeAddress,
    },
    {
      type: INPUT_TYPES.TEXT,
      textType: "number",
      tooltip: "Número de la calle",
      value: addressData?.number,
      key: "number",
      label: "Número",
      handleChange: handleChangeAddress,
    },
    {
      type: INPUT_TYPES.SELECT,
      tooltip: "Ciudades de Córdoba",
      value: addressData?.city,
      key: "city",
      label: "Ciudad",
      handleChange: handleChangeAddress,
      menuItems: ciudadesAcotado,
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
    },
    {
      type: INPUT_TYPES.TEXT,
      tooltip: "Monto a pagar",
      value: billingData?.payment,
      key: "payment",
      label: "Monto",
      handleChange: handleChangeBilling,
    },
  ];

  const validationProps = {
    accept: ["image/gif", "image/png", "image/jpeg", "image/bmp"],
    maxSize: 5000000,
  };

  const handleMapClick = (latLng) => {
    const distance = distanceInMeters(latLng, currentLocation);
    setTripDistance(Math.trunc(distance));
  };

  const handleFieldChange = (key, value) => {
    const newFields = { ...fields };
    newFields[key] = value;
    setFields(newFields);
  };

  const handleDropzoneUpload = (id, file, hasError) => {
    handleFieldChange(id, file);
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
    handleFieldChange(id, null);
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

  return (
    <div>
      <Paper style={Styles.container}>
        <div style={Styles.directionContainer}>
          <div style={Styles.inputContainer}>
            {addressInputs.map((input, i) => (
              <Input key={i} input={input} />
            ))}
            <Typography>{tripDistance}mts</Typography>
            <Typography>{(tripDistance * 0.0001).toFixed(2)}kms</Typography>
          </div>
          <MapWrapper
            geolocation={currentLocation}
            onMapClick={handleMapClick}
          />
        </div>
        <div style={Styles.directionContainer}>
          {productInputs.map((input, i) => (
            <Input key={i} input={input} />
          ))}
          <Dropzone
            label="Imagen"
            error={isError}
            {...validationProps}
            onDrop={(accepted, rejected) =>
              handleOnDrop(accepted, rejected, "profilePhoto")
            }
            onDelete={() => handleDropzoneDelete("profilePhoto", isError)}
          />
        </div>
        <div style={Styles.directionContainer}>
          {billingInputs.map((input, i) => (
            <Input key={i} input={input} />
          ))}
        </div>
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
