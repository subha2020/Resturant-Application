import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ResturantData } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue!: FormGroup;
  resturantModelObj: ResturantData = new ResturantData();
  allResturantData: any;
  showAddBtn!:boolean;
  showUpdateBtn!:boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });
    this.getAllData();
  }

  addResturant() {
    this.resturantModelObj.name = this.formValue.value.name;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.address = this.formValue.value.address;
    this.resturantModelObj.services = this.formValue.value.services;

    this.api.postResturant(this.resturantModelObj).subscribe((response: any) => {
      alert("Resturant Records added succesfully");
      this.formValue.reset();
      this.getAllData();
    },
      (error) => {
        alert("Error Creating Database Records");
      })
  }

  getAllData() {
    this.api.getResturant().subscribe((res: any) => {
      this.allResturantData = res;
    });
  }

  deleteResturant(data:any){
    this.api.deleteResturant(data.id).subscribe(res=>{
      alert("Resturants Records Deleted");
      this.getAllData();
    })
  }

  editResturant(data:any){
    this.showAddBtn=false;
    this.showUpdateBtn=true;
    
    this.resturantModelObj.id=data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateResturant(){
    this.resturantModelObj.name = this.formValue.value.name;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.address = this.formValue.value.address;
    this.resturantModelObj.services = this.formValue.value.services;

    this.api.updateResturant(this.resturantModelObj,this.resturantModelObj.id).subscribe(res=>{
      alert("Resturant Records Updated");
      this.formValue.reset();
      this.getAllData();
    })

  }

  clickAddResto(){
    this.formValue.reset();
    this.showAddBtn=true;
    this.showUpdateBtn=false;
  }

}
