export function verifyMobile(location) {
  if (location && location.search) {
    let temp1 = "";
    if (location.search[0] === "?") {
      temp1 = location.search.split("?")[1];
    }
    let temp = temp1.split("&");
    let result = selectItems(temp);
    if (result.address === "" || result.address.length === 32) {
      return result;
    }
  }else{
    return { ifMobile: false,lang:localStorage.getItem('local')};
  }
}

function selectItems(temp_arr) {
  let temp = {
    ifMobile: true,
    address: "",
    lang: "",
  };
  for (let i in temp_arr) {
    let temp1 = temp_arr[i].split("=");
    if (temp1[0] === "address") {
      temp.address = temp1[1];
    } else if (temp1[0] === "language") {
      temp.lang = temp1[1];
    }
  }
  return temp;
}
