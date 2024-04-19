export class LocalStorage {
  constructor(public key: string, public initData: string) {}

  isExist() {
    return localStorage.getItem(this.key) !== null;
  }

  get() {
    if (localStorage.getItem(this.key)) {
      return localStorage.getItem(this.key);
    } else {
      localStorage.setItem(this.key, this.initData);
    }
    return this.initData;
  }

  set(data: string) {
    localStorage.setItem(this.key, data);
  }
}
