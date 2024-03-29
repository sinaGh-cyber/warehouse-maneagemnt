import styles from './Filter.module.scss';
import { useProducts } from '../../contexts/productsContext/productsProvider';
import Select from 'react-select';
import WithLanguage from '../../hoc/withLanguage';
import { useState } from 'react';

const Filter = ({ isPersian, currentLanguageTexts }) => {
  const { products, dispatch } = useProducts();

  const [myFilter, setMyFilter] = useState({
    sortBy: false,
    order: false,
  });

  const onSelectCategoryChangHandler = (e) => {
    new Promise((resolve) => {
      resolve(true);
    })
      .then(() => {
        dispatch({ type: 'setNewCategory', value: e.value });
      })
      .then(() => {
        dispatch({ type: 'filter' });
      });
  };

  const onSelectOrderChangeHandler = (e) => {
    new Promise((resolve) => {
      resolve(true);
    })
      .then(() => {
        dispatch({ type: 'setNewSortOrder', value: e.value });
      })
      .then(() => {
        dispatch({ type: 'filter' });
      })
      .finally(() => {
        setMyFilter({ ...myFilter, order: e });
      });
  };

  const onSelectSortByOptionArrayChangeHandler = (e) => {
    new Promise((resolve) => {
      resolve(true);
    })
      .then(() => {
        dispatch({ type: 'setNewSortBy', value: e.value });
      })
      .then(() => {
        dispatch({ type: 'filter' });
      })
      .finally(() => {
        setMyFilter({ ...myFilter, sortBy: e });
      });
  };

  return (
    <div
      className={`${styles.filterManager} ${
        isPersian ? styles.PersianFlex : styles.EnglishFlex
      }`}
    >
      <div className={`${styles.selectOrderDiv} ${styles.InnerDivTag}`}>
        <label htmlFor="selectOrderInputId">
          {currentLanguageTexts.selectOrderText}{' '}
        </label>
        <div className={`${styles.selectOrderWarper} ${styles.selectWarper}`}>
          <Select
            value={myFilter.order}
            placeholder={currentLanguageTexts.selectOrderTextPlaceholder}
            inputId="selectOrderInputId"
            options={currentLanguageTexts.OrderOptionArray}
            onChange={onSelectOrderChangeHandler}
          />
        </div>
      </div>

      <div className={`${styles.selectSortByDiv} ${styles.InnerDivTag}`}>
        <label htmlFor="selectSortByInputId">
          {currentLanguageTexts.selectSortByText}
        </label>
        <div className={`${styles.selectSortByWarper} ${styles.selectWarper}`}>
          <Select
            value={myFilter.sortBy}
            placeholder={currentLanguageTexts.selectSortByTextPlaceholder}
            inputId="selectSortByInputId"
            options={currentLanguageTexts.sortByOptionArray}
            onChange={onSelectSortByOptionArrayChangeHandler}
          />
        </div>
      </div>

      <div className={`${styles.selectCategoryDiv} ${styles.InnerDivTag}`}>
        <label htmlFor="selectCategoryInputId">
          {currentLanguageTexts.selectCategoryText}
        </label>
        <div
          className={`${styles.selectCategoryWarper} ${styles.selectWarper}`}
        >
          <Select
            value={{
              value: products.currentFilters.category,
              label: products.currentFilters.category,
            }}
            placeholder={currentLanguageTexts.selectACategory}
            inputId="selectCategoryInputId"
            options={[
              ...products.categoryOptions,
              { label: 'All', value: 'ALL' },
            ]}
            onChange={onSelectCategoryChangHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default WithLanguage(Filter);
