import { formCroppedUrlString } from "@platformx/utilities";
import { defaultImages } from "./constants";

interface SecondaryArgs {
  gcpUrl?: string;
  bucketName?: string;
}

export const getCommunityFallBackImageBasedOnContentType = (
  contentType: string,
  secondaryArgs: SecondaryArgs,
) => {
  switch (contentType) {
    case "event":
      return formCroppedUrlString(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.event,
        defaultImages?.ext,
      ).src;
    case "challenges-announcement":
      return formCroppedUrlString(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.challenges,
        defaultImages?.ext,
      ).src;
    case "exokudos:activity":
      return formCroppedUrlString(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.kudos,
        defaultImages?.ext,
      ).src;
    case "poll":
      return formCroppedUrlString(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.poll,
        defaultImages?.ext,
      ).src;
    case "news":
      return formCroppedUrlString(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.news,
        defaultImages?.ext,
      ).src;
    case "quiz":
      return formCroppedUrlString(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.quiz,
        defaultImages?.ext,
      ).src;
    case "general":
      return formCroppedUrlString(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.event,
        defaultImages?.ext,
      ).src;
    default:
      return formCroppedUrlString(
        secondaryArgs?.gcpUrl,
        secondaryArgs?.bucketName,
        defaultImages?.event,
        defaultImages?.ext,
      ).src;
  }
};
