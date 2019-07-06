import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber'
})
export class CardNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const replaceNumbers = (str, matches) => {
      let count = 0;
      return str.replace(/\d/g, d => matches.includes(++count) ? '*' : d);
    };

    return replaceNumbers(value, [5, 6, 7, 8, 9, 10, 11, 12]);

  }

}
