import { Component, OnInit } from '@angular/core';
import {Question} from "../question.model";
import {Options} from "../options.model";
import {ServerService} from "../server.service";
import {Validators,FormControl, FormGroup, FormArray, NgForm} from "@angular/forms";
import {isNullOrUndefined, isUndefined, isNull} from "util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  question: Question = null;;
  questionForm: FormGroup;
  submitCounter: number;
  selectedAnswer: String;
  helpBlock = false;
  constructor(private server: ServerService, private router: Router) { }

  ngOnInit() {
    if(!isNullOrUndefined(this.server.question)){
    this.question = this.server.question;
    this.submitCounter = 0;
      this.questionForm = new FormGroup({
        'question' : new FormControl(this.question.question, Validators.required),
        'optionValueList' : new FormArray([])
        });
        for(var k=0; k<this.question.options.length; k++){
          this.addOptionToArray(this.question.options[k]);
        }
      }
      else{
        this.router.navigate(['/']);
      }      
  }

  onAddTextBox(){
    const option = new FormGroup({
      optionSelect : new FormControl(null),
      optionValue : new FormControl(null)
    });
   (<FormArray>this.questionForm.get('optionValueList')).push(option);
  }

  addOptionToArray(thisOption:Options){
    const option = new FormGroup({
      optionSelect : new FormControl(thisOption.isCorrect),
      optionValue : new FormControl(thisOption.oValue)
    });
    if(option.value.optionSelect==true){
        this.selectedAnswer = thisOption.oValue;
    }
    
   (<FormArray>this.questionForm.get('optionValueList')).push(option);
  }

  onRadioClick(optC: any){
    this.selectedAnswer=optC.value.optionValue;
  }

  onRemove(i:any){if(i>0){
    (<FormArray>this.questionForm.get('optionValueList')).removeAt(i);
    }
  }

  onReturn(){
    this.router.navigate(['/']);
  }

  onSubmit(){
    this.submitCounter++;
    if(this.questionForm.get('question').valid && 
    this.questionForm.get('optionValueList').valid){
      this.helpBlock = true;
      var question = this.questionForm.value.question;
      var id = this.question.id;
      var options = [];
      var optionList = this.questionForm.value.optionValueList;
      for(var i=0; i<optionList.length; i++){
        if(optionList[i].optionValue===this.selectedAnswer){
          options.push({
            oValue: optionList[i].optionValue,
            isCorrect: true
          })
        }
        else{
          options.push({
            oValue: optionList[i].optionValue,
            isCorrect: false
          })
        }
      }
      var submitQuestion = {
        question,
        options
      };
      this.server.submitEdit(submitQuestion, id).subscribe((status)=>{
          this.router.navigate(['/']);
      });    
    }
  }

}
