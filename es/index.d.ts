import type { App } from "vue";
export declare interface ProxyStorage {
    get(key: string): unknown;
    set(Key: string, value: string): void;
    remove(key: string): void;
    clear(): void;
}
export default class Storage implements ProxyStorage {
    nameSpace: string;
    options: object;
    typeMap: Map<unknown, unknown>;
    storage: object;
    _getKey: (key: string) => string;
    static clearAll(nameSpace: string, options: object): void;
    static install(app: App<Element>, nameSpace: string, options: object): Storage;
    static getData(nameSpace: string, key: string): any;
    constructor(app: App<Element>, nameSpace?: string, options?: any);
    /** 暴露公共方法
     * get      根据key获取value
     * set      根据key设置value
     * remove   根据key删除value
     * clear    清空全部
     */
    get(key: string): string;
    set(key: string, val: string): void;
    remove(key: string): void;
    clear(): void;
}
