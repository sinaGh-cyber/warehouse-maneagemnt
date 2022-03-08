import { useEffect } from 'react';
import { useProducts } from '../../contexts/productsContext/productsProvider';
import Filter from '../filter/Filter';
import styles from './productList.module.scss';
import ProductItem from '../productItem/productItem';

const ProductList = () => {
  const { products, dispatch } = useProducts();
  useEffect(() => {
    dispatch({ type: 'filter', filterType: products.currentFilters.category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.productListSection}>
      <Filter />
      <div className={styles.productItems}>
        {products.filteredProducts.map((prod) => {
          return <ProductItem key={prod.id} product={prod} />;
        })}
      </div>
    </section>
  );
};

export default ProductList;
