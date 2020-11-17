import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eigth-router-activatedrouter',
  templateUrl: './eigth-router-activatedrouter.component.html',
  styleUrls: ['./eigth-router-activatedrouter.component.css']
})
export class EigthRouterActivatedrouterComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      if (p['id'] === 0) {
        this.router.navigate(['not-found']);
      }
    });
  }

  save() {
    this.router.navigate(['users']);
  }

}
