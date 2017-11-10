import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {Validators,FormControl, FormGroup, FormArray, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {isNull, isNullOrUndefined, isUndefined} from "util";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  textBoxes: number[] = [];
  count: number;
  questionForm: FormGroup;
  submitCounter: number;
  selectedAnswer;
  helpBlock = false;
  constructor(private serverService: ServerService, private router: Router ) { }

  ngOnInit() {   
    this.questionForm = new FormGroup({
    'question' : new FormControl(null, Validators.required),
    'optionValueList' : new FormArray([])
    })
    this.submitCounter = 0;
    this.onAddTextBox();
  }

  onAddTextBox(){
    this.textBoxes.pop;
     const option = new FormGroup({
       optionSelect : new FormControl(null),
       optionValue : new FormControl(null, Validators.required)
     });
    (<FormArray>this.questionForm.get('optionValueList')).push(option);
  }

  onRadioClick(optC: any){
    this.selectedAnswer=optC.value.optionValue;
  }

  onRemove(i:any){if(i>0){
    (<FormArray>this.questionForm.get('optionValueList')).removeAt(i);
    }
  }

  onSubmitForm(){
    this.submitCounter++;
    if(this.questionForm.get('optionValueList').valid && !isNullOrUndefined(this.selectedAnswer)
        && this.questionForm.get('question').valid){
      this.helpBlock = true;
      var question = this.questionForm.value.question;
      
      var options = [];
      var optionList = this.questionForm.value.optionValueList;
      for(var i=0; i<optionList.length; i++){
        if(this.selectedAnswer===optionList[i].optionValue){
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
      var submitQues = {
        question,
        options
      };
      this.serverService.addQuestion(submitQues).subscribe();
      this.router.navigate(['/']);
    }
  } 
}
