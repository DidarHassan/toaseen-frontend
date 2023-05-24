import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SnakbarService } from '../../services/snakbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../shared/global-constants';
import { AuthGuard } from '../auth.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;
  hide = true;



  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snakbarService: SnakbarService,
    private ngxService: NgxUiLoaderService,
    private auth: AuthService,) { }

  ngOnInit(): void {

    if (this.auth.Islogined()) {
      this.router.navigate(['/admin'])
    }

    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required]],

    })
  }
  onLogin() {
    this.ngxService.start();
    var formData = this.loginForm.value;

    var data = {
      email: formData.email,
      password: formData.password,
    };

    this.userService.login(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.router.navigate(['/admin'])
        localStorage.setItem('token', response.token);
      },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        console.error(error); // Log the error to the console
        this.snakbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
}
