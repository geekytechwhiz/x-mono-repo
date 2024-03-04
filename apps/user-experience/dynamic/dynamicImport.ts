import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { Mapping } from "@platformx/x-prelems-library";

interface IdynamicList {
  [key: string]: ComponentType;
}

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
