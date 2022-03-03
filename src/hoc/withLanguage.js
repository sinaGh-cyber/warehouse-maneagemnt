import { useLanguage, languages } from '../contexts/languagesContext';
import { useEffect, useState } from 'react';

const languageEquivalents = {
  Persian: {
    webAppTitleText: 'مدیریت انبار',
    ToggleBtnText: 'فا',
    footerMe1: ' کدنویسی شده توسط ',
    footerMe2: 'من',
    footerInstructor1: 'الهام گرفته از دوره ی ریکت استاد',
    footerInstructor2: 'صاحب محمدی',
    footerInstructor3: '',
    ProductName: 'نام کالا:',
    quantity: 'تعداد: ',
    expireDate: 'تاریخ انفضا: ',
    category: 'دسته بندی: ',
    selectACategory: 'انتخاب دسته بندی...',
    typeCategory: 'دسته بندی جدید را وارد کنید...',
  },

  English: {
    webAppTitleText: 'Warehouse Management',
    ToggleBtnText: 'En',
    footerMe1: ' coded by ',
    footerMe2: 'me',
    footerInstructor1: 'inspired by',
    footerInstructor2: 'Saheb Mohammadi',
    footerInstructor3: "'s React & Redux curse.",
    ProductName: 'Product Name:',
    quantity: 'quantity: ',
    expireDate: 'Expire date: ',
    category: 'Category: ',
    selectACategory: 'select a category...',
    typeCategory: 'type your new category...',
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
