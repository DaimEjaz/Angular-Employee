import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-container',
  templateUrl: './employee-container.component.html',
  styleUrls: ['./employee-container.component.css']
})
export class EmployeeContainerComponent implements OnInit {

  fetchedEmployee?: Employee;
  constructor() { }

  ngOnInit(): void {
  }

  empSelect(employee: Employee){
    //saving the object received from the list on the container
    this.fetchedEmployee = employee;
  }

}
