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

      if (state.currentFilters.category !== 'ALL') {
        filteredProducts = state.AllProducts.filter((product) => {
          return product.category === state.currentFilters.category;
        });
      }
      filteredProducts = orderBy(
        filteredProducts,
        [state.currentFilters.sortBy],
        [state.currentFilters.sortOrder]
      );
      return { ...state, filteredProducts: filteredProducts };
    }

    case 'setNewCategory': {
      const stateClone = { ...state };
      stateClone.currentFilters.category = action.value;
      return stateClone;
    }

    case 'setNewSortOrder': {
      const stateClone = { ...state };
      stateClone.currentFilters.sortOrder = action.value;
      return stateClone;
    }

    case 'setNewSortBy': {
      const stateClone = { ...state };
      stateClone.currentFilters.sortBy = action.value;
      return stateClone;
    }

    case 'deleteProduct': {
      const stateClone = { ...state };
      stateClone.AllProducts = stateClone.AllProducts.filter((product) => {
        return product.id !== action.data;
      });
      return stateClone;
    }

    case 'editProduct': {
      const stateClone = { ...state };
      const currentProductIdx = stateClone.AllProducts.findIndex(
        (product) => product.id === action.data.id
      );
      stateClone.AllProducts[currentProductIdx] = action.data;
      return stateClone;
    }

    default:
      throw Error('wrong action type');
  }
};

export default reducer;
