import styles from './addingProductForm.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

import DatePicker from 'react-datepicker';
import { useState, forwardRef } from 'react';
import { useProducts } from '../../contexts/productsContext/productsProvider';
import AddCategoryForm from '../addCategoryForm/addCategoryForm';
import WithLanguage from '../../hoc/withLanguage';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <input
    readOnly
    value={value}
    type="text"
    className={styles.DateInputTag}
    id="datePicker"
    onClick={onClick}
    ref={ref}
  ></input>
));

const AddingProductForm = ({ isPersian, currentLanguageTexts }) => {
  const { products, dispatch } = useProducts();
  const [formInfo, setFormInfo] = useState({
    date: new Date(),
    quantity: 1,
  });

  const onDatePickerChangeHandler = (date) => {
    setFormInfo({ ...formInfo, date: date });
  };

  const onAddCategoryBtnClickHandler = (categoryVal) => {
    setFormInfo({ ...formInfo, category: categoryVal });
  };

  const onQuantityInputChangeHandler = (e) => {
    setFormInfo({ ...formInfo, quantity: +e.target.value });
  };

  const onProductNameInputChangHandler = (e) => {
    setFormInfo({ ...formInfo, productName: e.target.value });
  };

  const onCategoryChangeHandler = (e) => {
    setFormInfo({ ...formInfo, category: e.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      formInfo.date &&
      formInfo.category &&
      formInfo.productName &&
      formInfo.quantity
    ) {
      console.log(formInfo.date);
      new Promise((resolve) => {
        resolve(true);
      })
        .then(() => {
          dispatch({
            type: 'addNewProduct',
            data: { ...formInfo, id: new Date().getTime() },
          });
        })
        .then(() => {
          dispatch({
            type: 'filter',
            filterType: products.currentFilters.category,
          });
        });
    }
  };

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
              Value={formInfo.category}
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
