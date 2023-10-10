import { Component, OnInit } from '@angular/core';
import {
  OwnerPropertyFilter,
  PropertyFilter,
} from '../models/PropertyFilter.model';
import { MumtalikatiService } from '../services/mumtalikati.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private mumtalikatiservic: MumtalikatiService) {}
  loading: boolean = false;
  propertyfilter = new PropertyFilter();
  ownerPropertyFilter: OwnerPropertyFilter[] = [];
  listid: number | null = 1;
  pageNumber: number = 1;
  rowsNumber: number = 8;
  color: any;
  toggle: any;
  isActive: boolean = false;
  page: boolean = false;
  rightrow: boolean = false;
  leftrow: boolean = false;
  isLoading: boolean = true;
  elementStyles: any = {
    color: this.isActive ? 'green' : 'red',
  };
  async ngOnInit() {
    let data = this.propertyfilter;
    data.listingPurposesID = this.listid;
    data.pageNumber = this.pageNumber;
    data.rowsNumbers = this.rowsNumber;
    this.propertyFilter(data);
    if (this.toggle) {
      this.color = {
        'background-color': 'white!important',
        color: 'black!important',
      };
    } else {
      this.color = { 'background-color': 'transparent!important' };
    }
    this.button();
  }
  button() {
    if (localStorage.getItem('locale') == 'ar') {
      this.rightrow = true;
    } else {
      this.leftrow = true;
    }
  }
  getcolor(listid: number) {
    if ((listid = 1)) {
      this.color = { 'background-color': 'red!important' };
    } else {
      this.color = { 'background-color': 'green!important' };
    }
  }
  getColorClass() {
    return this.isActive ? 'active' : 'inactive';
  }
  propertyFilter(data: any) {
    this.isLoading = true;
    this.mumtalikatiservic
      .postPropertyFilter(data)
      .then((data) => {
        if (data) {
          this.ownerPropertyFilter = data;
        }
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
      });
  }
}
