import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { mockApiData } from '../../mock/mock-api-data';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of accounts', () => {
    service.getAccountsList().subscribe(data => {
      expect(data).toEqual(mockApiData);
    });

    const req = httpTestingController.expectOne('https://71013f65-b118-41be-9b20-f062e0e58598.mock.pstmn.io/accounts');
    expect(req.request.method).toEqual('GET');
    req.flush(mockApiData);
  });

  it('should return the mock data when the API returns a 429 error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    service.getAccountsList().subscribe(data => {
      expect(data).toEqual(mockApiData);
    });

    const req = httpTestingController.expectOne('https://71013f65-b118-41be-9b20-f062e0e58598.mock.pstmn.io/accounts');
    req.flush({ status: 429 }, { status: 429, statusText: 'Too Many Requests' });

    expect(spy).not.toHaveBeenCalled();
  });

  it('should return an error if the API returns an error', () => {
    const errorMessage = 'Some error';

    service.getAccountsList().subscribe(
      () => {},
      err => {
        expect(err).toEqual(errorMessage);
      }
    );

    const req = httpTestingController.expectOne('https://71013f65-b118-41be-9b20-f062e0e58598.mock.pstmn.io/accounts');
    req.flush({ error: { error: { message: errorMessage } } }, { status: 400, statusText: 'Bad Request' });
  });
});
