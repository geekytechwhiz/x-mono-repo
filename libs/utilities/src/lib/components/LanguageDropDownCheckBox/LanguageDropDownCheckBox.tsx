/* eslint-disable array-callback-return */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  ListItemIcon,
  Select,
  Typography,
  Checkbox,
  FormControl,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { LanguageList } from "../../utils/helperConstants";
import { getCurrentLang } from "../../utils/helperFns";

export default function LanguageDropDownCheckBox({ language = [], setLanguage }: any) {
  const handleChange = (
    event: any, //SelectChangeEvent<typeof language>
  ) => {
    const {
      target: { value },
    } = event;
    setLanguage(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    LanguageList().map((lang: any) => {
      if (getCurrentLang() === lang.id) {
        setLanguage(typeof lang.label === "string" ? lang.label.split(",") : lang.label);
      }
    });
  }, []);
  return (
    <FormControl
      // fullWidth
      sx={{
        width: "-webkit-fill-available",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        paddingTop: "4px",
      }}>
      <Select
        size='medium'
        labelId='demo-multiple-checkbox-label'
        id='demo-multiple-checkbox'
        multiple
        value={language}
        onChange={handleChange}
        renderValue={(selected) => {
          return selected && selected.join(", ");
        }}
        IconComponent={ExpandMoreIcon}>
        {LanguageList()
          //.filter((lan) => getCurrentLang() !== lan.id)
          .map((l: any) => (
            <MenuItem
              key={l.label}
              value={l.label}
              sx={{
                minWidth: "230px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "50px !important",
                pt: "0px",
                pb: "0px",
              }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: "24px",
                    height: "24px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}>
                  {" "}
                  <img
                    src={require(`../../assets/header/${l.id}_flag.png`)}
                    style={{
                      objectFit: "cover",
                      width: "24px",
                      height: "24px",
                    }}
                    alt=''
                  />
                </Box>
                <Typography variant='h6regular'>{l.label}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <Checkbox checked={language && language.indexOf(l.label) > -1} />
                </ListItemIcon>
              </Box>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
