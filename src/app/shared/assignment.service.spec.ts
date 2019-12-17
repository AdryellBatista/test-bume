import { TestBed } from '@angular/core/testing';

import { AssignmentService } from './assignment.service';
import { HttpClientModule } from '@angular/common/http';

describe('AssignmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: AssignmentService = TestBed.get(AssignmentService);
    expect(service).toBeTruthy();
  });
});
