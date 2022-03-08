import styles from './customInput.module.scss';

import { useState, forwardRef } from 'react';
import { useProducts } from '../../contexts/productsContext/productsProvider';

const useForm = (isPersian, product) => {
  const initProduct = {
    productName: product?.productName,
    date: new Date(product?.date),
    id: product?.id,
    quantity: product?.quantity,
    category: product?.category,
  };
  const initAddingForm = {
    date: new Date(),
    quantity: 1,
  };
  const { products, dispatch } = useProducts();
  const [formInfo, setFormInfo] = useState(
    product ? initProduct : initAddingForm
  );
  const [isReadOnly, setIsReadOnly] = useState(true);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      readOnly
      value={value}
      type="text"
      className={`${styles.DateInputTag} ${isPersian && styles.Persian}`}
      id={`datePicker${product && product?.id}`}
      onClick={onClick}
      ref={ref}
    ></input>
  ));

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

  const onEditBtnClickHandler = () => {
    setIsReadOnly(false);
  };

  const onUndoBtnClickHandler = () => {
    const currentProductIdx = products.AllProducts.findIndex(
      (item) => item.id === product.id
    );
    const currentProduct = products.AllProducts[currentProductIdx];
    setFormInfo({
      productName: currentProduct?.productName,
      date: new Date(currentProduct?.date),
      id: currentProduct?.id,
      quantity: currentProduct?.quantity,
      category: currentProduct?.category,
    });
    setIsReadOnly(true);
  };

  const onDeleteBtnClickHandler = (e) => {
    new Promise((resolve) => {
      resolve(true);
    })
      .then(() => {
        dispatch({
          type: 'deleteProduct',
          data: formInfo.id,
        });
      })
      .then(() => {
        dispatch({
          type: 'filter',
          filterType: products.currentFilters.category,
        });
      });
  };

  const onSaveBtnClickHandler = (e) => {
    setIsReadOnly(true);
    if (
      formInfo.date &&
      formInfo.category &&
      formInfo.productName &&
      formInfo.quantity
    ) {
      new Promise((resolve) => {
        resolve(true);
      })
        .then(() => {
          dispatch({
            type: 'editProduct',
            data: formInfo,
          });
        })
        .then(() => {
          dispatch({
            type: 'filter',
            filterType: products.currentFilters.category,
          });
        });
    } else {
      onUndoBtnClickHandler();
    }
  };

  return {
    products,
    formInfo,
    isReadOnly,
    CustomInput,
    onDatePickerChangeHandler,
    onAddCategoryBtnClickHandler,
    onQuantityInputChangeHandler,
    onProductNameInputChangHandler,
    onCategoryChangeHandler,
    onSubmitHandler,
    onEditBtnClickHandler,
    onUndoBtnClickHandler,
    onDeleteBtnClickHandler,
    onSaveBtnClickHandler,
  };
};

export default useForm;
