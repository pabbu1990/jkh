import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server.service";
import {Question} from "../question.model";
import {Router} from "@angular/router";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {PagerService} from "../pager.service";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  pageSize = 10;
  questions: Question[];
  filteredStatus = '';
  sort = 'Desc';
  
  constructor(private pagerService: PagerService, private serverService: ServerService, private route: Router) { }

  // array of all items to be paged
  private allItems: any[];
  
      // pager object
      pager: any = {};
  
      // paged items
      pagedItems: any[];

      
  ngOnInit() {

    this.onGet();

  }

  onGet() {
    if(this.serverService.callService){
    this.serverService.getQuestions()
      .subscribe(
        (questions: Question[])=> {
          this.questions = questions;
          console.log(questions);
          this.allItems = questions;         
          // initialize to page 1
          this.setPage(1);
          this.serverService.callService = false;
        }
      );
    }
    else{
      this.questions = this.serverService.questions;
      this.allItems = this.serverService.questions;
      this.setPage(1);
    }
  }

  onSort(){
    if(this.sort=='Desc'){
      this.sort = 'Asc';
    }
    else{
      this.sort='Desc'
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

onEdit(ques: any){
  this.route.navigate(['/edit']);
  console.log(ques);
  this.serverService.onEdit(ques);

  }

}
