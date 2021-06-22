import { reactive, warn } from "vue";
import type { App } from "vue";

interface ProxyStorage {
  get(key: string): any;
  set(Key: string, value: string): void;
  remove(key: string): void;
  clear(): void;
}

export default class Storage implements ProxyStorage {
  public nameSpace: string = "";
  public options: object = {};
  public typeMap: Map<unknown, unknown>;
  public storage: object = {};

  // 获取key值
  private _getKey = (key: string) => this.nameSpace + key;

  // 存储key带responsive的全部清空，恢复初始化状态，防止恶意串改
  static clearAll(nameSpace: string = "responsive", options: object) {
    Object.keys(options).forEach((key) => {
      const lsKey: string = `${nameSpace}-${key}`;
      if (Object.prototype.hasOwnProperty.call(window.localStorage, lsKey)) {
        window.localStorage.removeItem(lsKey);
      }
    });
  }

  // 初始化Storage
  static install(app: App<Element>, nameSpace: string, options: object) {
    if (typeof nameSpace === "object") {
      options = nameSpace;
      nameSpace = "responsive";
    }
    Storage.clearAll(nameSpace, options);
    const instance = new Storage(app, nameSpace, options);
    return instance;
  }

  // 获取key对应的value
  static getData(nameSpace: string = "responsive", key: string) {
    const lsKey = `${nameSpace}-${key}`;
    if (Object.prototype.hasOwnProperty.call(window.localStorage, lsKey)) {
      let val: any = window.localStorage.getItem(lsKey);
      try {
        val = JSON.parse(JSON.stringify(val));
      } catch (error) {
        console.log(error, val);
      }
      return val;
    }
  }

  public constructor(
    app: App<Element>,
    nameSpace: string = "responsive",
    options: any = {}
  ) {
    const self = this;
    this.nameSpace = `${nameSpace}-`;
    this.options = options;

    // 刷新页面取出本地storage
    const cacheStorage = Object.keys(window.localStorage)
      .filter((key) => new RegExp(`^${this.nameSpace}`).test(key))
      .reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key.replace(this.nameSpace, "")]: window.localStorage[key],
          }),
        {}
      );

    // 每种数据类型的默认值
    const keyMap: Array<any> = [
      [String, ""],
      [Boolean, false],
      [Number, 0],
      [Array, []],
      [Object, {}],
    ];

    const map = (this.typeMap = new Map(keyMap));

    // 利用reactive创建响应式storage（关键）
    let _storage: any = reactive(
      (this.storage = {
        // @ts-ignore
        ...Object.keys(options).reduce((acc, key) => {
          const { type, default: val } = options[key];
          if (!type) {
            warn("type of the field 'key' is required!");
            return acc;
          }

          return Object.assign(acc, {
            [key]: val === undefined ? map.get(type) : val,
          });
        }, {}),
        ...cacheStorage,
      })
    );

    if (Object.keys(_storage).length === 0) {
      warn("responsive key can not be empty empty!");
    }

    Object.keys(_storage).forEach((key) => {
      try {
        const val = _storage[key];
        this.set(key, val);
      } catch (e) {
        console.log(e);
      }

      // 把_storage中key对应的value取值代理到localStorage中去
      Reflect.defineProperty(_storage, key, {
        get: () => self.get(key),
        set: (val) => self.set(key, val),
        configurable: true,
      });
    });

    // 代理实例
    Reflect.defineProperty(app.config.globalProperties, "$storage", {
      get: () => _storage,
    });

    Reflect.defineProperty(app.config.globalProperties, "$storager", {
      get: () => self,
    });

    // @ts-ignore
    app.storage = _storage;
    // @ts-ignore
    app.storager = self;
  }

  /** 暴露公共方法
   * get      根据key获取value
   * set      根据key设置value
   * remove   根据key删除value
   * clear    清空全部
   */

  public get(key: string) {
    let val = JSON.parse(window.localStorage.getItem(this._getKey(key)));
    try {
      val = val;
    } catch (e) {
      warn(e);
    }
    return val;
  }

  public set(key: string, val: string) {
    try {
      val = typeof val === "object" ? JSON.stringify(val) : val;
      window.localStorage.setItem(this._getKey(key), val);
    } catch (e) {
      warn("storage setting fail, please check the value");
    }
  }

  public remove(key: string) {
    window.localStorage.removeItem(this._getKey(key));
  }

  public clear() {
    Object.keys(this.storage).forEach((key) => {
      const lsKey = this._getKey(key);
      if (Object.prototype.hasOwnProperty.call(window.localStorage, lsKey)) {
        window.localStorage.removeItem(lsKey);
      }
    });
  }
}
