import { Box } from "@mui/material";
import { format } from "date-fns";
import "./ContentTypeCard.css";

// import EventIcon from "../../../assets/EventWhiteIcon.png";
// import articleIcon from "../../../assets/article.svg";
// import imgIcon from "../../../assets/imggallery.svg";
// import pollIcon from "../../../assets/poll1.svg";
// import quizIcon from "../../../assets/quiz.svg";
// import vodIcon from "../../../assets/vod.svg";
import { getIcon, handleHtmlTags, nullToObject } from "@platformx/utilities";

function ContentTypeCard(props: any) {
  const {
    background_content = {},
    Thumbnail = {},
    ContentType = "",
    PublishedDate = "",
  } = nullToObject(props.content);
  const { Color = "" } = nullToObject(background_content);
  // const convertToLowerCase = (stringData: any = "") => {
  //   // console.log("stringData", stringData.toLowerCase());
  //   return ("" + stringData).toLowerCase();
  // };

  return (
    <Box sx={{ height: "inherit" }}>
      <div style={{ position: "relative", height: "inherit" }} className='content'>
        <div style={{ left: 0, top: 0, height: "100%", width: "100%", position: "absolute" }}>
          {Thumbnail.Url !== "" ? (
            <img
              src={Thumbnail.Url}
              style={{ width: "100%", objectFit: "cover", height: "100%" }}
              alt='thumbnail'
            />
          ) : (
            <div
              style={{
                backgroundColor: Color,
                width: "100%",
                objectFit: "cover",
                height: "100%",
              }}></div>
          )}
        </div>
        <div
          style={{
            position: "relative",
            bottom: 0,
            left: 0,
            padding: "2% 3%",
            backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "end",
            minHeight: "200px",
          }}>
          <div>
            <span
              style={{
                fontSize: "12px",
                marginBottom: "0",
                fontWeight: "bold",
                color: "#fff",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                borderBottom: " 1px solid",
                width: "max-content",
                paddingBottom: "8px",
              }}>
              {ContentType === "Quiz" ? (
                <img
                  src={getIcon(ContentType)}
                  alt='quiz'
                  style={{ height: "20px", marginRight: "10px" }}
                />
              ) : null}
              {ContentType === "Poll" ? (
                <img
                  src={getIcon(ContentType)}
                  alt='poll'
                  style={{ height: "20px", marginRight: "10px" }}
                />
              ) : null}
              {ContentType === "Article" ? (
                <img
                  src={getIcon(ContentType)}
                  alt='article'
                  style={{ height: "20px", marginRight: "10px" }}
                />
              ) : null}
              {ContentType === "Vod" || ContentType === "VOD" ? (
                <img
                  src={getIcon(ContentType)}
                  alt='Vod'
                  style={{ height: "20px", marginRight: "10px" }}
                />
              ) : null}
              {ContentType}
            </span>
            <span
              style={{
                fontSize: "14px",
                marginBottom: "0",
                fontWeight: "bold",
                color: "#fff",
                textTransform: "capitalize",
                WebkitLineClamp: 1,
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                wordWrap: "break-word",
              }}>
              {Thumbnail.Title}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#fff !important",
                WebkitLineClamp: 2,
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                wordWrap: "break-word",
              }}>
              {handleHtmlTags(Thumbnail.Description)}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#fff !important",
                WebkitLineClamp: 2,
                textOverflow: "ellipsis",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                wordWrap: "break-word",
              }}>
              {PublishedDate ? format(new Date(PublishedDate), "d:M:y | H:mm") : ""}
              {/* {PublishedDate} */}
            </span>
          </div>
        </div>
      </div>
      <br />
    </Box>
  );
}
export default ContentTypeCard;
