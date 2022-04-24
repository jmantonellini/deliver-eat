import React, { useState } from "react";
import MapWrapper from "../GoogleMaps/MapWrapper";
import Dropzone from "../Dropzone/Dropzone";

const PantallaPedido = () => {
  const [isError, setIsError] = useState(false);
  const [fields, setFields] = useState({});

  const validationProps = {
    accept: ["image/gif", "image/png", "image/jpeg", "image/bmp"],
    maxSize: 5000000,
  };

  const handleFieldChange = (key, value) => {
    const newFields = { ...fields };
    newFields[key] = value;
    setFields(newFields);
  };

  const handleDropzoneUpload = (id, file, hasError) => {
    handleFieldChange(id, file);
  };

  const handleDropzoneRejected = () => {};

  const handleDropzoneDelete = (id, hasError) => {
    handleFieldChange(id, null);
    handleDropzoneError(hasError);
  };

  const handleDropzoneError = (dropzoneHasError) => {};

  const handleError = (hasError) => {};

  const handleOnDrop = (accepted, rejected, id) => {
    if (accepted.length > 0) {
      const newError = handleError(false);
      handleDropzoneUpload(id, accepted[0], newError);
    }
    if (rejected.length > 0) {
      const newError = handleError(true);
      handleDropzoneRejected(id, rejected[0], newError);
    }
  };

  return (
    <div>
      <Dropzone
        label="Imagen"
        error={isError}
        {...validationProps}
        onDrop={(accepted, rejected) =>
          handleOnDrop(accepted, rejected, "profilePhoto")
        }
        onDelete={() => handleDropzoneDelete("profilePhoto", isError)}
      />
      <MapWrapper />
    </div>
  );
};

export default PantallaPedido;
