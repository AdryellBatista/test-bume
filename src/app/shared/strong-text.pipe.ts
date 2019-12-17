import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'strongStr' })
export class StrongStrPipe implements PipeTransform {
  transform(value: string, before: any, objParam?: string): string {
    let output = '';
    if (before) {
      value = value.toLowerCase();
      let position: any;
      const arrPosition = [];
      const arrValue = value.split(' ');
      const arrBefore = before.split(' ');
      if (typeof before === 'object') {
        position = value.indexOf(before[objParam].toLowerCase());
      } else {
        position = value.indexOf(before.toLowerCase());
        arrValue.forEach( element => {
          arrPosition.push(element.indexOf(before.toLowerCase()));
        });
      }
      if (position >= 0) {
        if (typeof before === 'object') {
          // tslint:disable-next-line: max-line-length
          output = [value.slice(0, position), '<strong>' + before[objParam].toLowerCase() + '</strong>', value.slice(position + before[objParam].length)].join('');
        } else {
          arrValue.forEach( (element, i) => {
            if (arrPosition[i] >= 0) {
              // tslint:disable-next-line: max-line-length
              output += [element.slice(0, arrPosition[i]), '<strong>' + before.toLowerCase() + '</strong>', element.slice(arrPosition[i] + before.length)].join('');
            } else {
              output += element;
            }
            output += ' ';
          });
        }
      } else {
        output = value;
      }
    } else {
      output = value;
    }
    return output;
  }
}
