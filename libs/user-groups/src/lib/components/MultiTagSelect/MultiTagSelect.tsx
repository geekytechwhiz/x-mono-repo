import { Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { multiTagSelectProps } from "./MultiTagSelect.types";

const MultiTagSelect = ({ tags, handleCallback, error, errorText }: multiTagSelectProps) => {
  return (
    <>
      <Autocomplete
        multiple
        id='tags'
        options={tagList.map((option) => option)}
        freeSolo
        value={tags}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip variant='outlined' label={option} {...getTagProps({ index })} key={option} />
          ))
        }
        style={{
          borderRadius: "5px",
          border: error ? "solid 1px red" : "solid 1px #ced3d9",
        }}
        onChange={(e, value) => handleCallback(e, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            placeholder='Enter your tags here'
            name='tags'
          />
        )}
        sx={{
          ".Platform-x-OutlinedInput-root ": {
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
          },
          ".Platform-x-Autocomplete-tag": {
            margin: "0 5px 5px 0",
          },
          ".Platform-x-Chip-label": {
            padding: "0 5px",
          },
          ".Platform-x-InputBase-input": {
            padding: 0,
            width: "auto",
          },
        }}
      />
      {error && (
        <Typography
          variant='h7regular'
          sx={{
            color: "#B71C1C",
          }}>
          {errorText}
        </Typography>
      )}
    </>
  );
};

export default MultiTagSelect;

const tagList = [
  "Hcl Health Care",
  "Integrated Tele-Medicine",
  "Health Checks",
  "Wellness Events",
  "Emergency/Ambulance Care",
  "Vaccination Drives",
];
