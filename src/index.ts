import { reactive } from "./convert";
import { StorageOpts } from "./types";

export default class Storage {
  static _nameSpace = "rs-";

  static _getStaticKey = (nameSpace: string, key: string) =>
    `${nameSpace ?? this._nameSpace}${key}`;

  static install(app: any, options: StorageOpts) {
    const { nameSpace = this._nameSpace, memory } = options;
    this.clearAll(nameSpace, memory);
    return new Storage(app, options);
  }

  static clearAll(nameSpace: string, memory: object) {
    Object.keys(memory).forEach(key => {
      const alias: string = nameSpace + key;
      if (Object.prototype.hasOwnProperty.call(window.localStorage, alias)) {
        window.localStorage.removeItem(alias);
      }
    });
  }

  static get(key: string) {
    return JSON.parse(window.localStorage.getItem(key) as string);
  }

  static set(key: string, val: string) {
    val = typeof val === "object" ? JSON.stringify(val) : val;
    window.localStorage.setItem(key, val);
  }

  static getData(key: string, nameSpace?: string) {
    if (
      Object.prototype.hasOwnProperty.call(
        window.localStorage,
        this._getStaticKey(nameSpace!, key)
      )
    )
      return JSON.parse(
        window.localStorage.getItem(
          this._getStaticKey(nameSpace!, key)
        ) as string
      );
  }

  public constructor(app: any, options: StorageOpts) {
    const that = Storage;
    const { version = 3, nameSpace = that._nameSpace, memory } = options;
    const _getKey = (key: string): string => nameSpace + key;

    /**
     * Vue2 uses defineReactive to create responsive storage
     * Vue3 uses reactive to create responsive storage
     */
    let _storage: any = version === 3 ? reactive(memory) : memory;

    if (Object.keys(_storage).length === 0) console.warn("key cannot be empty");

    Object.keys(_storage).forEach(key => {
      const val = _storage[key];
      that.set(_getKey(key), val);

      Reflect.defineProperty(_storage, key, {
        get: () => that.get(_getKey(key)),
        set: val => that.set(_getKey(key), val),
        configurable: true
      });

      if (version === 2) app.util.defineReactive(_storage, key, _storage[key]);
    });

    let _target = version === 3 ? app.config.globalProperties : app.prototype;
    Reflect.defineProperty(_target, "$storage", {
      get: () => _storage
    });
  }
}
