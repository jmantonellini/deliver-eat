import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import { INPUT_TYPES } from "../../constants";
import Styles from "./InputStyles.js";

const Input = ({ input }) => {
  const {
    type,
    tooltip,
    label,
    value,
    key,
    handleChange = () => {},
    menuItems = [],
  } = input;
  switch (type) {
    case INPUT_TYPES.SELECT:
      return (
        <Tooltip title={tooltip} placement="top" arrow>
          <FormControl style={Styles.input}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={value}
              onChange={(event) => handleChange(key, event.target.value)}
              label={label}
              size="small"
            >
              {menuItems.map((menuItem) => (
                <MenuItem value={menuItem.value}>{menuItem.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Tooltip>
      );
    case INPUT_TYPES.TEXT:
      return (
        <Tooltip title={tooltip} placement="top" arrow>
          <FormControl style={Styles.input}>
            <TextField
              id={key}
              label={label}
              required
              variant="outlined"
              value={value}
              style={Styles.input}
              type="number"
              onChange={(event) => handleChange(key, event.target.value)}
              size="small"
              inputProps={{ max: 100 }}
            ></TextField>
          </FormControl>
        </Tooltip>
      );

    default:
      break;
  }
};

export default Input;
