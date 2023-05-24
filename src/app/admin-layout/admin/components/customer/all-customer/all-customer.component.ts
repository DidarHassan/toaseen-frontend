import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../../services/customer.service';
import { SnakbarService } from '../../../../../services/snakbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../../../../shared/global-constants';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-customer',
  templateUrl: './all-customer.component.html',
  styleUrls: ['./all-customer.component.scss']
})
export class AllCustomerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'gender', 'phoneNumber', 'customerNumber',];
  dataSource: any =[];
  responseMessage: any;


  constructor(
    private customerService: CustomerService,
    private snakbarService: SnakbarService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getCusTable()
  }
  getCusTable() {
    this.customerService.getCustomer().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response)
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

  searchFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
