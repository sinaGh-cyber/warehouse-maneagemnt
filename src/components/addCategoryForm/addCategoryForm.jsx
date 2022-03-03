import { useRef, useState } from 'react';
import { useProducts } from '../../contexts/productsContext/productsProvider';
import styles from './addCategoryForm.module.scss';
import WithLanguage from '../../hoc/withLanguage';

const AddCategoryForm = ({
  isPersian,
  currentLanguageTexts,
  onAddCategoryBtnClickHandler,
}) => {
  const InputRef = useRef();
  const [inputCategory, setInputCategory] = useState();
  const { dispatch } = useProducts();
  return (
    <div
      className={`${styles.NewCategoryDiv} ${
        isPersian ? styles.PersianFlex : styles.EnglishFlex
      }`}
    >
      <input
        className={styles.NewCategoryInputTag}
        ref={InputRef}
        onChange={(e) => {
          setInputCategory(e.target.value);
        }}
        type="text"
        placeholder={currentLanguageTexts.typeCategory}
      />

      <button
        className={styles.addNewCategoryBtn}
        onClick={() => {
          if (inputCategory) {
            dispatch({
              type: 'addNewCategory',
              data: { value: inputCategory, label: inputCategory },
            });
            onAddCategoryBtnClickHandler(inputCategory);
          }
        }}
      >
        +
      </button>
    </div>
  );
};

export default WithLanguage(AddCategoryForm);
