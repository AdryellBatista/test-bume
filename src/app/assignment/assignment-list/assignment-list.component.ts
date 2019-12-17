import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentService } from 'src/app/shared/assignment.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit, OnDestroy {
  assignmentsListBackup: any;
  sub: any;
  assignmentsList: any;

  valueSearch: FormGroup;

  objOrdder = {
    id: 'DESC',
    title: 'DESC',
    descruption: 'DESC',
    priority: 'DESC',
    status: 'DESC',
    create_date: 'DESC'
  };
  constructor(
    private assignmentService: AssignmentService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
    private formBuilder: FormBuilder,
  ) {
    this.valueSearch = formBuilder.group({
      text: new FormControl(null)
    });
  }

  ngOnInit() {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsList = [];
    this.sub = this.assignmentService.getAssignments().subscribe(
      data => {
        try {
          if (data) {
            this.assignmentsListBackup = this.sorting(data, 'priority').reverse();
            this.assignmentsList = this.sorting(data, 'priority').reverse();
          }
        } catch (error) {
          throw(error);
        }
      }
    );
  }

  goTo(action, param = null) {
    switch (action) {
      case 'add':
        this.router.navigate(['/assignment/form/_'], { relativeTo: null });
        break;
      case 'edit':
        this.router.navigate(['/assignment/form/' + param], { relativeTo: null });
        break;
    }
  }

  deleteAssignment(id) {
    this.assignmentService.deleteAssignment(id).subscribe(
      data => {
        this.toastr.success('Tarefa excluída com sucesso!', 'Concluído!');
        this.getAssignments();
      },
      err => {
        this.toastr.error('Algo deu errado!', 'Ops!');
      }
    );
  }

  order(property) {
    if (this.objOrdder[property] === 'ASC') {
      this.assignmentsList = this.sorting(this.assignmentsList, property);
      this.objOrdder[property] = 'DESC';
    } else {
      this.objOrdder[property] = 'ASC';
      this.assignmentsList = this.sorting(this.assignmentsList, property).reverse();
    }
  }

  sorting(arArray, parameter) {
    return arArray.sort((a, b) => {
      return a[parameter] < b[parameter] ? -1 : a[parameter] > b[parameter] ? 1 : 0;
    });
  }

  filter() {
    this.assignmentsList = this.assignmentsListBackup.filter(d => {
      return d.title.toUpperCase().includes( this.valueSearch.controls.text.value.toUpperCase()) ||
        d.description.toUpperCase().includes( this.valueSearch.controls.text.value.toUpperCase());
    });
  }

  toBack() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
