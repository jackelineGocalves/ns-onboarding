export function getDeviceType() {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent.toLowerCase();
  
    if (userAgent.includes("mobile")) {
      return "mobile";
    } else {
      return "desktop";
    }
  }
}




