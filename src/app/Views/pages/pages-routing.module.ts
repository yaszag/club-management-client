import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CoachesComponent } from './coaches/coaches.component';
import { MembersComponent } from './members/members.component';
import { LoginComponent } from '../user/login/login.component';
import { PagesComponent } from './pages.component';
import { EquipementsComponent } from './equipements/equipements.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'coaches', component: CoachesComponent },
      { path: 'members', component: MembersComponent },
      { path: 'equipments', component: EquipementsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
