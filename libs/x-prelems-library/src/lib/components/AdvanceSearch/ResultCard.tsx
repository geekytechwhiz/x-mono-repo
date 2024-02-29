import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { getImage, getLandingPageURL } from "@platformx/utilities";

export const ResultCard = ({ item, secondaryArgs, gcpUrl, bucketName }: any) => {
  const renderPageDetail = () => {
    const pageUrl = getLandingPageURL(
      secondaryArgs?.publishEndPoint,
      secondaryArgs?.locale,
      item.ContentType,
      item.Id,
    );
    window.open(pageUrl);
  };
  const formedUrl = getImage(item, { gcpUrl, bucketName });
  const { color, imageUrl } = formedUrl;
  return (
    <Card className='resultCards'>
      <CardActionArea onClick={renderPageDetail}>
        <CardContent className='imgLeftSide'>
          <CardMedia
            component={imageUrl ? "img" : "div"}
            image={imageUrl ? imageUrl : ""}
            alt='search result'
            className='searchImg'
            sx={{ backgroundColor: color ? color : "" }}
          />
        </CardContent>
        <CardContent className='descriptionRightSide'>
          <Typography
            gutterBottom
            variant='h4semibold'
            color='textColor1'
            className='text-truncated-1line'>
            {item?.Title}
          </Typography>
          <Typography variant='p3regular' color='textColor1' className='text-truncated-3line'>
            {item?.Description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
