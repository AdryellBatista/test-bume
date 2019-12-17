import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentListComponent } from 'src/app/assignment/assignment-list/assignment-list.component';
import { AssignmentHomeComponent } from 'src/app/assignment/assignment-home/assignment-home.component';
import { AssignmentFormComponent } from 'src/app/assignment/assignment-form/assignment-form.component';

const assignmentListRoutes: Routes = [
  {
    path: '',
    component: AssignmentHomeComponent,
  },
  {
    path: 'form/:id',
    component: AssignmentFormComponent,
  },
  {
    path: 'list',
    component: AssignmentListComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(assignmentListRoutes)
  ],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }
