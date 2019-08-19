import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpService} from './http.service';
import {UserModel} from '../sign-up/user.model';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  let theUser: UserModel;
  let url: string;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule
          ],
          providers: [HttpService]
        }
      );
    }
  );

  beforeEach(() => {
      service = TestBed.get(HttpService);
      httpMock = TestBed.get(HttpTestingController);
      theUser = new UserModel('testFname', 'testSname', 'testLogin', 'testPassword', 'testEmail', 'testPhone');
      url = '/registration';
    }
  );

  it('should be created', () => {
    const mService: HttpService = TestBed.get(HttpService);
    expect(mService).toBeTruthy();
  });

  it('should POST the correct data', () => {
    service.post(url, theUser).subscribe((data) => {
      expect(data).toEqual(theUser);
    });

    const req = httpMock.expectOne('http://localhost:8080' + url);
    expect(req.request.method).toBe('POST');

    req.flush(theUser);

    httpMock.verify();
  });

});
