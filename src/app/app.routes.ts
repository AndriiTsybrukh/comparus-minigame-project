import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sniper',
  },
  {
    path: 'sniper',
    loadComponent: () =>
      import('./minigame-sniper/minigame-sniper.component').then(
        (c) => c.MinigameSniperComponent
      ),
  },
];
