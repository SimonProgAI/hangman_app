import githubLogo from "../../images/github-mark.svg";
import linkedinLogo from "../../images/LinkedIn_icon.svg";
import emailLogo from "../../images/envelope-svgrepo-com.svg";
import urls from "../../messages/urls.json";
import ui_text from "../../messages/ui_text.json";
import styles from "./Footer.module.css";

interface FooterObj { link: string; logo: string };
type FooterObjArr = FooterObj[];

const footerObjArr: FooterObjArr = [
  { link: urls.githubLink, logo: githubLogo },
  { link: urls.linkedinLink, logo: linkedinLogo },
  { link: urls.emailLink, logo: emailLogo },
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
