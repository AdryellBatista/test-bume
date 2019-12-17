import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  urlAPI = 'http://5df66abac1b62e0014e20711.mockapi.io/';
  constructor(private http: HttpClient) { }

  getAssignments() {
    return this.http.get<any[]>(
      `${this.urlAPI}assignment`).pipe(
      map((data) => data)
    );
  }

  getAssignment(id) {
    return this.http.get<any[]>(
      `${this.urlAPI}assignment/${id}`).pipe(
      map((data) => data)
    );
  }

  setAssignment(param) {
    return this.http.post<any[]>(
      `${this.urlAPI}assignment`, param).pipe(
      map((data) => data)
    );
  }

  editAssignment(param) {
    return this.http.put<any[]>(
      `${this.urlAPI}assignment/${param.id}`, param).pipe(
      map((data) => data)
    );
  }

  deleteAssignment(id) {
    return this.http.delete<any[]>(
      `${this.urlAPI}assignment/${id}`).pipe(
      map((data) => data)
    );
  }
}
