import dynamic from "next/dynamic";
import { ComponentType } from "react";
import Mapping from "platform-x-prelems/prelems/mapping";

interface IdynamicList {
  [key: string]: ComponentType;
}

const dynamicLists: IdynamicList = {};
export const dynamicListHandle = (arr = []) => {
  arr.forEach((item: any) => {
    Object.keys(Mapping).forEach((key) => {
      if (key === item?.PrelemId) {
        dynamicLists[key] = dynamic(() => import(`platform-x-prelems/prelems/${Mapping[key]}`), {
          ssr: false,
        });
      }
    });
  });
  return dynamicLists;
};
