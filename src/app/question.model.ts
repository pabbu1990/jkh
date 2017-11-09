import { Options} from './options.model';

export class Question{
    question : String;
    options: Options[];
    num: number;
    id: String;

    constructor(num: number, question: string, options: Options[], id: String){
    this.num = num;
    this.question=question;
    this.options=options;
    this.id = id;
    }
}
        
    
