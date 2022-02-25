import style from './navbar.module.scss';

import WithLanguage from '../../hoc/withLanguage';

const Navbar = ({ isPersian, currentLanguageTexts, languageToggler }) => {
  // handlers

  const OnToggleLanguageBtnClickHandler = () => {
    languageToggler();
  };

  return (
    <nav
      className={`${style.navTag} ${isPersian ? style.PersianFlex : style.EnglishFlex}`}
    >
      <header className={style.headerTag}>
        {currentLanguageTexts.webAppTitleText}
      </header>

      <section className={style.buttonGroup}>
        <button
          onClick={OnToggleLanguageBtnClickHandler}
          className={style.toggleLanguageBtn}
        >
          {currentLanguageTexts.ToggleBtnText}
        </button>
      </section>
    </nav>
  );
};

export default WithLanguage(Navbar);
