import uiMsg from "../messages/ui_msg.json";
const pageTitleString: string = uiMsg.pageTitle;
const pageTitleArr: string [] = pageTitleString.split("");

export const processedPageTitleArr = pageTitleArr.map((letter, index) => {
    return (
      <span className="title" key={index}>
        {letter}
      </span>
    );
  });