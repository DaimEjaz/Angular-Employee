import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  modalTitle!: string;

  constructor() { }

  ngOnInit(): void {
  }

  addNew(){
    this.modalTitle = "Add New"

    //Call service
  }

}
