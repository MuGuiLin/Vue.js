import md5 from "md5";

export function md5encode(input: string) {
  return md5(input);
}

export function ksort(o: any) {
  //参数ksort排序(key按照字母顺序)
  let sorted: Record<string, any> = {},
    keys = Object.keys(o);
  keys.sort();
  keys.forEach((key) => {
    sorted[key] = o[key];
  });
  return sorted;
}

export function getSign(pa: Record<string, any>) {
  //参数md5加签
  const secret = "28c8edde3d61a0411511d3b1866f0636";
  let headerObj = {
    platform: "mobile",
    version: "2.31.0",
    nonce: Math.random().toString(36).slice(-8),
    timestamp: Math.floor(Date.now() / 1000),
    "Api-Version": "v1",
  };
  pa = {
    ...pa,
    ...headerObj,
  };
  pa = ksort(pa);
  let sign = "";
  for (let key in pa) {
    if (pa[key] != undefined) {
      sign = sign + key + "=" + pa[key] + "&";
    }
  }
  sign = sign + secret;
  sign = md5encode(md5encode(sign));
  return {
    ...headerObj,
    sign,
  };
}

function setCookie(name: string, value: string, days: number = 31): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;domain=kankanews.com`;
}

function removeCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=kankanews.com`;
}

export function getToken(TokenKey: string): string {
  if ('userToken' === TokenKey) {
    return '896b80bfbdaf3632527d799d5fc78219'
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${TokenKey}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || "";
  return "";
}

export function setToken(TokenKey: string, token: string, expires: number = 31): boolean | undefined {
  try {
    setCookie(TokenKey, token, expires);
    return true;
  } catch (error) {
    console.warn("Failed to set token:", error);
    return false;
  }
}

export function removeToken(TokenKey: string): boolean | undefined {
  try {
    removeCookie(TokenKey);
    return true;
  } catch (error) {
    console.warn("Failed to remove token:", error);
    return false;
  }
}
