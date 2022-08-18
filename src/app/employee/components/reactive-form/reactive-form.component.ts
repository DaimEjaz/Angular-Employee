import { Component, Input, OnInit } from '@angular/core';
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


 updateForm !: FormGroup;
 constructor(private fb : FormBuilder, private service: EmployeeListService, public activeModal: NgbActiveModal ) { }

 ngOnInit(): void {
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
  if(this.updateForm.valid){
    this.loading = true;
    const formValues = this.updateForm.value;
 
    try {
      this.service.updateEmployee(this.currEmployee.Id, formValues.name, formValues.address, formValues.joiningYear);
      this.success = true;
      console.log(formValues.name);
      alert(this.updateForm.value.name.valid);
    } catch (error) {
      console.error(error); 
    }
 
    this.loading = false;
  }else{
    alert("Some info is missing")
  }
   
 }

 clear(): void{
  this.updateForm.reset();
 }
}
