import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { BreadcrumbsGeneratorService } from "src/app/shared/breadcrumbs/breadcrumbs-generator.service";
import { NewsService } from "../services/news.service";

@Component({
  selector: "app-news-info",
  templateUrl: "./news-info.component.html",
  styleUrls: ["./news-info.component.scss"]
})
export class NewsInfoComponent implements OnInit {
  //Variables
  newsId: string;
  currentNews: any;
  dummyNews: any[] = [
    { id: "66520af7-d03e-c3fc-f01f-2300e0e64464", name: "News 1" },
    { id: "182006ed-92b3-1a80-b77d-b04d3cf35578", name: "News 2" },
    { id: "fe5f0b8b-48cc-6c3d-18e6-67108a4d5dc9", name: "News 3" },
    { id: "fd8e7bcf-f636-0d99-1c21-82584dce7e6d", name: "News 4" },
    { id: "a7a2b5f3-6cf5-ebd9-7805-e723a6897cc8", name: "News 5" }
  ];

  // SUBSCRIPTIONS
  currentNewsSub: Subscription;

  constructor(
    private breadcrumbService: BreadcrumbsGeneratorService,
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.newsId = this.activatedRoute.snapshot.paramMap.get('id');

    this.currentNewsSub = this.newsService.getNews().subscribe(respNews => {
      if (respNews) {
        this.currentNews = { ...respNews };
        this.breadcrumbService.setBreadcrumb(respNews.name);
      } else {
        let f = this.dummyNews.find(x => x.id === this.newsId);

        if (f !== null) {
          this.currentNews = { ...f };
          this.breadcrumbService.setBreadcrumb(this.currentNews.name);
        }
      }
    });
  }
}
