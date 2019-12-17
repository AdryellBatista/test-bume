import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentService } from 'src/app/shared/assignment.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-home',
  templateUrl: './assignment-home.component.html',
  styleUrls: ['./assignment-home.component.scss']
})
export class AssignmentHomeComponent implements OnInit, OnDestroy {
  sub: any;
  assignmentToday = [];
  assignmentList: any;

  currentDate = new Date();
  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentList = [];
    this.sub = this.assignmentService.getAssignments().subscribe(
      data => {
          if (data) {
            this.assignmentList = data;
            this.assignmentList.forEach(element => {
              if (this.currentDate.toDateString() === new Date(element.create_date).toDateString()) {
                this.assignmentToday.push(element);
              }
            });
          }
      }
    );
  }

  goTo(destiny) {
    this.router.navigate(['/' + destiny], { relativeTo: null });
  }


  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
