import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  EmployeeList: any = [];
  ModalTitle: string;
  ActivatedAddEditEmpComp:boolean=false;
  emp: any;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.sharedService.getEmpList().subscribe(result => {
      this.EmployeeList = result;
    });
  }

  addClick() {
    this.emp = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'guru.jpg'
    };
    this.ModalTitle = 'Add Employee';
    this.ActivatedAddEditEmpComp = true;
  }

  closeClick() {
    this.ActivatedAddEditEmpComp = false;
    this.getEmployeeList();
  }

  editClick(item) {
    this.emp = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivatedAddEditEmpComp = true;
  }

  deleteClick(item) {
    if(confirm('Are you sure??')) {
      this.sharedService.deleteEmployee(item.EmployeeId).subscribe(res => {
        alert(res.toString());
        this.getEmployeeList();
      });
    }
  }

}
