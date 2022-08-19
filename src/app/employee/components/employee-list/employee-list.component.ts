import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeListService } from '../../services/employee-list.service';
import {NgbActiveModal, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees$!: Employee[];
  updateClicked?: boolean = false;
  currentEmp!: Employee;

  modalTitle!: string;
    
  @Output() btnClick = new EventEmitter<Employee>();
  closeResult!: string;
  constructor(private employeeListService : EmployeeListService, public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.employeeListService.getEmployees().subscribe(data => this.employees$ = data);
    //this.employees$ = this.employeeListService.getEmployees();
    console.log(this.employees$);
  }

  empClick(employee: Employee){
    this.btnClick.emit(employee)
  }

  update(employee: Employee){
    this.updateClicked = true;
    alert("Update")
  }

  deleteEmp(employee: Employee){
    this.employeeListService.deleteEmployee(employee.id).subscribe(() =>  this.employeeListService.getEmployees().subscribe(data => this.employees$ = data));

  }
  emp(employee: Employee){
    this.currentEmp = employee;
    this.modalTitle = "Update"
  }

  refreshList(empList : Employee[]){
    this.employees$ = empList;
  }

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  
  open3() {
    if(!this.updateClicked){
      const modalRef = this.modalService.open(ReactiveFormComponent);
      this.updateClicked = !this.updateClicked;
    }
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
