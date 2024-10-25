export function setStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getStorage(key: string) {
  return localStorage.getItem(key);
}