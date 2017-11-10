import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: String): any {
    if(value == null || filterString=='')
    {
      return value;
    }
    const resultArray = [];
    for(const cons of value){
      if(cons['question'].includes(filterString)){
        resultArray.push(cons);
      }
      for(const opt of cons['options'])
      {
        if(opt['oValue'].includes(filterString)){
          resultArray.push(cons);
        }
      }
    }
    return resultArray;
  }

}
