import styles from './productItem.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import { ImCross, ImCheckmark, ImUndo2, ImPencil } from 'react-icons/im';

import useForm from '../../customHooks/useForm/useForm';
import AddCategoryForm from '../addCategoryForm/addCategoryForm';
import WithLanguage from '../../hoc/withLanguage';

const ProductItem = ({ product, isPersian, currentLanguageTexts }) => {
  const {
    products,
    formInfo,
    isReadOnly,
    CustomInput,
    onDatePickerChangeHandler,
    onAddCategoryBtnClickHandler,
    onQuantityInputChangeHandler,
    onProductNameInputChangHandler,
    onCategoryChangeHandler,
    onEditBtnClickHandler,
    onUndoBtnClickHandler,
    onDeleteBtnClickHandler,
    onSaveBtnClickHandler,
  } = useForm(isPersian, product);

  return (
    <section
      className={`${styles.AddProductForm} ${
        isPersian ? styles.PersianFlex : styles.EnglishFlex
      }`}
    >
      <div className={styles.FormTag}>
        <div className={styles.ProductNameDiv}>
          <label htmlFor={`productNameInputTag${product.id}`}>
            {currentLanguageTexts.ProductName}{' '}
          </label>
          <input
            readOnly={isReadOnly}
            value={formInfo.productName}
            onChange={onProductNameInputChangHandler}
            id={`productNameInputTag${product.id}`}
            type="text"
            className={styles.productNameInputTag}
          />
        </div>

        <div className={styles.QuantityDiv}>
          <label htmlFor={`quantityInputTag${product.id}`}>
            {currentLanguageTexts.quantity}
          </label>
          <input
            readOnly={isReadOnly}
            type="number"
            min="1"
            id={`quantityInputTag${product.id}`}
            className={styles.quantityInputTag}
            value={formInfo.quantity}
            onChange={onQuantityInputChangeHandler}
          />
        </div>

        <div className={styles.datePickerDiv}>
          <label htmlFor={`datePicker${product.id}`}>
            {currentLanguageTexts.expireDate}
          </label>
          <div className={styles.calenderInput}>
            <DatePicker
              readOnly={isReadOnly}
              value={formInfo.date}
              selected={formInfo.date}
              customInput={<CustomInput />}
              dateFormat="dd/MM/yyyy"
              onChange={onDatePickerChangeHandler}
            />
          </div>
        </div>

        <div className={styles.categoryDiv}>
          <label htmlFor={`CategoryInputId${product.id}`}>
            {currentLanguageTexts.category}
          </label>
          <div className={styles.categoryInputContainer}>
            <Select
              isDisabled={isReadOnly}
              inputId={`CategoryInputId${product.id}`}
              placeholder={currentLanguageTexts.selectACategory}
              value={{ value: formInfo.category, label: formInfo.category }}
              onChange={onCategoryChangeHandler}
              options={products.categoryOptions}
              className={styles.selectCategory}
            />
          </div>

          {formInfo.category === false && (
            <AddCategoryForm
              onAddCategoryBtnClickHandler={onAddCategoryBtnClickHandler}
            />
          )}
        </div>

        <div className={styles.ProductButtons}>
          {isReadOnly ? (
            <>
              <button
                onClick={onEditBtnClickHandler}
                className={styles.editBtn}
              >
                <ImPencil />
              </button>
              <button
                onClick={onDeleteBtnClickHandler}
                className={styles.deleteBtn}
              >
                <ImCross />
              </button>
            </>
          ) : (
            <>
              <button onClick={onSaveBtnClickHandler} className={styles.saveBtn}>
                <ImCheckmark />
              </button>
              <button
                onClick={onUndoBtnClickHandler}
                className={styles.undoBtn}
              >
                <ImUndo2 />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default WithLanguage(ProductItem);
