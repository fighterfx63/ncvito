import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientService} from './http-client.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Announcement} from '../models/announcement.model';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

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


  it('Get All announcements', () => {
    const announcements: Announcement[] = [
      {
        apartment: {address: 'testAddress1', square: 11, roomCount: 11, floor: 11},
        sale: true,
        description: 'test1',
        price: 11,
        creationDate: new Date()
      },
      {
        apartment: {address: 'testAddress2', square: 22, roomCount: 22, floor: 22},
        sale: true,
        description: 'test2',
        price: 22,
        creationDate: new Date()
      },
    ];
    service.getAllAnnouncements(0, 10).subscribe(responce => {
      expect(responce.length).toBe(2);
      expect(responce).toEqual(announcements);
    });

    let req = httpMock.expectOne('http://localhost:8080/announcements');
    expect(req.request.method).toBe('GET');
    req.flush(announcements);

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
    let req = httpMock.expectOne('http://localhost:8080/announcements');
    expect(req.request.method).toBe('POST');
    req.flush(announcement1);

  });
});
