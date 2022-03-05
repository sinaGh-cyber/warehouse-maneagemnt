import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
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

  const isMounted = useRef(false);

  useEffect(() => {
    if (localStorage.getItem('products')) {
      dispatch({ type: 'getDataFromLocalStorage' });
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('products', JSON.stringify(products));
    } else {
      isMounted.current = true;
    }
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
