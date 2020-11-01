import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  DepartmentList: any = [];
  ModalTitle: string;
  ActivatedAddEditDeptComp:boolean=false;
  dep: any;
  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.getDepartmentList();
  }

  getDepartmentList() {
    this.sharedService.getDeptList().subscribe(result => {
      this.DepartmentList = result;
    });
  }

  addClick() {
    this.dep = {
      DepartmentId: 0,
      DepartmentName: ''
    };
    this.ModalTitle = 'Add Department';
    this.ActivatedAddEditDeptComp = true;
  }

  closeClick() {
    this.ActivatedAddEditDeptComp = false;
    this.getDepartmentList();
  }

  editClick(item) {
    this.dep = item;
    this.ModalTitle = 'Edit Department';
    this.ActivatedAddEditDeptComp = true;
  }

  deleteClick(item) {
    if(confirm("Are you sure??")) {
      this.sharedService.deleteDepartment(item.DepartmentId).subscribe(res => {
        alert(res.toString());
        this.getDepartmentList();
      });
    }
  }
}
