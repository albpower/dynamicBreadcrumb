import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

// Components
import { EventsListComponent } from './events-list/events-list.component';
import { EventsInfoComponent } from './events-info/events-info.component';

// Routes
const routes: Routes = [
  {
    path: '',
    component: EventsListComponent,
    data: {
      breadcrumb: 'Events'
    }
  },
  {
    path: ':id',
    component: EventsInfoComponent
  }
];

@NgModule({
  declarations: [EventsListComponent, EventsInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EventsModule { }
