import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { AssignmentService } from 'src/app/shared/assignment.service';
import { HttpClientModule } from '@angular/common/http';
import { AssignmentHomeComponent } from './assignment-home/assignment-home.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StrongStrPipe } from 'src/app/shared/strong-text.pipe';

@NgModule({
  declarations: [
    AssignmentListComponent,
    AssignmentHomeComponent,
    AssignmentFormComponent,
    StrongStrPipe],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AssignmentService,
    DatePipe,
    ToastrService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AssignmentModule { }
