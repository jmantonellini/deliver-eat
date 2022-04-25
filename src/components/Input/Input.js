import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import { INPUT_TYPES } from "../../constants/TypeKeys";
import Styles from "./InputStyles.js";

const Input = ({ input }) => {
  const {
    type,
    textType = "text",
    tooltip,
    label,
    value,
    key,
    multiline = false,
    handleChange = () => {},
    menuItems = [],
  } = input;
  switch (type) {
    case INPUT_TYPES.SELECT:
      return (
        <Tooltip key={key} title={tooltip} placement="top" arrow>
          <FormControl style={Styles.input}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={value}
              onChange={(event) => handleChange(key, event.target.value)}
              label={label}
              size="small"
              variant="filled"
            >
              {menuItems.map((menuItem, i) => (
                <MenuItem key={i} value={menuItem.value}>
                  {menuItem.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Tooltip>
      );
    case INPUT_TYPES.TEXT:
      return (
        <Tooltip key={key} title={tooltip} placement="top" arrow>
          <FormControl style={Styles.input}>
            {multiline ? (
              <TextField
                id={key}
                label={label}
                required
                multiline
                rows={4}
                variant="filled"
                value={value}
                style={Styles.input}
                type={textType}
                onChange={(event) => handleChange(key, event.target.value)}
                size="small"
                inputProps={{ max: 100 }}
              ></TextField>
            ) : (
              <TextField
                id={key}
                label={label}
                required
                variant="filled"
                value={value}
                style={Styles.input}
                type={textType}
                onChange={(event) => handleChange(key, event.target.value)}
                size="small"
                inputProps={{ max: 100 }}
              ></TextField>
            )}
          </FormControl>
        </Tooltip>
      );

    default:
      break;
  }
};

export default Input;
