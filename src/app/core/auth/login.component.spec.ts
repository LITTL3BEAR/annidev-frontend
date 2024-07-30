import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import * as AuthActions from '../../store/actions/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        LoginComponent
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty email and password', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should mark form as valid when filled correctly', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should dispatch login action when form is valid and submitted', () => {
    spyOn(store, 'dispatch');
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({ email: 'test@example.com', password: 'password123' })
    );
  });

  it('should not dispatch login action when form is invalid', () => {
    spyOn(store, 'dispatch');
    component.onSubmit();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});