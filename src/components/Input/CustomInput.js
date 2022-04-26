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
import Styles from "./CustomInputStyles.js";
import InputMask from "react-input-mask";

const CustomInput = ({ input }) => {
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
    mask = "",
    maskChar = "",
    props = {},
    required = false,
    error = false,
    helperText = "",
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
                required={required}
                multiline
                rows={6}
                variant="filled"
                value={value}
                style={Styles.input}
                type={textType}
                onChange={(event) => handleChange(key, event.target.value)}
                size="small"
                inputProps={{ max: 100 }}
                error={error}
                helperText={helperText}
              ></TextField>
            ) : (
              <TextField
                id={key}
                label={label}
                required={required}
                variant="filled"
                value={value}
                style={Styles.input}
                type={textType}
                onChange={(event) => handleChange(key, event.target.value)}
                size="small"
                InputProps={props}
                error={error}
                helperText={helperText}
              ></TextField>
            )}
          </FormControl>
        </Tooltip>
      );
    case INPUT_TYPES.MASKED_TEXT:
      return (
        <InputMask
          mask={mask}
          value={value}
          disabled={false}
          maskChar={maskChar}
          onChange={(e) => handleChange(key, e.target.value)}
        >
          {() => (
            <TextField
              id={key}
              label={label}
              required={required}
              variant="filled"
              value={value}
              style={Styles.input}
              size="small"
              inputProps={{ max: 100 }}
              error={error}
              helperText={helperText}
            />
          )}
        </InputMask>
      );
    default:
      break;
  }
};

export default CustomInput;
