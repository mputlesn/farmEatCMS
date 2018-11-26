import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'geo'
})
export class GeoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
