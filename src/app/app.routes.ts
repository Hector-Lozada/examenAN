import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { DbzApiComponent } from './page/dbz-api/dbz-api.component';
import { PokeApiComponent } from './page/poke-api/poke-api.component';
import { CoctelApiComponent } from './page/coctel-api/coctel-api.component';
import { ErrorComponent } from './page/error/error.component';
import { AuthGuard } from './guard/auth.guard';
import { ListsComponent } from './page/mi-api/lists/lists.component';  // Asegúrate de que el nombre coincida

export const routes: Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'Dbz', component:DbzApiComponent},
    {path:'pokemon', component:PokeApiComponent},
    {path:'coctel', component:CoctelApiComponent},
    {path:'miapi', loadChildren: () => import('./page/mi-api/miapi.routers.module').then(m=> m.MiapiRoutersModule), canActivate: [AuthGuard]},
    {path:'**', component:ErrorComponent}
];