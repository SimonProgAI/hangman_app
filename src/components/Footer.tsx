import githubLogo from "../images/github-mark.svg";
import linkedinLogo from "../images/LinkedIn_icon.svg";
import emailLogo from "../images/envelope-svgrepo-com.svg";
import ui_text from "../messages/ui_text.json";
import styles from "./Footer.module.css";
import { FooterObjArr, FooterObj } from "./TS Interfaces/FooterObj";


const githubLink: string = "https://github.com/SimonProgAI/hangman_app";
const linkedinLink: string = "https://linkedin.com/in/simon-lupien-22594235a";
const emailLink: string = "mailto:lupiensimon@hotmail.com";

const footerObjArr: FooterObjArr = [
  { link: githubLink, logo: githubLogo },
  { link: linkedinLink, logo: linkedinLogo },
  { link: emailLink, logo: emailLogo },
];

const footerTagsArr = footerObjArr.map((obj: FooterObj) => {
  return (
    <a href={obj.link} target="_blank">
      <img src={obj.logo} className={styles.footer_icon}></img>
    </a>
  );
});

export function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        {footerTagsArr}
        <h3>{ui_text.copyright}</h3>
      </footer>
    </div>
  );
}
