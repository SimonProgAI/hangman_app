import ui_text from "../../messages/ui_text.json";
import styles from "./PageTitle.module.css";

const pageTitleString: string = ui_text.pageTitle;
const pageTitleArr: string[] = pageTitleString.split("");

const title = pageTitleArr.map((letter, index) => {
  return (
    <span className={styles.title_span} key={index}>
      {letter}
    </span>
  );
});

export function PageTitle() {
  return (
    <div className={styles.title_div}>
      <h1>{title}</h1>
    </div>
  );
}
