const reducer = (state, action) => {
  switch (action.type) {
    case 'addNewProduct': {
      const stateClone = { ...state };
      const isRepetitive = stateClone.AllProducts.reduce((prev, current) => {
        console.log(prev, 'before');
        if (prev === true) return true;

        return current.productName === action.data.productName;
      }, false);

      console.log(isRepetitive);
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

    default:
      throw Error('wrong action type');
  }
};

export default reducer;
