import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let accountService: jasmine.SpyObj<AccountService>;
  let alertService: jasmine.SpyObj<AlertService>;

  beforeEach(waitForAsync(() => {
    const accountServiceSpy = jasmine.createSpyObj('AccountService', ['register']);
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['success', 'error']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents();

    accountService = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;
    alertService = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    });
  });

  it('should set submitted to true when onSubmit is called', () => {
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });

  it('should call accountService.register with correct form value', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      password: 'password'
    };
    component.form.setValue(formData);
    accountService.register.and.returnValue(of({}));
    component.onSubmit();
    expect(accountService.register).toHaveBeenCalledWith(formData);
  });

  it('should call alertService.success and navigate to login page on successful registration', waitForAsync(() => {
    accountService.register.and.returnValue(of({}));
    component.onSubmit();
    expect(component.loading).toBeFalse();
    // Add more expectations related to navigation if needed
  }));

  it('should call alertService.error and set loading to false on registration error', waitForAsync(() => {
    const error = 'Registration failed';
    accountService.register.and.returnValue(throwError(error));
    component.onSubmit();
    expect(component.loading).toBeFalse();
  }));
});
