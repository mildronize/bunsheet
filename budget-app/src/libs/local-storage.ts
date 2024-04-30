export class LocalStorage<T> {
  constructor(public key: string, public initData: T) {
    this.key = `bunsheet-cache-${key}`;
  }

  isExist() {
    return localStorage.getItem(this.key) !== null;
  }
  get(): T {
    if (localStorage.getItem(this.key)) {
      return JSON.parse(localStorage.getItem(this.key)!) as T;
    } else {
      localStorage.setItem(this.key, JSON.stringify(this.initData));
    }
    return this.initData;
  }

  set(data: T) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
