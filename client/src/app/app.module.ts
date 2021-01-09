import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { AssingWatchComponent } from './pages/assing-watch/assing-watch.component';
import { AssingOperationComponent } from './pages/assing-operation/assing-operation.component';
import { WatchComponent } from './pages/watch/watch.component';
import { DayOffComponent } from './pages/day-off/day-off.component';
import { StaffComponent } from './pages/staff/staff.component';
import { OperationComponent } from './pages/operation/operation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AssingWatchComponent,
    AssingOperationComponent,
    WatchComponent,
    DayOffComponent,
    StaffComponent,
    OperationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
