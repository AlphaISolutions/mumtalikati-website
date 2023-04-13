import { Component, OnInit } from '@angular/core';
import { Faqs } from '../models/faq.model';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqList: Faqs[]=[];
  loading:boolean=false;
  constructor(private setupservice:SetupService) { }

  ngOnInit(): void {
    this.getfaqs()
  }
  async getfaqs() {
    this.loading = true;
    this.setupservice.getFaq()
      .then((data) => {
        if (data) {
          this.faqList = data
        }
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
}
