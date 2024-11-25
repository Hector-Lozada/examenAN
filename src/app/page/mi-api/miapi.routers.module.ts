import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  {path:'', redirectTo:'lists', pathMatch:'full'},
  {path:'lists', component: ListsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiapiRoutersModule { }
