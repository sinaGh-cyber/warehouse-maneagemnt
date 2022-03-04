import './productManagerApp.module.scss';

import ProductList from '../productList/ProductList';

import AddingProductForm from '../addingProductForm/addingProductForm';

const ProductManagerApp = () => {
  return (
    <>
      <AddingProductForm />
      <ProductList />
    </>
  );
};

export default ProductManagerApp;
