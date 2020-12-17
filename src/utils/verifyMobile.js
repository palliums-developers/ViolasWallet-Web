export function verifyMobile(location) {
  if (location) {
    if (location.search) {

        return {
          ifMobile: true,
          address: location.search.split("&")[0].split("=")[1].toUpperCase(),
          lang:location.search
        .split("&")[1]
        .split("=")[1]
        .toUpperCase()
        };
    }
  }
}