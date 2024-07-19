import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels({ value, setValue, data, label }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  console.log("data in select", data);
  return (
    <div>
      <FormControl sx={{ m: 3, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data &&
            data.map((el) => (
              <MenuItem value={el.companyName ? el.id : el.accountDetail}>
                {el.companyName ? el.companyName : el.account}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
