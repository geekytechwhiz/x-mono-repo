/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from "@apollo/client";
import EastIcon from "@mui/icons-material/East";
import { Box, Button } from "@mui/material";
import { createPgModel } from "@platformx/authoring-apis";
import { CreateNewPage } from "@platformx/content";
import {
  capitalizeWords,
  getCurrentLang,
  getSelectedSite,
  usePlatformAnalytics,
  useUserSession,
} from "@platformx/utilities";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../common/Title";
import "./Card.css";

type CardProps = {
  ImageUrl: string;
  BgColor: string;
  CTAText: string;
  url: string;
};

const Card = ({ ImageUrl, BgColor, CTAText, url }: CardProps) => {
  const [getSession] = useUserSession();
  const { userInfo } = getSession() || {};
  const username = userInfo?.first_name;
  const userEmailId = userInfo?.username;
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [handleImpression] = usePlatformAnalytics();
  //function redirect to create page
  const [createPage, setCreatePage] = useState<boolean>(false);
  const handleCardClick = () => {
    const URL = `${window.location.origin}/${getSelectedSite()}/${getCurrentLang()}${url}`;
    if (CTAText.toLowerCase().includes("create a page")) {
      setCreatePage(!createPage);
    } else {
      navigate(url);
    }
  };
  const [mutate] = useMutation(createPgModel, {
    context: {
      headers: {
        language: localStorage.getItem("lang"),
        sitename: getSelectedSite(),
      },
    },
  });

  return (
    <>
      <Box className='card' onClick={handleCardClick}>
        <Box className='imagecolorbox' sx={{ background: `${BgColor}` }}>
          <Box className=''>
            <img src={ImageUrl} className='imgbox' alt={CTAText} />
          </Box>
        </Box>
        <Button className='ctabox'>
          <Title titleVarient='h5regular' title={capitalizeWords(CTAText)} />
          <Box className='icon'>
            <EastIcon />
          </Box>
        </Button>
      </Box>
      <CreateNewPage
        isDialogOpen={createPage}
        closeButtonHandle={() => setCreatePage(!createPage)}
      />
    </>
  );
};

export default Card;
