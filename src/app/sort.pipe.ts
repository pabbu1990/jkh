import { Pipe, PipeTransform } from '@angular/core';
import {Question} from "./question.model";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<Question>, sortType: string, sortBy: string): Array<Question> {
    array.sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) {
        return (sortType==='Desc') ? -1 : 1 ;
      } else if (a[sortBy] > b[sortBy]) {
        return (sortType==='Desc')? 1 : -1 ;
      } else {
        return 0;
      }
    });
    return array;
  }

}
