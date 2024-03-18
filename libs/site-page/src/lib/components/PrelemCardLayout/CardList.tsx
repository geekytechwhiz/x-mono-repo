import { LayoutList } from "../utils/prelemTypes";
import Card from "./Card";

const CardList = ({ layoutList, handleLayoutFilter, searchValue, categoryState }: LayoutList) => {
  return (
    <>
      {layoutList.map((layout, key) => {
        return <Card key={key} layout={layout} handleLayoutFilter={handleLayoutFilter} />;
      })}
    </>
  );
};

export default CardList;
