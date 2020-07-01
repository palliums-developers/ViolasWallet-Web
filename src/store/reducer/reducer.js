let initState = {
    display: false,
    display1: false,
    display2: false,
    detailData: {},
    showExcode: false,
    visible: false,
    visible1: false,
    showpooling: false,
    detailAddr:'',
    name:''
}

let ListReducer = (state = initState, action) => {
    let display = state.display;
    let display1 = state.display;
    let display2 = state.display;
    let detailData = state.detailData;
    let showExcode = state.showExcode;
    let visible = state.visible;
    let visible1 = state.visible1;
    // console.log(action.payload)
    switch (action.type) {
        case 'DISPLAY':
            return { display: action.payload };
        case 'DISPLAY1':
            return { display1: action.payload.disType, detailAddr: action.payload.detailAddr, name: action.payload.name};
        case 'DISPLAY2':
            return { display2: action.payload.display2, detailData: action.payload.detailData };
        case 'EXCHANGE':
            return { showExcode: action.params.type }
        case 'VISIBLE':
            return { visible: action.payload }
        case 'VISIBLE1':
            return { visible1: action.payload }
        case 'SHOWPOOL':
            return { showpooling: action.payload } 
        default:
            return state;
    }
};
export default ListReducer;