import { ReactComponent as SitelogoupdateIcon } from '../../../assets/svg/sitelogopupdateicon.svg';
import { ReactComponent as Aboutusupdateicon } from '../../../assets/svg/Aboutusupdateicon.svg';
import { ReactComponent as Contactusupdateicon } from '../../../assets/svg/Contactusupdateicon.svg';
import { ReactComponent as Addlinkupdateicon } from "../../../assets/svg/addlinkupdateicon.svg";
import { ReactComponent as CopyrightUpdateIcon } from "././../../../assets/svg/copyrightupdateicon.svg";
import { ReactComponent as Newsletterupdateicon } from "../../../assets/svg/Newsletterupdateicon.svg";
import { ReactComponent as MediahandleUpdateIcon } from "../../../assets/svg/mediahandleupdateicon.svg";

const iconImages = [
  {
    id: 'sitelogo',
    iconName: SitelogoupdateIcon,
    tooltip: 'site_logo',
  },
  {
    id: 'aboutus',
    iconName: Aboutusupdateicon,
    tooltip: 'about_us',
  },
  {
    id: 'contactus',
    iconName: Contactusupdateicon,
    tooltip: 'contact_us',
  },
  {
    id: 'addlink',
    iconName: Addlinkupdateicon,
    tooltip: 'add_link',
  },
  {
    id: 'copyrighttext',
    iconName: CopyrightUpdateIcon,
    tooltip: 'sitesetting_copyright',
  },
  {
    id: 'newsletter',
    iconName: Newsletterupdateicon,
    tooltip: 'sitesetting_news_title',
  },
  {
    id: 'mediahandle',
    iconName: MediahandleUpdateIcon,
    tooltip: 'media_handle',
  }
];
export default iconImages;

export const DRAFT = 'DRAFT';
export const PUBLISHED = 'PUBLISHED';
