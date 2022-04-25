import { colors } from "../../constants/Styles";

export default {
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  container: {
    backgroundColor: colors.primary,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "10px",
  },
  directionContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
};
