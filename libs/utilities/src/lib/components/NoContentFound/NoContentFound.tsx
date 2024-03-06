import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const NoContentFound = () => {
  const { t } = useTranslation();

  return (
    <Box textAlign='center' sx={{ width: "250px", height: "250px", padding: "10px" }}>
      {/* <img src={NoContentFoundSvg} width={175} height={175} alt='img' /> */}
      <>Image commpented in NoContentFound componnet. Pls fix the issue</>
      <Typography variant='h5regular'>{t("no_content_found")}</Typography>
    </Box>
  );
};
