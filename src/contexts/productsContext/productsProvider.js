import {
  createContext,
  useReducer,
  useContext,
  useEffect,
} from 'react';
import reducer from './reducer';

const productsContext = createContext(undefined);

const ProductsProvider = ({ children }) => {
  const initObj = {
    AllProducts: [],
    filteredProducts: [],
    categoryOptions: [],
    currentFilters: { category: 'ALL', sortBy: 'date', sortOrder: 'asc' },
  };

  const [products, dispatch] = useReducer(reducer, initObj);


  useEffect(() => {
    if (products.AllProducts.length && products.categoryOptions.length) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (localStorage.getItem('products')) {
      dispatch({ type: 'getDataFromLocalStorage' });
    }
  }, []);
  return (
    <productsContext.Provider value={{ products, dispatch }}>
      {children}
    </productsContext.Provider>
  );
};

const useProducts = () => {
  const Context = useContext(productsContext);
  if (Context) return Context;
  throw Error('language provider issue');
};

export default ProductsProvider;
export { useProducts };
