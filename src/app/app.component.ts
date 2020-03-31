import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BreadcrumbsGeneratorService } from './shared/breadcrumbs/breadcrumbs-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'DynamicBreadcrumbs';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbGenerator: BreadcrumbsGeneratorService
  ){}

  ngOnInit() {
  }
}
