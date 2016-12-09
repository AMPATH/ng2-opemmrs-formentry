import { HistoricalDataService } from './historical-data-service.mock';
import * as _ from 'lodash';

export class HistoricalHelperService {

  public functions: Array<string> = [];
  public HD: HistoricalDataService;
  constructor() {
    this.HD = new HistoricalDataService();
    this.functions = this.getClassMethods(this);
  }

  public evaluate(expr: string): any {

    this.functions.forEach((v) => {

      if (expr.indexOf(v) !== -1 ) {
        expr = expr.replace(new RegExp(v, 'g'), 'this.' + v);
      }

    });
    // remove duplicates TODO: not the best way
    expr = expr.replace('this.this.', 'this.');

    return eval(expr);
  }

  public setValue() {

  }

  public getDisplayValue() {

  }

  public arrayContains() {

  }

  public arrayContainsAny() {

  }

  public getClassMethods(obj) {

    let props = [];

    do {
      props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    // remove duplicates
    return props.filter((v, i, self) => {
      return self.indexOf(v) === i;
    });
  }

}
