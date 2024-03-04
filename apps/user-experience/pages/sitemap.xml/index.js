import { getRequest } from "../../services/config/request";

export const getServerSideProps = async ({ res }) => {
  const sitemapData = await getRequest(`/sitemap`, "", {
    "Content-Type": "application/xml",
    charset: "utf-8",
  });
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapData);

  res.end();

  // Empty since we don't render anything
  return {
    props: {},
  };
};

// Default export to prevent next.js errors
const SitemapXML = () => {
  return null;
};

export default SitemapXML;
