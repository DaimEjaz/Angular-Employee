import { Component, OnInit } from '@angular/core';
import { EmployeeListService } from '../../services/employee-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modalTitle!: string;

  constructor(private service: EmployeeListService) { }

  ngOnInit(): void {
  }

  addNew(){
    this.modalTitle = "Add New"

    
  }

}
