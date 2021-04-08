export function verifyMobile(location) {
  if (location && location.search) {
    let temp1 = "";
    if (location.search[0] === "?") {
      temp1 = location.search.split("?")[1];
    }
    let temp = temp1.split("&");
    let result = selectItems(temp);
    // alert(JSON.stringify(result));
    if (result.address === "" || result.address.length === 32) {
      return result;
    }
  } else {
    return { ifMobile: false, lang: localStorage.getItem("local") };
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
      let temp_l = "";
      if (temp1[1] === "cn" || temp1[1] === "zh") {
        temp_l = "CN";
      } else if (temp1[1] === "en") {
        temp_l = "EN";
      } else {
        temp_l = temp1[1];
      }
      temp.lang = temp_l;
    }
  }
  return temp;
}
