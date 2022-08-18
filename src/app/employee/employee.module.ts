import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeContainerComponent } from './components/employee-container/employee-container.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { EmployeeListService } from './services/employee-list.service';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from './components/form-modal/form-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';






@NgModule({
  declarations: [
    ButtonComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeContainerComponent,
    ReactiveFormComponent,
    FormModalComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  exports: [
    EmployeeContainerComponent
  ],
  providers: [
    EmployeeListService,
    NgbActiveModal
  ],
  // entryComponents: [             //Can remove, as it is not required
  //   FormModalComponent,
  //   ReactiveFormComponent
  // ]
})
export class EmployeeModule { }
