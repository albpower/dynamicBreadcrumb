import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";

// Components
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { DisplaySettingsComponent } from './display-settings/display-settings.component';
import { AccountComponent } from './user-settings/account/account.component';

// Routes
const routes: Routes = [
  {
    path: 'user-settings',
    component: UserSettingsComponent,
    data: {
      breadcrumb: 'User Settings'
    },
    children: [
      {
        path: 'account',
        component: AccountComponent,
        data: {
          breadcrumb: "Account Details"
        }
      }
    ]
  },
  {
    path: 'display-settings',
    component: DisplaySettingsComponent,
    data: {
      breadcrumb: 'Display Settings'
    }
  },
  {
    path: '',
    redirectTo: 'user-settings',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [UserSettingsComponent, DisplaySettingsComponent, AccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
