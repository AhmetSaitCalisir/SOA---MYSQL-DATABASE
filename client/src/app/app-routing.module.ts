import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssingDayOffComponent } from './pages/assing-day-off/assing-day-off.component';
import { AssingOperationComponent } from './pages/assing-operation/assing-operation.component';
import { AssingWatchComponent } from './pages/assing-watch/assing-watch.component';
import { DayOffComponent } from './pages/day-off/day-off.component';
import { LoginComponent } from './pages/login/login.component';
import { OperationComponent } from './pages/operation/operation.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { StaffComponent } from './pages/staff/staff.component';
import { WatchComponent } from './pages/watch/watch.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'assingoperation', component: AssingOperationComponent },
  { path: 'assingwatch', component: AssingWatchComponent },
  { path: 'dayoff', component: DayOffComponent },
  { path: 'operation', component: OperationComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'watch', component: WatchComponent },
  { path: 'assingdayoff', component: AssingDayOffComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
