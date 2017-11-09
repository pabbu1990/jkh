import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewComponent} from "./new/new.component";
import {QuestionsComponent} from "./questions/questions.component";
import {EditComponent} from "./edit/edit.component";


const appRoutes: Routes = [
  { path: '', component: QuestionsComponent},
  { path: 'new', component: NewComponent},
  { path: 'edit', component: EditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
