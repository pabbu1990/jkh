import { Pipe, PipeTransform } from '@angular/core';
import {Question} from "./question.model";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<Question>, sortBy: String): Array<Question> {
    array.sort((a: any, b: any) => {
      if (a['num'] < b['num']) {
        return (sortBy==='Desc') ? -1 : 1 ;
      } else if (a['num'] > b['num']) {
        return (sortBy==='Desc')? 1 : -1 ;
      } else {
        return 0;
      }
    });
    return array;
  }

}
