import { ArrowBack, Close } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

const CourseIFrame = ({ setIsCourseFrame, content }: any) => {
  return (
    <Box
      sx={{
        height: "100vh",
      }}>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}>
        <ArrowBack onClick={() => setIsCourseFrame(false)} sx={{ cursor: "pointer" }} />
        <Close onClick={() => setIsCourseFrame(false)} sx={{ cursor: "pointer", float: "right" }} />
      </Box>
      <iframe
        src={content?.course_url || "https://olat-vm.dev.hcl-x.com"}
        width='100%'
        height='100%'
        id=''
        className=''
        style={{ display: "block", position: "relative" }}
        sandbox='allow-same-origin allow-scripts allow-popups allow-forms'
        frameBorder={0}
      />
    </Box>
  );
};
export default CourseIFrame;
