import { ResultService } from './result.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

describe('Result service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ResultService
      ]
    });
  });

  it('Should translate markdown to HTML!',
    inject([ResultService], (resultService) => {

      expect(resultService).toBeDefined();
      console.log('Test');

      resultService.post2().subscribe(
           data => console.log(data),
           err => console.log(err),
           () => console.log('Request Completed')
        );
    }));
});
