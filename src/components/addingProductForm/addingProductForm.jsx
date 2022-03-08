import styles from './addingProductForm.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

import DatePicker from 'react-datepicker';

import useForm from '../../customHooks/useForm/useForm';
import AddCategoryForm from '../addCategoryForm/addCategoryForm';
import WithLanguage from '../../hoc/withLanguage';

const AddingProductForm = ({ isPersian, currentLanguageTexts }) => {
  const {
    products,
    formInfo,
    CustomInput,
    onDatePickerChangeHandler,
    onAddCategoryBtnClickHandler,
    onQuantityInputChangeHandler,
    onProductNameInputChangHandler,
    onCategoryChangeHandler,
    onSubmitHandler,
  } = useForm(isPersian);

  return (
    <section
      className={`${styles.AddProductForm} ${
        isPersian ? styles.PersianFlex : styles.EnglishFlex
      }`}
    >
      <form onSubmit={onSubmitHandler} className={styles.FormTag}>
        <div className={styles.ProductNameDiv}>
          <label htmlFor="productNameInputTag">
            {currentLanguageTexts.ProductName}{' '}
          </label>
          <input
            onChange={onProductNameInputChangHandler}
            id="productNameInputTag"
            type="text"
            className={styles.productNameInputTag}
          />
        </div>

        <div className={styles.QuantityDiv}>
          <label htmlFor="quantityInputTag">
            {currentLanguageTexts.quantity}
          </label>
          <input
            type="number"
            min="1"
            id="quantityInputTag"
            className={styles.quantityInputTag}
            value={formInfo.quantity}
            onChange={onQuantityInputChangeHandler}
          />
        </div>

        <div className={styles.datePickerDiv}>
          <label htmlFor="datePicker">{currentLanguageTexts.expireDate}</label>
          <div className={styles.calenderInput}>
            <DatePicker
              value={formInfo.date}
              selected={formInfo.date}
              customInput={<CustomInput />}
              dateFormat="dd/MM/yyyy"
              onChange={onDatePickerChangeHandler}
            />
          </div>
        </div>

        <div className={styles.categoryDiv}>
          <label htmlFor="CategoryInputId">
            {currentLanguageTexts.category}
          </label>
          <div className={styles.categoryInputContainer}>
            <Select
              inputId="CategoryInputId"
              placeholder={currentLanguageTexts.selectACategory}
              Value={{ value: formInfo.category, label: formInfo.category }}
              onChange={onCategoryChangeHandler}
              options={[
                ...products.categoryOptions,
                { value: false, label: 'custom category' },
              ]}
              className={styles.selectCategory}
            />
          </div>

          {formInfo.category === false && (
            <AddCategoryForm
              onAddCategoryBtnClickHandler={onAddCategoryBtnClickHandler}
            />
          )}
        </div>

        <div className={styles.submitDiv}>
          <input className={styles.submitBtn} type="submit" value="+" />
        </div>
      </form>
    </section>
  );
};

export default WithLanguage(AddingProductForm);
