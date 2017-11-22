import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import {Question} from "./question.model";

@Injectable()
export class ServerService {
    questions: Question[] = [];
    question: Question;
    callService:Boolean = true;
    num: number = 1;
    getQ: any;
    header = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http, private router: Router) {}
    
    getQuestions() {   
        return this.http.get('https://sheltered-beyond-55362.herokuapp.com/questions')
          .map(
            (response: Response) => {
              const me = response.json();
              this.num = 1;
              this.questions = [];
              this.callService = false;
              for (let question of me) {
                this.questions.push(new Question(
                    this.num,
                    question.question,
                    question.options,
                    question._id)
                );               
                this.num++;
              }
    
                return this.questions;
            }
          )
          .catch(
            (error: Response) => {
              return Observable.throw('Something went wrong. Could not get questions'+error);
            }
          );
      }

      addQuestion(question: any) {
        question.num = this.num;
        this.questions.push(question);
        this.getQ;
        this.num++;
        return this.http.post('https://sheltered-beyond-55362.herokuapp.com/new', JSON.stringify(question), this.getHeader()).
        map((response: Response)=> {
          return response.status;
        })
          .catch(
            (error: Response) => {
              return Observable.throw('Something went wrong. Could not add the question');
            }
          );
      }

      onEdit(question: any){
        this.question = question;
      }

      submitEdit(submQuestion: any, id: any) {
        for(var i=0; i<this.questions.length; i++){
          if(this.question.id == this.questions[i].id){
            this.questions[i].question = submQuestion.question;
            this.questions[i].options = submQuestion.options;
            break;
          }

        }
        this.getQ;
        return this.http.put('https://sheltered-beyond-55362.herokuapp.com/edit/'+id, JSON.stringify(submQuestion), this.getHeader()).
        map((response: Response)=> {
          return response.status;
        })
          .catch(
            (error: Response) => {
              return Observable.throw('Something went wrong. Edit failed');
            }
          );
      }

      delete(id: any) {
        return this.http.delete('https://sheltered-beyond-55362.herokuapp.com/delete/'+id, this.getHeader()).
        map((response: Response)=> {
          return response.status;
        })
          .catch(
            (error: Response) => {
              return Observable.throw('Something went wrong. delete failed');
            }
          );
      }

      getHeader(){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions ({ headers: headers });
        return options;
      }

      reOrderQuestions(onGet){
        this.num = 1;
        for(var q=0; q<this.questions.length; q++){
          this.questions[q].num = this.num;
          this.num++;
        }
        onGet;

      }
}