import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { SignupComponent } from './components/signup/signup.component';
import { SaleComponent } from './components/sale/sale.component';
import { CustomerComponent } from './components/customer/customer-group/customer.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { AllCustomerComponent } from './components/customer/all-customer/all-customer.component';

const routes: Routes = [
  {path: '', component: NavComponent, children: [
    {path: 'dashboard', component: HomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'processSale', component: SaleComponent},
    {path: 'manegeCustomer', component: CustomerComponent},
    {path: 'newCustomer', component: AddCustomerComponent},
    {path: 'allCustomer', component: AllCustomerComponent},


    {path: '' , redirectTo: 'dashboard', pathMatch: 'full'}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
