import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class BreadcrumbsGeneratorService {
  private currentBreadcrumbs: IBreadcrumb[] = [];
  private dynamicBreadcrumb: BehaviorSubject<string> = new BehaviorSubject(null);
  MenuItems$: BehaviorSubject<IBreadcrumb[]> = new BehaviorSubject([]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  // BREADCRUMBS GENERATOR
  generateBreadcrumbs(route: ActivatedRoute) {
    this.currentBreadcrumbs = this.createBreadcrumbs(route);
    this.MenuItems$.next(this.currentBreadcrumbs);
  }

  // CREATE BREADCRUMB ITEMS
  createBreadcrumbs(
    route: ActivatedRoute,
    url: string = "",
    breadcrumbs: IBreadcrumb[] = []
  ): IBreadcrumb[] {
    //If no routeConfig is avalailable we are on the root path
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : "";

    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : "";

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split("/").pop();
    const isDynamicRoute = lastRoutePart.startsWith(":");

    if (isDynamicRoute && !!route.snapshot) {
      this.dynamicBreadcrumb.subscribe( respBreadcrumb => {
        const paramName = lastRoutePart.split(":")[1];
        path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
        //label = route.snapshot.params[paramName];
        label = respBreadcrumb;
      });
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadcrumb = {
      label: label,
      url: nextUrl
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.createBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
    // const children: ActivatedRoute[] = route.children;

    // if (children.length === 0) {
    //   return breadcrumbs;
    // } else {
    //   for (const child of children) {
    //     const routeURL: string = child.snapshot.url
    //       .map(segment => segment.path)
    //       .join("/");

    //     if (routeURL !== "") {
    //       url += `/${routeURL}`;

    //       const label = child.snapshot.data["breadcrumb"];
    //       breadcrumbs.push({
    //         label: label,
    //         url: url
    //       });
    //     }

    //     return this.createBreadcrumbs(child, url, breadcrumbs);
    //   }
    // }
  }

  setBreadcrumb(breadcrumb: string){
    this.dynamicBreadcrumb.next(breadcrumb);
  }

  getBreadcrumb(): Observable<string>{
    return this.dynamicBreadcrumb.asObservable();
  }
}

export interface IBreadcrumb {
  label: string;
  url: string;
}
