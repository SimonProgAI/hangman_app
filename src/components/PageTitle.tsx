import ui_text from "../messages/ui_text.json";
import "./components.css";

const pageTitleString: string = ui_text.pageTitle;
const pageTitleArr: string[] = pageTitleString.split("");

const title = pageTitleArr.map((letter, index) => {
  return (
    <span className="title" key={index}>
      {letter}
    </span>
  );
});

export function PageTitle() {
  return (
    <div className="top_container">
      <h1>{title}</h1>
    </div>
  );
}
