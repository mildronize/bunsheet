export class LocalStorage<T> {
  constructor(public key: string, public initData: T) {
    this.key = `bunsheet-cache-${key}`;
  }

  isExist() {
    if (typeof window === "undefined") {
      return false;
    }
    return localStorage.getItem(this.key) !== null;
  }
  get(): T {
    if (typeof window === "undefined") {
      return this.initData;
    }
    if (localStorage.getItem(this.key)) {
      return JSON.parse(localStorage.getItem(this.key)!) as T;
    } else {
      localStorage.setItem(this.key, JSON.stringify(this.initData));
    }
    return this.initData;
  }

  set(data: T) {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
