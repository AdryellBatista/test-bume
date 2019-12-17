import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from 'src/app/shared/assignment.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as moment from 'moment';
import { DatePipe, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit, OnDestroy {
  sub: any;
  title: string;
  objAssignment: {};
  subRoute: any;

  objForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private location: Location,
    private toastr: ToastrService
  ) {
    this.objForm = formBuilder.group({
        id: new FormControl(null),
        title: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        priority: new FormControl(null, Validators.required),
        status: new FormControl(null, Validators.required),
        create_date: new FormControl(null)
    });
   }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe(params => {
      if (params.id && Number.isInteger(Number(params.id))) {
        this.getAssignment(params.id);
      } else {
        this.title = 'nova';
      }
    });
  }

  getAssignment(id) {
    this.assignmentService.getAssignment(id).subscribe(
      data => {
        try {
          if (data) {
            this.setForm(data);
            this.objAssignment = data;
          }
        } catch (error) {
          throw(error);
        }
      }
    );
  }

  setForm(assignment) {
    if (assignment) {
      this.objForm.controls.id.setValue(assignment.id);
      this.objForm.controls.title.setValue(assignment.title);
      this.objForm.controls.description.setValue(assignment.description);
      this.objForm.controls.priority.setValue(assignment.priority);
      this.objForm.controls.status.setValue(assignment.status ? 1 : 0);
      const cDate = this.datePipe.transform(new Date(assignment.create_date));
      this.objForm.controls.create_date.setValue(cDate);
    }
  }

  save() {
    if (!this.objForm.invalid) {
      const objForm = this.objForm.value;
      objForm.status = !(Number(objForm.status) === 0);
      objForm.create_date = new Date().getTime();
      objForm.priority = Number(objForm.priority);

      if (this.objForm.controls.id.value) { // UPDATE
        this.sub = this.assignmentService.editAssignment(this.objForm.value).subscribe(
          data => {
            this.toastr.success('Tarefa atualizada com sucesso!', 'Concluído!');
            this.toBack();
          },
          err => {
            this.toastr.error('Algo deu errado!', 'Ops!');
          }
        );
      } else { // SAVE
        this.sub = this.assignmentService.setAssignment(this.objForm.value).subscribe(
          data => {
            this.toastr.success('Tarefa criada com sucesso!', 'Concluído!');
            this.toBack();
          },
          err => {
            this.toastr.error('Algo deu errado!', 'Ops!');
          }
        );

      }
    } else {
      this.toastr.warning('Campos obrigatórios não preenchidos!', 'Ops!');
    }
  }

  toBack() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.subRoute) {
      this.subRoute.unsubscribe();
    }
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
