import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loading from "../Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import Styles from "./DropzoneStyles";

const LoadingState = () => (
  <Box padding="3rem 2rem">
    <Loading size={20} />
    <Typography>Cargando...</Typography>
  </Box>
);

const BaseState = ({ isDragActive, children = () => {}, label, error }) => {
  return (
    <Box
      paddingTop="0.5rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <AddCircleIcon style={Styles.icon} />
      <Typography style={Styles.label}>
        {error ? "Foto requerida" : label}
      </Typography>
      {children(isDragActive)}
    </Box>
  );
};

const PreviewState = ({ urlImg = "", file, label, onDelete, block }) => {
  const url = file !== null ? URL.createObjectURL(file) : urlImg;
  const handleDelete = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    onDelete();
  };
  return (
    <Box display="flex" position="relative" style={Styles.imageContainer}>
      {url && <img style={Styles.image} alt={label} src={`${url}`} />}
      {!block && (
        <Box
          onClick={handleDelete}
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={Styles.curtain}
          position="absolute"
        >
          <DeleteIcon />
        </Box>
      )}
    </Box>
  );
};

const Dropzone = ({
  label,
  children,
  onDelete,
  error,
  block = false,
  previewFile = null,
  ...dropzoneProps
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [urlImg, setUrlImg] = useState(previewFile);

  const onDrop = useCallback(
    (accepted, rejected) => {
      if (block) {
        return;
      }
      if (accepted.length > 0) {
        setLoading(true);
        setFile(accepted[0]);
      }
      if (dropzoneProps.onDrop) {
        dropzoneProps.onDrop(accepted, rejected);
      }
      setLoading(false);
    },
    [dropzoneProps]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...dropzoneProps,
    onDrop,
  });

  useEffect(() => {
    if (previewFile) {
      setUrlImg(previewFile);
    }
  }, [previewFile]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={Styles.container}
    >
      <Box style={Styles.dropzone} {...getRootProps()}>
        {!block && <input {...getInputProps()} />}
        {loading ? (
          <LoadingState />
        ) : file === null && urlImg === null ? (
          <BaseState
            isDragActive={isDragActive}
            children={children}
            label={label}
            error={error}
          />
        ) : (
          <PreviewState
            file={file}
            urlImg={urlImg}
            label={label}
            block={block}
            onDelete={() => {
              setFile(null);
              onDelete();
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Dropzone;
