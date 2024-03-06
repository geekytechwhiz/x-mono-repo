/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { ShowToastError } from "../components/ToastNotification/ToastNotification";
import { convertToLowerCase } from "../utils/helperFns";
import { stateIcons } from "./Card/constants";
import Image from "next/image";

type PublishInformationProps = {
  dataList: any;
  contentType: string;
  handleCardClick: () => void;
  tagName: string;
};
export const PublishInformation = (props: PublishInformationProps) => {
  const { tagName = "", dataList = {}, contentType = "", handleCardClick = () => {} } = props;

  const { t } = useTranslation();

  const redirect = (pageUrl) => {
    if (pageUrl) {
      window.open(pageUrl, "_blank", "noopener,noreferrer");
    } else {
      ShowToastError(t("api_error_toast"));
    }
  };

  const handleCardClicks = () => {
    if (convertToLowerCase(contentType) === "community") {
      redirect(dataList?.url);
    } else {
      handleCardClick();
    }
  };

  return (
    <>
      <Box className='statusweb' onClick={() => handleCardClicks()}>
        <Tooltip placement='top-start' title={t(`${dataList.status}`)}>
          <Typography sx={{ marginLeft: "10px" }}>
            {convertToLowerCase(contentType) === "community" ? (
              <Image src={stateIcons.published} alt={stateIcons.published} width={24} height={24} />
            ) : (
              <Image alt='status' src={stateIcons[dataList.status]} width={24} height={24} />
            )}
          </Typography>
        </Tooltip>
        <Tooltip
          placement='top-start'
          title={
            `${t("schedulePublish")}` +
            " " +
            `${
              dataList.scheduledPublishTriggerDateTime &&
              format(new Date(dataList.scheduledPublishTriggerDateTime), "MMM d, yyyy | hh:mm a")
            }`
          }>
          <Typography sx={{ marginLeft: "10px" }}>
            {(dataList.scheduledPublishTriggerDateTime !== undefined || null) &&
              tagName === "sitepage" && (
                <Image src={stateIcons["schedulePublish"]} alt='' width={24} height={24} />
              )}
          </Typography>
        </Tooltip>

        <Tooltip
          placement='top-start'
          title={
            `${t("scheduleUnpublish")}` +
            " " +
            `${
              dataList.scheduledUnPublishTriggerDateTime &&
              format(new Date(dataList.scheduledUnPublishTriggerDateTime), "MMM d, yyyy | hh:mm a")
            }`
          }>
          <Typography sx={{ marginLeft: "10px" }}>
            {(dataList.scheduledUnPublishTriggerDateTime !== undefined ||
              dataList.scheduledUnPublishTriggerDateTime !== null) &&
              tagName === "sitepage" && (
                <Image
                  src={stateIcons["scheduleUnpublish"]}
                  alt='un publish'
                  width={24}
                  height={24}
                />
              )}
          </Typography>
        </Tooltip>
      </Box>

      <Box className='datetimeweb' onClick={() => handleCardClick()}>
        <Typography variant='h7regular' component='div'>
          {dataList?.author?.trim() || dataList?.lastModifiedBy}
        </Typography>
        <Typography variant='h7regular' component='div'>
          {dataList.lastModifiedDate &&
            format(new Date(dataList.lastModifiedDate), "MMM d, yyyy | hh:mm a")}
        </Typography>
      </Box>
    </>
  );
};
