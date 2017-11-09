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
   console.log('value: '+JSON.stringify(value));
   console.log('value: '+filterString);
    const resultArray = [];
    for(const cons of value){
      console.log(cons);
      console.log(cons['question']);
      if(cons['question'].includes(filterString)){
        resultArray.push(cons);
      }
      for(const opt of cons['options'])
      {
        console.log(opt['oValue']);
        if(opt['oValue'].includes(filterString)){
          resultArray.push(cons);
        }
      }
    }
    return resultArray;
  }

}
