import { Pipe, PipeTransform } from '@angular/core';

import { DICTIONARY } from './dictionary';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  transform(input: string): string {
    return DICTIONARY[input];
  }
}