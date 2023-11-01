import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { initDatabase } from './app/services/db.service';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    {
      provide: APP_INITIALIZER,
      useFactory: () => initDatabase,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
