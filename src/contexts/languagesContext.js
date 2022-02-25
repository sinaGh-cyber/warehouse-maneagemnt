import { createContext, useContext, useState } from 'react';

const languages = {
  Persian: 'Persian',
  English: 'English',
};

const languagesContext = createContext(undefined);

const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages.English);

  const languageToggler = () => {
    currentLanguage === languages.English
      ? setCurrentLanguage(languages.Persian)
      : setCurrentLanguage(languages.English);
  };

  return (
    <>
      <languagesContext.Provider value={{ currentLanguage, languageToggler }}>
        {children}
      </languagesContext.Provider>
    </>
  );
};

const useLanguage = () => {
  const languageUseContext = useContext(languagesContext);
  if (languageUseContext) return languageUseContext;
  throw Error('language provider issue');
};

export default LanguageProvider;
export { useLanguage, languages };
