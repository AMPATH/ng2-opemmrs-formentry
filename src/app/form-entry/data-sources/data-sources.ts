export class DataSources {
    private _dataSources: any = {};
    constructor() {
    }

    get dataSources(): any {
        return this._dataSources;
    }

    registerDataSource(key: string, dataSource: any, unWrap = false) {
        if (unWrap) {
            // tslint:disable-next-line:forin
            for (let o in dataSource) {
                console.log('registering', o, dataSource[o]);
                this.registerDataSource(o, dataSource[o], false);
            }
        }
        if (this.dataSources[key]) {
            console.warn('Overriding registered data source', key);
        }
        this._dataSources[key] = dataSource;
    }

    clearDataSource(key: string) {
        delete this._dataSources[key];
    }

}
