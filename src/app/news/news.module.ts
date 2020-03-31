import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

// COMPONENTS
import { NewsListComponent } from "./news-list/news-list.component";
import { NewsInfoComponent } from "./news-info/news-info.component";

// SERVICES
import { NewsService } from './services/news.service';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
  },
  {
    path: ':id',
    component: NewsInfoComponent,
    data: {
      breadcrumb: ''
    }
  }
];

@NgModule({
  declarations: [NewsListComponent, NewsInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule {}
