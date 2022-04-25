import { imageContainerSize } from "../../constants/Styles";

export default {
  container: {
    height: imageContainerSize,
    minWidth: imageContainerSize,
  },
  dropzone: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    border: `2px dashed gray`,
    width: "100%",
    height: "100%",
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
    height: imageContainerSize,
    width: imageContainerSize,
  },
  image: {
    width: "100%",
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
};
