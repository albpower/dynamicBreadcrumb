import { Component, OnInit, TemplateRef, ContentChild, OnDestroy } from '@angular/core';
import { BreadcrumbsGeneratorService } from './breadcrumbs-generator.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'breadcrumbs-container',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  // VARIABLES
  @ContentChild('optionTemplate', { static: false }) optionTemplateRef: TemplateRef<any>;

  menuItems: any[];
  homeMenu: any = {
    label: 'Dashboard',
    url: '/',
    icon: 'home'
  };

  // Subscription
  menuItemSub: Subscription;
  breadcrumbRefreshSub: Subscription;

  constructor(
    private breadcrumbGenerator: BreadcrumbsGeneratorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(
      event => {
        this.breadcrumbGenerator.generateBreadcrumbs(this.activatedRoute.root);
      }
    );

    this.menuItemSub = this.breadcrumbGenerator.MenuItems$.subscribe(
      resp => {
        this.menuItems = resp;
      }
    );

    this.breadcrumbRefreshSub = this.breadcrumbGenerator.getBreadcrumb().subscribe(
      respBreadcrumb => {
        // IF DYNAMIC BREADCRUMB VALUE CHANGES RE-GENERATE BREADCRUMB
        if(respBreadcrumb){
          this.breadcrumbGenerator.generateBreadcrumbs(this.activatedRoute.root);
        }
      }
    )
  }

  ngOnDestroy(){
    this.menuItemSub.unsubscribe();
    this.breadcrumbRefreshSub.unsubscribe();
  }

}
