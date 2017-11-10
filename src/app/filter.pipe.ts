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
      var isPosted = false;
      if(cons['question'].includes(filterString)){
        resultArray.push(cons);
        isPosted = true;
      }
      for(const opt of cons['options'])
      {
        if(opt['oValue'].includes(filterString) && !isPosted){
          resultArray.push(cons);
        }
      }
    }
    return resultArray;
  }

}
