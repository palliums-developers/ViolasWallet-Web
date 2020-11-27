let initState = {
  detailAddr: "",
  name: "",
  eth:null
};

let ListReducer = (state = initState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'GETETH':
            return { eth: action.payload };
        default:
            return state;
    }
};
export default ListReducer;