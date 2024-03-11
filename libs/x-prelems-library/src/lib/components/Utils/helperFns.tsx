import {
  convertToLowerCase,
  articleIcon,
  imgIcon,
  pollIcon,
  quizIcon,
  vodIcon,
  CourseListIcon,
  General_community,
  News_community,
  playerIcon,
  Community,
  Challenges_community,
  Faq,
  EventIcon,
  Testimonial,
  Awards,
  FeatureCard,
  ServiceCard,
  Shopping_bag,
} from "@platformx/utilities";

export const getIcon = (ct: string) => {
  switch (convertToLowerCase(ct)) {
    case "article":
      return articleIcon;
    case "poll":
      return pollIcon;
    case "quiz":
      return quizIcon;
    case "imagegallery":
      return imgIcon;
    case "event":
      return EventIcon;
    case "faq":
      return Faq;
    case "testimonial":
      return Testimonial;
    case "awards":
      return Awards;
    case "servicecard":
      return ServiceCard;
    case "accolades":
      return FeatureCard;
    case "product":
      return Shopping_bag;
    case "course":
      return CourseListIcon;
    case "news":
      return News_community;
    case "general":
      return General_community;
    case "challenges-announcement":
      return Challenges_community;
    case "community":
      return Community;
    case "profile":
      return playerIcon;
    default:
      return vodIcon;
  }
};
