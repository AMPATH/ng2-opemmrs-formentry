var DataSources = /** @class */ (function () {
    function DataSources() {
        this._dataSources = {};
    }
    Object.defineProperty(DataSources.prototype, "dataSources", {
        get: function () {
            return this._dataSources;
        },
        enumerable: true,
        configurable: true
    });
    DataSources.prototype.registerDataSource = function (key, dataSource, unWrap) {
        if (unWrap === void 0) { unWrap = false; }
        if (unWrap) {
            // tslint:disable-next-line:forin
            for (var o in dataSource) {
                console.log('registering', o, dataSource[o]);
                this.registerDataSource(o, dataSource[o], false);
            }
        }
        if (this.dataSources[key]) {
            console.warn('Overriding registered data source', key);
        }
        this._dataSources[key] = dataSource;
    };
    DataSources.prototype.clearDataSource = function (key) {
        delete this._dataSources[key];
    };
    return DataSources;
}());
export { DataSources };
//# sourceMappingURL=data-sources.js.map