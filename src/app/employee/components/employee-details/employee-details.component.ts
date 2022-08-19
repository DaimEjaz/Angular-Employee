import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeListService } from '../../services/employee-list.service';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employees!: Employee[];

  changedEmp !: Employee;

  @Input() selectedEmployee?: Employee;
  
  constructor(private employeeListService : EmployeeListService) { }

  ngOnInit(): void {
    this.employeeListService.getEmployees().subscribe(data => this.employees = data);
    // this.employees =this.employeeListService.getEmployees();
  }

  previous(employee: Employee){
    let index = 0;
    //Making api call to server for previous employee, if not the start of list, using service
    for(let i=0; i < this.employees.length; i++){
      if(this.employees[i].id == employee.id){
        index = i;
      }
    }    
    if(index != 0)
    {
      //this.employeeListService.getEmployee(employee.Id - 1 > 0 ? employee.Id - 1: employee.Id).subscribe(data => this.selectedEmployee = data);
      //this.selectedEmployee = this.employees[index - 1];
      //alert(employee.name)
      this.changedEmp = this.employees[index - 1];
      this.employeeListService.getEmployee(this.changedEmp.id).subscribe(data => this.selectedEmployee = data);

    }
    else{
      return

    }
  }

  next(employee: Employee){
    let index = 0;
    //Making api call to server for next employee, if not the end of list, using service

    for(let i=0; i < this.employees.length; i++){
      if(this.employees[i].id == employee.id){
        index = i;
      }
    }
     
    // alert(index)
    if(index < this.employees.length - 1 )
    {

      //this.employeeListService.getEmployee(employee.id + 1 <= this.employees.length ? employee.id + 1: employee.id).subscribe(data => this.selectedEmployee = data);
      //alert(employee.name)

      //this.selectedEmployee = this.employees[index + 1]; //Works but need to do with service

      //************Better approach***********/
      this.changedEmp = this.employees[index + 1];
      this.employeeListService.getEmployee(this.changedEmp.id).subscribe(data => this.selectedEmployee = data);
      // this.selectedEmployee = this.changedEmp;
      // alert(this.changedEmp.id)

    }
    
  }
}


// SELECT *
// FROM (
//   SELECT ROW_NUMBER() OVER (ORDER BY student_id) AS row_num
//              , student_id
//              , student_name
//              , major
//              , batch
//   FROM student
// ) AS sub
// WHERE row_num = 5


/****** Script for SelectTopNRows command from SSMS  ******/
// SELECT * From(
// 	SELECT ROW_NUMBER() OVER (ORDER BY Id) AS row_num
// 			,StudentName
// 			, Address
// 			,AdmissionYear
// 	FROM Students
// ) AS sub
// WHERE row_num = 2