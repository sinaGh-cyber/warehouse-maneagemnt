import { createContext, useReducer, useContext, useEffect } from 'react';
import reducer from './reducer';

const productsContext = createContext(undefined);

const ProductsProvider = ({ children }) => {
  const initObj = {
    AllProducts: [],
    filteredProducts: [],
    categoryOptions: [{ value: false, label: 'custom category' }],
    currentFilter: 'All',
  };

  const [products, dispatch] = useReducer(reducer, initObj);

  useEffect(() => {
    if (localStorage.getItem('products')) {
      dispatch({ type: 'getDataFromLocalStorage' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

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
