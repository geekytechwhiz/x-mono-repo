import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import ContentSection from "./ContentSection/ContentSection";

const PlayerDetail = ({ content, analytics, authoringHelper, secondaryArgs = {} }: any) => {
  return (
    <>
      <HeroSection
        content={content}
        analytics={analytics}
        authoringHelper={authoringHelper}
        secondaryArgs={secondaryArgs}
      />
      <ContentSection
        content={content}
        analytics={analytics}
        authoringHelper={authoringHelper}
        secondaryArgs={secondaryArgs}
      />
    </>
  );
};

PlayerDetail.defaultProps = {
  content: {
    id: "aa9535ca-d2cd-4007-87c3-958a3075114d",
    documentpath:
      "/content/documents/hclplatformx/sites/feyenoord/lingual/en/contenttypes/profile/cristiano-ronaldo",
    language: "en",
    PathxCan:
      "/content/documents/hclplatformx/sites/feyenoord/lingual/en/contenttypes/profile/cristiano-ronaldo",
    path: "/content/documents/hclplatformx/sites/feyenoord/lingual/en/contenttypes/profile/cristiano-ronaldo/cristiano-ronaldo",
    multisite_name: "feyenoord",
    name: "cristiano-ronaldo",
    facet_tags: ["Profiles"],
    debut_date: "2003-08-16T06:51:58Z",
    profile_image: {
      type: "hclplatformx:ImageCompound",
      items: {
        "hclplatformx:published_images": [
          {
            aspect_ratio: "landscape",
            folder_path: "1702704663726/public/png/Alireza-landscape",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1702704663726/public/png/Alireza-hero",
          },
          {
            aspect_ratio: "square",
            folder_path: "1702704663726/public/png/Alireza-square",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1702704663726/public/png/Alireza-card1",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1702704663726/public/png/Alireza-portrait",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1702704663726/public/png/Alireza-card2",
          },
        ],
        "hclplatformx:original_image": {
          original_image_relative_path: "1702704663726/public/png/Alireza",
          bitStreamId: "c89fc019-dea5-4967-8bdd-3b7d4f3cc928",
          auto: true,
          ext: "png",
          visibility: "public",
        },
      },
    },
    background_image: {
      type: "hclplatformx:ImageCompound",
      items: {
        "hclplatformx:published_images": [
          {
            aspect_ratio: "landscape",
            folder_path: "1700462997165/public/jpeg/world-cup-landscape",
          },
          {
            aspect_ratio: "square",
            folder_path: "1700462997165/public/jpeg/world-cup-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1700462997165/public/jpeg/world-cup-portrait",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1700462997165/public/jpeg/world-cup-hero",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1700462997165/public/jpeg/world-cup-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1700462997165/public/jpeg/world-cup-card2",
          },
        ],
        "hclplatformx:original_image": {
          original_image_relative_path: "1700462997165/public/jpeg/world-cup",
          bitStreamId: "e99f820a-d42e-4ad3-a818-4d2470fed186",
          auto: true,
          ext: "jpg",
          visibility: "public",
        },
      },
    },
    debut_image: {
      type: "hclplatformx:ImageCompound",
      items: {
        "hclplatformx:published_images": [
          {
            aspect_ratio: "landscape",
            folder_path: "1702705003631/public/png/FeyenoordLogo-landscape",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1702705003631/public/png/FeyenoordLogo-card1",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1702705003631/public/png/FeyenoordLogo-hero",
          },
          {
            aspect_ratio: "square",
            folder_path: "1702705003631/public/png/FeyenoordLogo-square",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1702705003631/public/png/FeyenoordLogo-portrait",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1702705003631/public/png/FeyenoordLogo-card2",
          },
        ],
        "hclplatformx:original_image": {
          original_image_relative_path: "1702705003631/public/png/FeyenoordLogo",
          bitStreamId: "378ddf90-636a-4bb6-b8e1-ee5c65290d35",
          auto: true,
          ext: "png",
          visibility: "public",
        },
      },
    },
    international_debut_image: {
      type: "hclplatformx:ImageCompound",
      items: {
        "hclplatformx:published_images": [
          {
            aspect_ratio: "square",
            folder_path: "1702705997265/public/png/Iran-square",
          },
          {
            aspect_ratio: "hero",
            folder_path: "1702705997265/public/png/Iran-hero",
          },
          {
            aspect_ratio: "landscape",
            folder_path: "1702705997265/public/png/Iran-landscape",
          },
          {
            aspect_ratio: "portrait",
            folder_path: "1702705997265/public/png/Iran-portrait",
          },
          {
            aspect_ratio: "card1",
            folder_path: "1702705997265/public/png/Iran-card1",
          },
          {
            aspect_ratio: "card2",
            folder_path: "1702705997265/public/png/Iran-card2",
          },
        ],
        "hclplatformx:original_image": {
          original_image_relative_path: "1702705997265/public/png/Iran",
          bitStreamId: "7e404110-28f2-40ef-9ab0-4df7d1ea97e7",
          auto: true,
          ext: "png",
          visibility: "public",
        },
      },
    },
    is_edit: false,
    joined_date: "2003-08-15T18:30:00Z",
    international_debut_oppostion: "Kazakhstan",
    left_date: "2023-12-15T18:30:00Z",
    page_caching: false,
    createdBy: "Sooraj Shukla",
    socialog_description: "Cristiano Ronaldo",
    analytics_enable: true,
    lastModifiedBy: "Sooraj Shukla",
    page: "cristiano-ronaldo",
    creationDate: "2023-12-16T06:56:47Z",
    robot_txt: "false",
    page_state: "PUBLISHED",
    is_schedule_publish: false,
    goals: "869",
    description:
      "Cristiano Ronaldo dos Santos Aveiro GOIH ComM is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club Al Nassr and the Portugal national team.",
    workflow_id: "1a14f491-f463-4d95-96f8-b51cfcfebb16",
    tagging: "Profile",
    keywords: '["Profile"]',
    clean_sheets: "NA",
    bio: "Cristiano Ronaldo dos Santos Aveiro GOIH ComM is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club Al Nassr and the Portugal national team.",
    full_name: "Cristiano Ronaldo",
    lastModificationDate: "2023-12-16T06:56:47Z",
    short_title: "Cristiano Ronaldo",
    birth_date: "1985-02-05T00:00:00Z",
    content_type: "Profile",
    seo_title: "Cristiano Ronaldo",
    socialog_title: "Cristiano Ronaldo",
    parent_page_url: "/",
    tshirt_number: "7",
    socialog_sitename: "Cristiano Ronaldo",
    debut_opposition: " Sporting CP",
    is_featured: false,
    socialog_twitter_image:
      '{"ImageCropUrl":{"CropUrl":{"Web":"https://dev.dam.hcl-x.com/server/api/core/bitstreams/e99f820a-d42e-4ad3-a818-4d2470fed186/content"},"MetaFields":{"AltText":"","Name":"","Title":"","Description":"","Color":""}}}',
    short_description:
      "Cristiano Ronaldo dos Santos Aveiro GOIH ComM is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club Al Nassr and the Portugal national team.",
    socialog_type: "profile",
    socialog_image:
      '{"ImageCropUrl":{"CropUrl":{"Web":"https://dev.dam.hcl-x.com/server/api/core/bitstreams/e99f820a-d42e-4ad3-a818-4d2470fed186/content"},"MetaFields":{"AltText":"","Name":"","Title":"","Description":"","Color":""}}}',
    known_name: "el Bicho",
    teaser:
      "Cristiano Ronaldo dos Santos Aveiro GOIH ComM is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club Al Nassr and the Portugal national team.",
    socialog_url: "https://qa.hcl-x.com/en/profile/cristiano-ronaldo",
    socialog_twitter_title: "Cristiano Ronaldo",
    locale: "en",
    seo_keywords: '["Profile"]',
    tags: '["Profiles"]',
    sitemap: false,
    nationality: "Portuguese",
    international_debut_date: "2002-08-14T06:53:07Z",
    workflow_stages:
      '[{"state":"request_review","role":"author","label":"For Review"},{"state":"review","role":"editor","label":"For Approval"},{"state":"approval","role":"reviewer","label":"For Publishing"},{"state":"publish","role":"publisher","label":"Publish"}]',
    seo_description: "Cristiano Ronaldo",
    tag_name: "Profile",
    birth_place: "Funchal",
    modificationDate: "2023-12-16T06:56:47.868Z",
    socialog_twitter_url: "https://qa.hcl-x.com/en/quiz/cristiano-ronaldo",
    middle_name: "dos santos",
    page_mobile_friendly: false,
    is_softdelete: false,
    socialog_twitter_description: "Cristiano Ronaldo",
    player_id: "7",
    user_action_info:
      '{"publishByDetails":{"email":"","name":"","timeZone":"Asia/Kolkata","pubUnpubDateTime":""},"unpublishByDetails":{"email":"","name":"","timeZone":"Asia/Kolkata","pubUnpubDateTime":""}}',
    background_content: {
      objectType: "image",
      Url: "https://dev.dam.hcl-x.com/server/api/core/bitstreams/c89fc019-dea5-4967-8bdd-3b7d4f3cc928/content",
      Title: "Alireza",
      Thumbnail:
        "https://dev.dam.hcl-x.com/server/api/core/bitstreams/c89fc019-dea5-4967-8bdd-3b7d4f3cc928/content",
      Color: "",
      ext: "png",
    },
    site_name: "mavericks",
    is_schedule_unpublish: false,
    position: "Forward",
    page_lastmodifiedby: "Sooraj Shukla",
    first_name: "Cristiano",
    appearnaces: "1100",
    quote:
      "If you don't believe you are the best, then you will never achieve all that you are capable of. I don't have to show anything to anyone. There is nothing to prove. Many people look at me and think they know me but they don't at all.",
    is_workflow_enabled: true,
    country: "Portugal",
    current_page_url: "/cristiano-ronaldo",
    page_createdby: "Sooraj Shukla",
    title: "Cristiano Ronaldo",
    publicationDate: "2023-12-16T06:56:51Z",
    seo_enable: true,
    workflow_status: "draft",
    is_active: true,
    last_name: "Ronaldo",
    _version_: 1785420645334515700,
    published_date: "2023-12-16T06:56:51Z",
    profile_images: {
      published_images: [
        {
          aspect_ratio: "landscape",
          folder_path: "1702704663726/public/png/Alireza-landscape",
        },
        {
          aspect_ratio: "hero",
          folder_path: "1702704663726/public/png/Alireza-hero",
        },
        {
          aspect_ratio: "square",
          folder_path: "1702704663726/public/png/Alireza-square",
        },
        {
          aspect_ratio: "card1",
          folder_path: "1702704663726/public/png/Alireza-card1",
        },
        {
          aspect_ratio: "portrait",
          folder_path: "1702704663726/public/png/Alireza-portrait",
        },
        {
          aspect_ratio: "card2",
          folder_path: "1702704663726/public/png/Alireza-card2",
        },
      ],
      original_image: {
        original_image_relative_path: "1702704663726/public/png/Alireza",
        bitStreamId: "c89fc019-dea5-4967-8bdd-3b7d4f3cc928",
        auto: true,
        ext: "png",
        visibility: "public",
      },
    },
    background_images: {
      published_images: [
        {
          aspect_ratio: "landscape",
          folder_path: "1700462997165/public/jpeg/world-cup-landscape",
        },
        {
          aspect_ratio: "square",
          folder_path: "1700462997165/public/jpeg/world-cup-square",
        },
        {
          aspect_ratio: "portrait",
          folder_path: "1700462997165/public/jpeg/world-cup-portrait",
        },
        {
          aspect_ratio: "hero",
          folder_path: "1700462997165/public/jpeg/world-cup-hero",
        },
        {
          aspect_ratio: "card1",
          folder_path: "1700462997165/public/jpeg/world-cup-card1",
        },
        {
          aspect_ratio: "card2",
          folder_path: "1700462997165/public/jpeg/world-cup-card2",
        },
      ],
      original_image: {
        original_image_relative_path: "1700462997165/public/jpeg/world-cup",
        bitStreamId: "e99f820a-d42e-4ad3-a818-4d2470fed186",
        auto: true,
        ext: "jpg",
        visibility: "public",
      },
    },
    international_debut_images: {
      published_images: [
        {
          aspect_ratio: "square",
          folder_path: "1702705997265/public/png/Iran-square",
        },
        {
          aspect_ratio: "hero",
          folder_path: "1702705997265/public/png/Iran-hero",
        },
        {
          aspect_ratio: "landscape",
          folder_path: "1702705997265/public/png/Iran-landscape",
        },
        {
          aspect_ratio: "portrait",
          folder_path: "1702705997265/public/png/Iran-portrait",
        },
        {
          aspect_ratio: "card1",
          folder_path: "1702705997265/public/png/Iran-card1",
        },
        {
          aspect_ratio: "card2",
          folder_path: "1702705997265/public/png/Iran-card2",
        },
      ],
      original_image: {
        original_image_relative_path: "1702705997265/public/png/Iran",
        bitStreamId: "7e404110-28f2-40ef-9ab0-4df7d1ea97e7",
        auto: true,
        ext: "png",
        visibility: "public",
      },
    },
    debut_images: {
      published_images: [
        {
          aspect_ratio: "landscape",
          folder_path: "1702705003631/public/png/FeyenoordLogo-landscape",
        },
        {
          aspect_ratio: "card1",
          folder_path: "1702705003631/public/png/FeyenoordLogo-card1",
        },
        {
          aspect_ratio: "hero",
          folder_path: "1702705003631/public/png/FeyenoordLogo-hero",
        },
        {
          aspect_ratio: "square",
          folder_path: "1702705003631/public/png/FeyenoordLogo-square",
        },
        {
          aspect_ratio: "portrait",
          folder_path: "1702705003631/public/png/FeyenoordLogo-portrait",
        },
        {
          aspect_ratio: "card2",
          folder_path: "1702705003631/public/png/FeyenoordLogo-card2",
        },
      ],
      original_image: {
        original_image_relative_path: "1702705003631/public/png/FeyenoordLogo",
        bitStreamId: "378ddf90-636a-4bb6-b8e1-ee5c65290d35",
        auto: true,
        ext: "png",
        visibility: "public",
      },
    },
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    isEditPage: false,
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "About us",
    pageDesc:
      "The Prelem ‘About us 2’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags: "About us, Service Box, Features, Products",
    prelemTags: "About us, Service Box, Features, Products",
  },
  secondaryArgs: {
    prelemBaseEndpoint: {
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
    },
    editState: false,
    multiSlot: {},
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
  },
};

export default PlayerDetail;
