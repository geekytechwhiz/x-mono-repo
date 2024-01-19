import { ReactComponent as QuizIcon2 } from '../../../assets/MenuIcons-2.svg';
import { ReactComponent as QuizIcon3 } from '../../../assets/MenuIcons-3.svg';
import { ReactComponent as QuizIcon4 } from '../../../assets/MenuIcons-4.svg';
import { ReactComponent as QuizIcon5 } from '../../../assets/MenuIcons-5.svg';
import { ReactComponent as QuizIcon6 } from '../../../assets/MenuIcons-6.svg';
import { ReactComponent as QuizIcon7 } from '../../../assets/MenuIcons-7.svg';
import { ReactComponent as QuizIcon8 } from '../../../assets/MenuIcons-8.svg';
import { ReactComponent as QuizIcon9 } from '../../../assets/MenuIcons-9.svg';

const createEventFlatIcon = [
  {
    id: 'ImageAndThumbnail',
    iconName: QuizIcon8,
    tooltip: 'Image And Thumbnail',
  },
  {
    id: 'titleDescription',
    iconName: QuizIcon2,
    tooltip: 'Title & description',
  },
  {
    id: 'eventTimeAndLocation',
    iconName: QuizIcon3,
    tooltip: 'Event Timings & Location',
  },
  {
    id: 'schedulePublish',
    iconName: QuizIcon9,
    tooltip: 'Schedule Publish',
  },
  {
    id: 'tags',
    iconName: QuizIcon4,
    tooltip: 'Choose Tags',
  },
  {
    id: 'socialShare',
    iconName: QuizIcon5,
    tooltip: 'Social Share',
  },
  {
    id: 'Analytics',
    iconName: QuizIcon6,
    tooltip: 'Analytics',
  },
  {
    id: 'seo',
    iconName: QuizIcon7,
    tooltip: 'Seo',
  },
];

export const PAGE_EXIST_POP_UP = {
  saveAsDraftTitle: 'event_already_exists',
  saveAsDraftDescription: 'are_you_sure_you_want_to_continue?',
  saveAsDraftCloseText: 'no',
  saveAsDraftConfirmText: 'yes',
};
export const SAVE_AS_DRAFT_POP_UP = {
  saveAsDraftTitle: 'saved_As_draft',
  saveAsDraftDescription: 'your_event_has_been_saved_successfully',
  saveAsDraftCloseText: 'edit',
  saveAsDraftConfirmText: 'go_to_event_listing',
};

export const PUBLISH_POP_UP = {
  publishTitle: 'congratulations',
  publishDescription:
    'your_Event_has_been_sent_for_publishing_&_will_be_published_in_a_few_seconds',
  publishCloseText: 'go_to_listing',
  publishConfirmText: 'view_event',
};

export const PATH = 'path';
export const DRAFT = 'DRAFT';
export const EVENT = 'Event';
export const PUBLISHED = 'PUBLISHED';
export const IMAGE_URL = 'imageURL';
export const IMAGES = 'Images';
export const SOCIAL_SHARE_IMG_URL = 'socialShareImgURL';
export const SOCIAL_SHARE = 'socialShare';
export const CANCEL = 'cancel';
export const SEO = 'Seo';
export const seo = 'seo';
export const SCROLL = 'scroll';
export const BEFORE_UNLOAD = 'beforeunload';
export const POP_STATE = 'popstate';
export const RESIZE = 'resize';

export default createEventFlatIcon;
