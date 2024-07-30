import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RegisterComponent } from './register.component';
import * as AuthActions from '../../store/actions/auth.actions';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        RegisterComponent
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.registerForm.get('username')?.value).toBe('');
    expect(component.registerForm.get('email')?.value).toBe('');
    expect(component.registerForm.get('password')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should mark form as valid when filled correctly', () => {
    component.registerForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should dispatch register action when form is valid and submitted', () => {
    spyOn(store, 'dispatch');
    component.registerForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.register({ username: 'testuser', email: 'test@example.com', password: 'password123' })
    );
  });

  it('should not dispatch register action when form is invalid', () => {
    spyOn(store, 'dispatch');
    component.onSubmit();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});