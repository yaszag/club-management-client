import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  initializeRegisterForm(): void {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  register() {
    this.authService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigateByUrl('/login');
      });
  }
  login() {
    this.router.navigateByUrl('/login');
  }
}
