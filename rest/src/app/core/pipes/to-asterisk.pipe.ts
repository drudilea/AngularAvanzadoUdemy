import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toAsterisk'
})
export class ToAsteriskPipe implements PipeTransform {

  transform(value: string): string {
    let newStr = '';
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < value.length; i++) {
      newStr += '*';
    }
    return newStr;
  }

}
