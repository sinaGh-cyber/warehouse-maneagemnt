import { orderBy } from 'lodash';
const reducer = (state, action) => {
  switch (action.type) {
    case 'addNewProduct': {
      const stateClone = { ...state };
      const isRepetitive = stateClone.AllProducts.reduce((prev, current) => {
        if (prev === true) return true;

        return current.productName === action.data.productName;
      }, false);

      if (isRepetitive) return state;
      stateClone.AllProducts.push(action.data);
      return stateClone;
    }

    case 'addNewCategory': {
      const stateClone = { ...state };
      const isRepetitive = stateClone.categoryOptions.reduce(
        (prev, current) => {
          return prev === (current.value !== action.data.value);
        },
        false
      );
      if (isRepetitive) return state;
      stateClone.categoryOptions.push(action.data);
      return stateClone;
    }

    case 'getDataFromLocalStorage': {
      return JSON.parse(localStorage.getItem('products'));
    }

    case 'filter': {
      let filteredProducts = state.AllProducts;
      console.log(action.filterType !== 'ALL');
      if (action.filterType !== 'ALL') {
        console.log(filteredProducts, action.filterType);
        filteredProducts = state.AllProducts.filter((product) => {
          console.log(product.category === action.filterType);
          return product.category === action.filterType;
        });
      }
      filteredProducts = orderBy(
        filteredProducts,
        [state.currentFilters.sortBy],
        [state.currentFilters.sortOrder]
      );
      console.log(filteredProducts);
      return { ...state, filteredProducts: filteredProducts };
    }

    case 'setNewCategory': {
      const stateClone = { ...state };
      stateClone.currentFilters.category = action.value;
      return stateClone;
    }

    default:
      throw Error('wrong action type');
  }
};

export default reducer;
