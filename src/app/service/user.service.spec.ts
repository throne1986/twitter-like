import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async , inject} from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [UserService]
  }));

   it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
   });

   it('should have add comments function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.addComments).toBeTruthy();
   });

   it('should have get comments function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getComments).toBeTruthy();
   });

   it('should have add status function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.addStatus).toBeTruthy();
   });

   it('should haveupdate status function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.updateStatus).toBeTruthy();
   });

   it('should have get users function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUsers).toBeTruthy();
   });

   it('should have get users by ID function', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUserById).toBeTruthy();
   });

});
