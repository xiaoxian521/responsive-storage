import { __assign } from "tslib";
import { reactive, warn } from "vue";
var Storage = /** @class */ (function () {
    function Storage(app, nameSpace, options) {
        var _this = this;
        if (nameSpace === void 0) { nameSpace = "responsive"; }
        if (options === void 0) { options = {}; }
        this.nameSpace = "";
        this.options = {};
        this.storage = {};
        // 获取key值
        this._getKey = function (key) { return _this.nameSpace + key; };
        var self = this;
        this.nameSpace = nameSpace + "-";
        this.options = options;
        // 刷新页面取出本地storage
        var cacheStorage = Object.keys(window.localStorage)
            .filter(function (key) { return new RegExp("^" + _this.nameSpace).test(key); })
            .reduce(function (acc, key) {
            var _a;
            return Object.assign(acc, (_a = {},
                _a[key.replace(_this.nameSpace, "")] = window.localStorage[key],
                _a));
        }, {});
        // 每种数据类型的默认值
        var keyMap = [
            [String, ""],
            [Boolean, false],
            [Number, 0],
            [Array, []],
            [Object, {}],
        ];
        var map = (this.typeMap = new Map(keyMap));
        // 利用reactive创建响应式storage（关键）
        var _storage = reactive((this.storage = __assign(__assign({}, Object.keys(options).reduce(function (acc, key) {
            var _a;
            var _b = options[key], type = _b.type, val = _b.default;
            if (!type) {
                warn("type of the field 'key' is required!");
                return acc;
            }
            return Object.assign(acc, (_a = {},
                _a[key] = val === undefined ? map.get(type) : val,
                _a));
        }, {})), cacheStorage)));
        if (Object.keys(_storage).length === 0) {
            warn("responsive key can not be empty empty!");
        }
        Object.keys(_storage).forEach(function (key) {
            try {
                var val = _storage[key];
                _this.set(key, val);
            }
            catch (e) {
                console.log(e);
            }
            // 把_storage中key对应的value取值代理到localStorage中去
            Reflect.defineProperty(_storage, key, {
                get: function () { return self.get(key); },
                set: function (val) { return self.set(key, val); },
                configurable: true,
            });
        });
        // 代理实例
        Reflect.defineProperty(app.config.globalProperties, "$storage", {
            get: function () { return _storage; },
        });
        Reflect.defineProperty(app.config.globalProperties, "$storager", {
            get: function () { return self; },
        });
        // @ts-ignore
        app.storage = _storage;
        // @ts-ignore
        app.storager = self;
    }
    // 存储key带responsive的全部清空，恢复初始化状态，防止恶意串改
    Storage.clearAll = function (nameSpace, options) {
        if (nameSpace === void 0) { nameSpace = "responsive"; }
        Object.keys(options).forEach(function (key) {
            var lsKey = nameSpace + "-" + key;
            if (Object.prototype.hasOwnProperty.call(window.localStorage, lsKey)) {
                window.localStorage.removeItem(lsKey);
            }
        });
    };
    // 初始化Storage
    Storage.install = function (app, nameSpace, options) {
        if (typeof nameSpace === "object") {
            options = nameSpace;
            nameSpace = "responsive";
        }
        Storage.clearAll(nameSpace, options);
        var instance = new Storage(app, nameSpace, options);
        return instance;
    };
    // 获取key对应的value
    Storage.getData = function (nameSpace, key) {
        if (nameSpace === void 0) { nameSpace = "responsive"; }
        var lsKey = nameSpace + "-" + key;
        if (Object.prototype.hasOwnProperty.call(window.localStorage, lsKey)) {
            var val = window.localStorage.getItem(lsKey);
            try {
                val = JSON.parse(val);
            }
            catch (error) {
                console.log(error, val);
            }
            return val;
        }
    };
    /** 暴露公共方法
     * get      根据key获取value
     * set      根据key设置value
     * remove   根据key删除value
     * clear    清空全部
     */
    Storage.prototype.get = function (key) {
        var val = window.localStorage.getItem(this._getKey(key));
        try {
            val = JSON.parse(val);
        }
        catch (e) {
            warn(e);
        }
        return val;
    };
    Storage.prototype.set = function (key, val) {
        try {
            val = typeof val === "object" ? JSON.stringify(val) : val;
            window.localStorage.setItem(this._getKey(key), val);
        }
        catch (e) {
            warn("storage setting fail, please check the value");
        }
    };
    Storage.prototype.remove = function (key) {
        window.localStorage.removeItem(this._getKey(key));
    };
    Storage.prototype.clear = function () {
        var _this = this;
        Object.keys(this.storage).forEach(function (key) {
            var lsKey = _this._getKey(key);
            if (Object.prototype.hasOwnProperty.call(window.localStorage, lsKey)) {
                window.localStorage.removeItem(lsKey);
            }
        });
    };
    return Storage;
}());
export default Storage;
