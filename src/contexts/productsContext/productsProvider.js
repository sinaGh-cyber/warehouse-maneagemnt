import { createContext, useReducer, useContext } from 'react';
import reducer from './reducer';

const productsContext = createContext(undefined);

const ProductsProvider = ({ children }) => {
  const initObj = {
    AllProducts: [],
    filteredProducts: [],
    currentFilters: [],
  };

  const [products, dispatch] = useReducer(reducer, initObj);

  return <productsContext.Provider value={{products, dispatch}} >{children}</productsContext.Provider>;
};

const useProducts = () => {
    const Context = useContext(productsContext);
    if (Context) return Context;
    throw Error('language provider issue');
  };

export default ProductsProvider;
export {useProducts} ;
