import { getRequest } from "../../services/config/request";

export const getServerSideProps = async ({ res }) => {
  const sitemapData = await getRequest(`/robots`, "", {
    "Content-Type": "text/plain",
    charset: "utf-8",
  });
  res.setHeader("Content-Type", "text/plain");
  res.write(sitemapData);

  res.end();

  // Empty since we don't render anything
  return {
    props: {},
  };
};

// Default export to prevent next.js errors
const RobotsTxt = () => {
  return null;
};

export default RobotsTxt;
