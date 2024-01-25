import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { unstable_ClassNameGenerator } from "@mui/material/utils";
import { PrelemTheme, ToastContainerHandle } from "@platformx/utilities";
import {
  // AnimationOnPageScroll,
  AboutUs2,
  AboutUsThree,
  ArticleDetail,
  Banner7,
  CoreHighlights,
  FullWidthBanner3,
  ImageAndVideoGallery,
  InfoBox,
  ProductSummaryViaImage,
  ProductSummaryViaImage2,
  ProductSummaryViaVideo2,
  Quote,
  ServiceCard,
  ServiceShowcase,
  Sponsor,
  Testimonial,
  WebsiteIntroduction,
  WebsiteIntroduction2,
  WebsiteIntroduction4,
  FullWidthImage,
  FullWidthVideo,
  Banner6,
  DynamicPrelemWithCarousel1,
  DynamicPrelemWithCarousel2,
  Banner3,
  Banner1,
  Description,
  FullWidthText,
  ImageCarousel,
  DynamicPrelemOne,
  BlogTiles,
  CustomerTestimonial2,
  ContentDisplayWithCategories,
  CounterNumberShowcase,
  ServiceCard7,
  ServiceShowcase2,
  FeatureTiles,
  TeamMembers,
  ImageCards,
  FullWidthTextWithImage,
  VideoBanner1,
  ServiceCard1,
  ServiceCard2,
  ServiceCard3,
  FeatureBox1,
  FeatureBox2,
  ServiceCard5,
  Services1,
  Services2,
  ProductSummary3,
  WebsiteSummaryWithSubHeading,
  WebsiteSummaryWithSubHeading2,
  LeftAlignParagraphWithHeadline,
  Banner4,
  ParagraphWithHeadlineAndCTA,
  ImageVideoCarousel1,
  ParagraphWithHeadline,
  DynamicPrelem,
  Award1,
  Faq1,
  VideoBanner2,
  ServiceCard6,
  ProfileListing,
  LiveStreemFeed,
  Gallery2,
  SignBoard,
  ContactUs,
  ProductSummaryViaVideo,
  // Gallery1,
} from "@platformx/x-prelem-library";
// call this function at the root of the application
unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace("Mui", "Platform-x-"),
);

function PrelemComponent() {
  return (
    <div className='App'>
      <ToastContainerHandle />
      <ThemeProvider theme={PrelemTheme}>
        <Box sx={{ margin: (themeOptions) => themeOptions.prelemMargin.value }}>
          <CssBaseline />
          {/* <AnimationOnPageScroll /> */}
          <ProfileListing />
          <ServiceCard6 />
          <VideoBanner2 />
          <Faq1 />
          <Award1 />
          <DynamicPrelem />
          {/* <ParagraphWithHeadline /> */}
          <ImageVideoCarousel1 />
          <ParagraphWithHeadlineAndCTA />
          <Banner4 />
          {/* <LeftAlignParagraphWithHeadline /> */}
          <WebsiteSummaryWithSubHeading />
          <WebsiteSummaryWithSubHeading2 />
          <ProductSummary3 />
          <TeamMembers />
          <FeatureTiles />
          <ServiceShowcase2 />
          <ServiceCard7 />
          <CounterNumberShowcase />
          <ContentDisplayWithCategories />
          <CustomerTestimonial2 />
          <BlogTiles />
          <DynamicPrelemOne />
          <Banner6 />
          <DynamicPrelemWithCarousel1 />
          <DynamicPrelemWithCarousel2 />
          <AboutUsThree />
          <AboutUs2 />
          <FullWidthBanner3 />
          <WebsiteIntroduction4 />
          <InfoBox />
          <Banner7 />
          <CoreHighlights />
          <WebsiteIntroduction2 />
          <ArticleDetail />
          <Quote />
          <Sponsor />
          <ProductSummaryViaImage />
          <WebsiteIntroduction />
          <Testimonial />
          <ProductSummaryViaVideo2 />
          <ServiceCard />
          <ServiceShowcase />
          <ImageAndVideoGallery />
          <ProductSummaryViaImage2 />
          <FullWidthImage />
          <FullWidthVideo />
          <Banner1 />
          <Banner3 />
          <Description />
          <FullWidthText />
          <ImageCarousel />
          <ImageCards />
          <FullWidthTextWithImage />
          <VideoBanner1 />
          <ServiceCard1 />
          <ServiceCard2 />
          <ServiceCard3 />
          <FeatureBox1 />
          <FeatureBox2 />
          <ServiceCard5 />
          <Services1 />
          <Services2 />
          {/* <Gallery1 /> */}
          <LiveStreemFeed />
          <Gallery2 />
          <LeftAlignParagraphWithHeadline />
          <ParagraphWithHeadline />
          <SignBoard />
          <ContactUs />
          <ProductSummaryViaVideo />
        </Box>
      </ThemeProvider>
    </div>
  );
}
export default PrelemComponent;
