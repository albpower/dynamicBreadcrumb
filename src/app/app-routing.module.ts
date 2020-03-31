import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "./shared/shared.module";

// COMPONENTS
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    data: {
      breadcrumb: "Home"
    }
  },
  {
    path: "news",
    loadChildren: () => import("./news/news.module").then(m => m.NewsModule),
    data: {
      breadcrumb: "News"
    }
  },
  {
    path: "events",
    loadChildren: () =>
      import("./events/events.module").then(m => m.EventsModule)
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then(m => m.SettingsModule),
    data: {
      breadcrumb: "Settings"
    }
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
