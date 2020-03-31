import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// CUSTOM MODULES
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
