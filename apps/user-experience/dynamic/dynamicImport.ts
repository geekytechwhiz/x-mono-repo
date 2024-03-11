import dynamic from "next/dynamic";
import { ComponentType } from "react";
// import { Mapping } from "@platformx/x-prelems-library";

interface IdynamicList {
  [key: string]: ComponentType;
}

const Mapping = {
  Prelem_001: "WebsiteIntroduction",
  Prelem_002: "productSummaryViaImage",
  Prelem_003: "productSummaryViaVideo",
  Prelem_004: "Sponsor",
  Prelem_005: "quote",
  Prelem_006: "ArticleDetail",
  Prelem_007: "contactUs",
  Prelem_008: "AnimationOnPageScroll",
  Prelem_009: "WebsiteIntroduction2",
  Prelem_010: "dynamicTweets",
  Prelem_011: "SignBoard",
  Prelem_012: "Testimonial",
  Prelem_013: "ServiceCards",
  Prelem_014: "ProductSummaryViaVideo2",
  Prelem_016: "ServiceShowcase",
  Prelem_015: "ImageAndVideoGallery",
  Prelem_017: "productSummaryViaImage2",
  Prelem_018: "ExpertiseShowcase",
  Prelem_019: "fullWidthImage",
  Prelem_020: "fullWidthVideo",
  Prelem_021: "ImageCrousel1",
  Prelem_022: "Banner1",
  Prelem_023: "Description",
  Prelem_024: "Banner2",
  Prelem_025: "Banner3",
  Prelem_026: "FullWidthText",
  Prelem_027: "ImageCards",
  Prelem_028: "VideoBanner1",
  Prelem_029: "FullWidthTextWithImage",
  Prelem_030: "ServiceCard1",
  Prelem_031: "ServiceCard2",
  Prelem_032: "ServiceCard3",
  Prelem_033: "FeatureBox1",
  Prelem_034: "FeatureBox2",
  Prelem_036: "ServiceCard4",
  Prelem_037: "ServiceCard5",
  Prelem_038: "Services1",
  Prelem_039: "Services2",
  Prelem_040: "Gallery1",
  Prelem_3700: "LivestreamFeed",
  ContentType_01: "Article",
  Prelem_041: "MultiSlot",
  Prelem_043: "VideoBanner2",
  Prelem_044: "Gallery2",
  Prelem_042: "ServiceCard6",
  ContentType_02: "VideoLandingPage",
  Prelem_045: "AboutUs2",
  Prelem_046: "Faq1",
  Prelem_047: "Awards1",
  Prelem_048: "DynamicPrelem",
  ContentType_03: "Quiz",
  ContentType_04: "Poll",
  Prelem_052: "ImageVideoCarousel1",
  Prelem_055: "ParagraphWithHeadlineAndCTA",
  Prelem_054: "AboutUsThree",
  Prelem_056: "ParagraphWithHeadline",
  Prelem_057: "Banner4",
  Prelem_058: "LeftAlignParagraphWithHeadline",
  Prelem_059: "WebsiteSummaryWithSubHeading",
  Prelem_060: "WebsiteSummaryWithSubHeading2",
  Prelem_061: "ProductSummary3",
  Prelem_063: "Statistics",
  Prelem_064: "AboutUsFourWithSubHeading",
  Prelem_062: "TeamMembers",
  Prelem_066: "EcomProduct",
  Prelem_069: "FeatureTiles",
  Prelem_065: "ServiceShowcase2",
  ContentType_05: "EventLandingPage",
  Prelem_067: "ServiceCard7",
  Prelem_070: "CounterNumberShowcase",
  Prelem_068: "ContentDisplayWithCategories",
  Prelem_050: "CustomerTestimonial2",
  Prelem_053: "BlogTiles",
  Prelem_071: "MultiSlot2",
  Prelem_075: "Banner5",
  Prelem_073: "Ecommerce3Slot2",
  Prelem_074: "DynamicEcommercePrelem",
  // ContentType_06: "Ecommerce",
  Prelem_072: "Ecommerce3Slot1",
  Prelem_078: "LearningList",
  Prelem_077: "DynamicPrelemOne",
  Prelem_079: "Banner6",
  Prelem_080: "DynamicPrelemWithCarousel2",
  Prelem_081: "DynamicPrelemWithCarousel1",
  Prelem_076: "ContactUsForm",
  Prelem_083: "FullWidthBanner3",
  Prelem_084: "WebsiteIntroduction4",
  Prelem_085: "InfoBox",
  Prelem_090: "Banner7",
  Prelem_091: "CoreHighlights",
  Prelem_0100: "MyStory",
  Prelem_0113: "SchemaAuthoringServiceCard",
};

const dynamicLists: IdynamicList = {};
export const dynamicListHandle = (arr = []) => {
  arr.forEach((item: any) => {
    Object.keys(Mapping).forEach((key) => {
      if (key === item?.PrelemId) {
        dynamicLists[key] = dynamic(
          () => import("@platformx/x-prelems-library").then((mod) => mod?.[Mapping?.[key]]),
          {
            ssr: false,
          },
        );
      }
    });
  });
  return dynamicLists;
};
