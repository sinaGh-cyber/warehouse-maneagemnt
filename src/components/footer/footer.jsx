import style from './footer.module.scss';

import WithLanguage from '../../hoc/withLanguage';

import { AiFillMail } from 'react-icons/ai';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';

const Footer = ({ isPersian, currentLanguageTexts }) => {
  return (
    <>
      <footer
        className={`${style.footerTag} ${
          isPersian ? style.PersianFlex : style.EnglishFlex
        }`}
      >
        <section className={style.description}>
          {' '}
          <p>
            {currentLanguageTexts.footerMe1}
            <a href="https://github.com/sinaGh-cyber">
              {currentLanguageTexts.footerMe2}
            </a>
          </p>
          <br />
          <p>
            {currentLanguageTexts.footerInstructor1}{' '}
            <a href="https://github.com/sahebmohammadi">
              {currentLanguageTexts.footerInstructor2}
            </a>
            {currentLanguageTexts.footerInstructor3}
          </p>{' '}
        </section>

        <ul className={style.ulTag}>
          <li className={style.liTag}>
            <a href="https://www.instagram.com/sina_gh1999">
              <AiFillInstagram />
            </a>{' '}
          </li>

          <li className={style.liTag}>
            <a href="https://github.com/sinaGh-cyber">
              <AiFillGithub />
            </a>{' '}
          </li>

          <li className={style.liTag}>
            {' '}
            <a href="mailto:mohammad.sina.gholami.cyber@gmail.com">
              <AiFillMail />
            </a>{' '}
          </li>

          <li className={style.liTag}>
            {' '}
            <a href="https://www.linkedin.com/in/mohammad-sina-gholami-632489214/">
              <AiOutlineLinkedin />
            </a>{' '}
          </li>
        </ul>
      </footer>
    </>
  );
};

export default WithLanguage(Footer);
