import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '@env/environment';
import { TokenService } from './token.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  const API_URL = `${environment.apiUrl}/user`;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TokenService', ['getToken']);
    spy.getToken.and.returnValue('mocked-token');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: TokenService, useValue: spy }
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUserById', () => {
    it('should send GET request with auth headers', () => {
      const mockResponse = { id: 1, name: 'John Doe' };

      service.getUserById(1).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${API_URL}/1`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-token');
      expect(req.request.headers.get('Accept')).toBe('application/json');
      req.flush(mockResponse);
    });
  });

  describe('#createUser', () => {
    it('should send POST request with user data and auth headers', () => {
      const newUser = { name: 'Jane Doe', email: 'jane@example.com' };
      const mockResponse = { id: 2, ...newUser };

      service.createUser(newUser).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newUser);
      expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-token');
      req.flush(mockResponse);
    });
  });

  describe('#updateUser', () => {
    it('should send PUT request with updated user data and auth headers', () => {
      const updatedUser = { name: 'Jane Smith' };
      const mockResponse = { id: 2, ...updatedUser };

      service.updateUser(2, updatedUser).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${API_URL}/2`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedUser);
      expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-token');
      req.flush(mockResponse);
    });
  });

  describe('#deleteUser', () => {
    it('should send DELETE request with auth headers', () => {
      const mockResponse = { success: true };

      service.deleteUser(3).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${API_URL}/3`);
      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-token');
      req.flush(mockResponse);
    });
  });
});
