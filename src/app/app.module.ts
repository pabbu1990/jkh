import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ServerService } from './server.service';
import { QuestionsComponent } from './questions/questions.component';
import { NewComponent } from './new/new.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PagerService} from './pager.service';
import { EditComponent } from './edit/edit.component';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    NewComponent,
    EditComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [ServerService, PagerService, QuestionsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
