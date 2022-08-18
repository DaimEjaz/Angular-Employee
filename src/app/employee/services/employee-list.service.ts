import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  constructor(private http: HttpClient) { }
  updatedEmp!:Employee;
  newEmp !: Employee;
  // employees!: Employee[]
  employees: Employee[] = [
    {
      Id : 1,
      name: "Atif",
      address: "lahore",
      joiningYear: 2022
    },
    {
      Id : 2,
      name: "Huzefa",
      address: "lahore",
      joiningYear: 2022
    },
    {
      Id : 3,
      name: "Junaid",
      address: "lahore",
      joiningYear: 2022
    }
  ];
  

  private url: string = "http://localhost/API/GetEmployees";

  // getEmployees():Observable<Employee[]>{
  //  //Returning the list of Employee objects as Observables from sql database
  //   return this.http.get<Employee[]>(this.url);  
  // }

  // getEmployee(id: number): Observable<Employee>{
  //   //Returning the Employee object as Observables from sql database

  //   let empUrl = `http://localhost/API/GetEmployee/${id}`;
  //   return this.http.get<Employee>(empUrl);  
  // }

  //***********************************************TEMPORARY************************************************// 

  getEmployees():Employee[]{
    //Returning the list of Employee objects as Observables from sql database
     return this.employees;  
   }
 
   getEmployee(id: number): Employee{
     //Returning the Employee object as Observables from sql database
 
     let empUrl = `http://localhost/API/GetEmployee/${id}`;
     return this.employees[id - 1];  
   }

   updateEmployee(Id: number, name: string, address: string, joiningYear: number ){
      let updateUrl = `http://localhost/API/UpdateEmployee/${Id}`;

      this.updatedEmp = {
        Id: Id,
        name: name,
        address: address,
        joiningYear: joiningYear
      }
      return this.http.put<Employee>(updateUrl, this.updatedEmp)
   }

   addEmployee(Id: number, name: string, address: string, joiningYear: number ){
    let postUrl = `http://localhost/API/AddEmployee`
    this.newEmp = {
      Id: Id,
      name: name,
      address: address,
      joiningYear: joiningYear
    }

    return this.http.post<Employee>(postUrl, this.newEmp);

   }


   deleteEmployee(Id: number){
    let deleteUrl = `http://localhost/API/DeleteEmployee/${Id}`;
    return this.http.delete<any>(deleteUrl);
   }
}
