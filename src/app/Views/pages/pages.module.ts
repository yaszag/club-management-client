import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { BodyComponent } from 'src/app/layout/body/body.component';
import { SidenavComponent } from 'src/app/layout/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CoachesComponent } from './coaches/coaches.component';
import { MembersComponent } from './members/members.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { CreateUpdateCoachDialogComponent } from './coaches/create-update-dialog/create-update-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EquipementsComponent } from './equipements/equipements.component';
import { CreateUpdateActivityDialogComponent } from './activities/create-update-dialog/create-update-dialog.component';
import { CreateUpdateMemberDialogComponent } from './members/create-update-dialog/create-update-dialog.component';
import { CreateUpdateEquipementDialogComponent } from './equipements/create-update-dialog/create-update-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { HighchartsChartModule } from 'highcharts-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSortModule} from '@angular/material/sort';
import { FilterContainerComponent } from './members/components/filter-container/filter-container.component';

@NgModule({
  declarations: [
    PagesComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ActivitiesComponent,
    MembersComponent,
    ConfirmDialogComponent,
    CoachesComponent,
    CreateUpdateCoachDialogComponent,
    CreateUpdateActivityDialogComponent,
    CreateUpdateEquipementDialogComponent,
    EquipementsComponent,
    CreateUpdateMemberDialogComponent,
    FilterContainerComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
    HighchartsChartModule,
    MatIconModule,
    FlexLayoutModule,
    SharedModule,
    MatSortModule

  ],
  providers: [MatDatepickerModule],
})
export class PagesModule {}
