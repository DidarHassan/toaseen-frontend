import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../../services/customer.service';
import { SnakbarService } from '../../../../../services/snakbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../../../../shared/global-constants';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],

})
export class AddCustomerComponent implements OnInit {

  addCustomerForm: any = FormGroup;
  responseMessage: any;


  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private snakbarService: SnakbarService,
    private ngxService: NgxUiLoaderService) { }

    ngOnInit(): void {

      this.addCustomerForm = this.formbuilder.group({
        firstName: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        lastName: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
        gender: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
        phoneNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
        customerNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],

      })
    }
    newCustomer() {
      this.ngxService.start();
      const formData = this.addCustomerForm.value;
      
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        customerNumber: formData.customerNumber
      };
  
      this.customerService.addCustomer(data).subscribe(
        (response: any) => {
          this.ngxService.stop();
          this.responseMessage = response?.message;
          this.snakbarService.openSnackBar(this.responseMessage, "");
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
