import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import NoResults from "./../assets/images/no-results.png";

const NoResultsFound = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: "center", marginTop: "5%" }}>
      {/* Check Next img works with React  lib and nextJS */}
      <img alt='NoResult' src={NoResults} />
      <Typography
        variant='h3regular'
        sx={{
          color: "#c3c3c3",
        }}>
        {t("no_results")}
      </Typography>
    </Box>
  );
};

export default NoResultsFound;
