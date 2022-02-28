const reducer = (state, action) => {
  switch (action.type) {
    case 'addNewProduct': {
        console.log('dispatch(addNewProduct)');
      return;
    }

    default:
      throw Error('wrong action type');
  }
};

export default reducer;
