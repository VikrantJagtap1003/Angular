import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service:HttpService,private router:Router) { }

  ngOnInit(): void {
  }
  
  logout(){
    sessionStorage.removeItem('customerId');
    this.router.navigate(['/login'])
  }

}
