import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { fireBaseconfing } from './enviroment/firebase';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideAuth, getAuth} from '@angular/fire/auth';
import { from } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(fireBaseconfing)),
    provideAuth(() => getAuth())
  ]
};
