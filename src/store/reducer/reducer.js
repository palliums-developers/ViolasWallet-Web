let initState = {
    display: false,
    display1: false,
    display2: false,
    detailData:{},
    addCurrencyList2: [],
    balance1: 0,
    balance2: 0,
    balance3: 0,
}

let ListReducer = (state = initState, action) => {
    let display = state.display;
    let display1 = state.display;
    let display2 = state.display;
    let detailData = state.detailData;
    let balance3 = state.balance3;
    console.log(action.payload)
    switch (action.type) {
        case 'DISPLAY':
            return { display: action.payload };
        case 'DISPLAY1':
            return { display1: action.payload };
        case 'DISPLAY2':
            return { display2: action.payload.display2, detailData: action.payload.detailData };
        
        
        default:
            return state;
    }
};
export default ListReducer;