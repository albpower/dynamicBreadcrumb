import { Component, OnInit } from "@angular/core";
import { Guid } from "guid-typescript";
import { Router } from "@angular/router";
import { BreadcrumbsGeneratorService } from "src/app/shared/breadcrumbs/breadcrumbs-generator.service";

@Component({
  selector: "app-news-list",
  templateUrl: "./news-list.component.html",
  styleUrls: ["./news-list.component.scss"]
})
export class NewsListComponent implements OnInit {
  //Variables
  news: number[] = [1, 2, 3, 4, 5];
  newsList: any[] = [
    { id: "66520af7-d03e-c3fc-f01f-2300e0e64464", name: "News 1" },
    { id: "182006ed-92b3-1a80-b77d-b04d3cf35578", name: "News 2" },
    { id: "fe5f0b8b-48cc-6c3d-18e6-67108a4d5dc9", name: "News 3" },
    { id: "fd8e7bcf-f636-0d99-1c21-82584dce7e6d", name: "News 4" },
    { id: "a7a2b5f3-6cf5-ebd9-7805-e723a6897cc8", name: "News 5" }
  ];

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbsGeneratorService
  ) {}

  ngOnInit() {
    //this.generateNews();
  }

  generateNews() {
    this.news.forEach(item => {
      let obj = {
        id: Guid.create(),
        name: `News ${item}`
      };

      this.newsList.push(obj);
    });
  }

  navigateTo(news: any) {
    this.router.navigate([`/news/${news.id}`]);
    this.breadcrumbService.setBreadcrumb(news.name);
  }
}
