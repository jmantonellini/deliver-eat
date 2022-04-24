import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loading from "../Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  dropzone: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    border: `2px dashed gray`,
    width: "100%",
    height: "auto",
    "&:hover": {
      border: `2px dashed black`,
      "& .MuiSvgIcon-root": {
        color: "green",
      },
    },
    "&:focus": {
      outline: "none !important",
    },
  },
  dropzoneError: {
    border: `2px dashed red`,
  },
  labelError: {
    color: "red",
  },
  curtain: {
    height: "100%",
    width: "100%",
    background: "#FFFFFF99",
    borderRadius: "8px",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
  },
  image: {
    padding: "1rem",
    maxWidth: "100%",
    height: "auto",
    objectFit: "contain",
  },
  icon: {
    height: "3rem",
    width: "3rem",
    marginBottom: "0.5rem",
  },
  label: {
    padding: "0 0.5rem",
    textAlign: "center",
  },
}));

const LoadingState = () => (
  <Box padding="3rem 2rem">
    <Loading size={20} />
    <Typography>Cargando...</Typography>
  </Box>
);

const BaseState = ({
  isDragActive,
  children = () => {},
  label,
  error,
  classes,
}) => {
  return (
    <Box
      paddingTop="0.5rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <AddCircleIcon className={classes.icon} />
      <Typography className={classes.label}>
        {error ? "Foto requerida" : label}
      </Typography>
      {children(isDragActive)}
    </Box>
  );
};

const PreviewState = ({
  urlImg = "",
  file,
  label,
  classes,
  onDelete,
  block,
}) => {
  const url = file !== null ? URL.createObjectURL(file) : urlImg;
  const handleDelete = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    onDelete();
  };
  return (
    <Box display="flex" position="relative" className={classes.imageContainer}>
      <Box display="flex" className={classes.imageContainer}>
        {url && <img className={classes.image} alt={label} src={`${url}`} />}
        {!block && (
          <Box
            onClick={handleDelete}
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.curtain}
            position="absolute"
          >
            <DeleteIcon />
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Dropzone = ({
  label,
  children,
  onDelete,
  error,
  className,
  block = false,
  previewFile = null,
  ...dropzoneProps
}) => {
  const classes = useStyles();
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
      className={classes.imageContainer}
    >
      <Box className={classes.dropzone} {...getRootProps()}>
        {!block && <input {...getInputProps()} />}
        {loading ? (
          <LoadingState />
        ) : file === null && urlImg === null ? (
          <BaseState
            isDragActive={isDragActive}
            children={children}
            label={label}
            error={error}
            classes={classes}
          />
        ) : (
          <PreviewState
            file={file}
            urlImg={urlImg}
            label={label}
            classes={classes}
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
