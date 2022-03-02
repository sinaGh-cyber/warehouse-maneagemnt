import { useRef, useState } from 'react';
import { useProducts } from '../../contexts/productsContext/productsProvider';
import styles from './addCategoryForm.module.scss';

const AddCategoryForm = ({ onAddCategoryBtnClickHandler }) => {
  const InputRef = useRef();
  const [inputCategory, setInputCategory] = useState();
  const { dispatch } = useProducts();
  return (
    <div className={styles.NewCategoryDiv} >
      <input
      className={styles.NewCategoryInputTag}
        ref={InputRef}
        onChange={(e) => {
          setInputCategory(e.target.value);
        }}
        type="text"
        placeholder="type your new category..."
      />

      <button
      className={styles.addNewCategoryBtn}
        onClick={() => {
          dispatch({
            type: 'addNewCategory',
            data: { value: inputCategory, label: inputCategory },
          });
          onAddCategoryBtnClickHandler(inputCategory);
        }}
      >
        +
      </button>
    </div>
  );
};

export default AddCategoryForm;
