let initState = {
    display:false,
    display1:false,
    address:'',
    amount:0
}

let ListReducer = (state = initState, action) => {
  let display = state.display;
  let display1 = state.display1;
  let address = state.address;
  let amount = state.amount;
  switch (action.type) { 
      case 'DISPLAY':
          return { display:action.params }  
      case 'DISPLAY1':
          return { display1: action.params.type, address: action.params.address, amount: action.params.amount }  
      default:
          return state;
  }
};
export default ListReducer;