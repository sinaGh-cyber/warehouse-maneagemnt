import { useLanguage, languages } from '../contexts/languagesContext';
import { useEffect, useState } from 'react';

const languageEquivalents = {
  Persian: {
    webAppTitleText: 'مدیریت انبار',
    ToggleBtnText: 'فا',
  },

  English: {
    webAppTitleText: 'Warehouse Management',
    ToggleBtnText: 'En',
  },
};

const WithLanguage = (WrappedComponent) => {
  const UpdatedComponent = (props) => {
    const { currentLanguage, languageToggler } = useLanguage();
    const [isPersian, setIsPersian] = useState(false);
    useEffect(() => {
      if (currentLanguage === languages.Persian) {
        setIsPersian(true);
      } else {
        setIsPersian(false);
      }
    }, [currentLanguage]);

    return (
      <WrappedComponent
        isPersian={isPersian}
        currentLanguageTexts={languageEquivalents[currentLanguage]}
        languageToggler={languageToggler}
        {...props}
      />
    );
  };

  return UpdatedComponent;
};

export default WithLanguage;
