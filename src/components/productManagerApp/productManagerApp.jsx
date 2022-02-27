import './productManagerApp.module.scss';

import ProductList from '../productList/ProductList';
import Filter from '../filter/Filter';
import AddingProductForm from '../addingProductForm/addingProductForm';

const ProductManagerApp = () => {
  return (
    <>
      <AddingProductForm />
      <Filter />
      <ProductList />
    </>
  );
};

export default ProductManagerApp;
