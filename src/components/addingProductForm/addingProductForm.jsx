import styles from './addingProductForm.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

import DatePicker from 'react-datepicker';
import { useState, forwardRef } from 'react';
import { useProducts } from '../../contexts/productsContext/productsProvider';
import AddCategoryForm from '../addCategoryForm/addCategoryForm';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <input
    readOnly
    type="text"
    className={styles.DateInputTag}
    id="datePicker"
    defaultValue={value}
    onClick={onClick}
    ref={ref}
  ></input>
));

const AddingProductForm = () => {
  const { products, dispatch } = useProducts();
  const [formInfo, setFormInfo] = useState({
    date: new Date(),
    quantity: 1,
    id: new Date().getTime(),
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
      dispatch({ type: 'addNewProduct', data: formInfo });
    }
  };

  return (
    <section className={styles.AddProductForm}>
      <form onSubmit={onSubmitHandler} className={styles.FormTag}>
        <div className={styles.ProductNameDiv}>
          <label htmlFor="productNameInputTag">Product Name: </label>
          <input
            onChange={onProductNameInputChangHandler}
            id="productNameInputTag"
            type="text"
            className={styles.productNameInputTag}
          />
        </div>

        <div className={styles.QuantityDiv}>
          <label htmlFor="quantityInputTag">quantity: </label>
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
          <label htmlFor="datePicker">Expire date: </label>
          <div className={styles.calenderInput}>
            <DatePicker
              selected={formInfo.date}
              customInput={<CustomInput />}
              onChange={onDatePickerChangeHandler}
            />
          </div>
        </div>

        <div className={styles.categoryDiv}>
          <label htmlFor="CategoryInputId">Category: </label>
          <div className={styles.categoryInputContainer}>
            <Select
              inputId="CategoryInputId"
              placeholder="select a category..."
              Value={formInfo.category}
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

        <div className={styles.submitDiv}>
          <input className={styles.submitBtn} type="submit" value="+" />
        </div>
      </form>
    </section>
  );
};

export default AddingProductForm;
