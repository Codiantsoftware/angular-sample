import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let accountService: jasmine.SpyObj<AccountService>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(async () => {
    const accountServiceSpy = jasmine.createSpyObj('AccountService', ['login']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['clear', 'error']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents();

    accountService = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
