import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';
import { EmployeeListService } from '../../services/employee-list.service';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

 //Form states
 loading : boolean = false;
 success : boolean = false;

 //Get employee
 @Input() currEmployee!: Employee;
 @Input() btnText!: string;

 @Output() updated = new EventEmitter<Employee[]>();

 employees$!: Employee[];


 updateForm !: FormGroup;
 constructor(private fb : FormBuilder, private service: EmployeeListService, public activeModal: NgbActiveModal ) { }

 ngOnInit(): void {

  //************Employee list, not working since not working with db**************************//
  this.service.getEmployees().subscribe(data => this.employees$ = data);


   //Schema for form data
   this.updateForm = this.fb.group({
     name : ['', [
       Validators.required,
       Validators.minLength(2)
     ]],
     address : ['', [
       Validators.required,
       Validators.minLength(3),

     ]],
     joiningYear : [null, [
       Validators.required,
       Validators.min(2000),
       Validators.max(2022),
     ]],
   })

   this.updateForm.valueChanges.subscribe(console.log)

 }

 async submit(){

  if(this.btnText == 'Update'){

    if(this.updateForm.valid){
      // this.loading = true;
      const formValues = this.updateForm.value;
   
      try {
        this.service.updateEmployee(this.currEmployee.id, formValues.name, formValues.address, formValues.joiningYear)
        .subscribe(() => this.service.getEmployees().subscribe(data => {
          this.employees$ = data;
          this.updated.emit(this.employees$);

        }));
        // this.success = true;
      } catch (error) {
        console.error(error); 
      }
   
      // this.loading = false;
    }else{
      alert("Some info is missing or wrong!")
    }
  }

  else if(this.btnText == 'Add New'){
    //Call service for adding new employee

    const formValues = this.updateForm.value;

    if(this.updateForm.valid){
      try {
        this.service.addEmployee(1, formValues.name, formValues.address, formValues.joiningYear).subscribe(() =>  this.service.getEmployees().subscribe(data => this.employees$ = data));
        alert("Added successfully into database");
      } catch (error) {
        console.error(error); 
      }
    }else{
      alert("Some info is missing or wrong!")
    }
  }
   
 }

 clear(): void{
  this.updateForm.reset();
 }
}
