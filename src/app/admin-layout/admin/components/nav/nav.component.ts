import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../../components/signup/signup.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private dailog: MatDialog) { }

  singupAction() {
    const dailogConfig = new MatDialogConfig();
    dailogConfig.width = "550px";
    this.dailog.open(SignupComponent, dailogConfig)
  }
  // loginAction() {
  //   const dailogConfig = new MatDialogConfig();
  //   dailogConfig.width = "550px";
  //   this.dailog.open(LoginComponent, dailogConfig)
  // }
}
