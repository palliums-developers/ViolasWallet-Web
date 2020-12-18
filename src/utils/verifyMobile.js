export function verifyMobile(location) {
  if (location) {
    if (location.search) {
        let address = location.search.split("&")[0].split("=")[1].toUpperCase();
        if(address == "" || address.length == 32){
            return {
            ifMobile: true,
            address: address,
            lang: location.search.split("&")[1].split("=")[1].toUpperCase(),
            };
        }else{
            return;
        }
        
    }
  }
}