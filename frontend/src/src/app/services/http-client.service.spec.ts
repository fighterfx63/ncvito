import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientService} from './http-client.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Announcement} from '../models/announcement.model';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {environment} from "../../environments/environment";

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpMock: HttpTestingController;
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientService],
    });


    service = getTestBed().get(HttpClientService);
    httpMock = getTestBed().get(HttpTestingController);


  });


  it('Created announcements', () => {
    const announcement1: Announcement =
      {
        apartment: {address: 'testAddress12', square: 112, roomCount: 112, floor: 112},
        sale: true,
        description: 'test12',
        price: 112,
        creationDate: new Date()
      };

    service.createAnnouncements(announcement1).subscribe(response => {
      expect(response.price).toBe(112);
      expect(response.description).toBe('test12');
    });
    let req = httpMock.expectOne(environment.url);
    expect(req.request.method).toBe('POST');
    req.flush(announcement1);

  });
});
