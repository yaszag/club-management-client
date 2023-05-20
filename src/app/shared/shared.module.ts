import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AreaComponent, CardComponent, PieComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    RouterModule,
    HighchartsChartModule,
  ],
  exports: [AreaComponent, CardComponent, PieComponent],
})
export class SharedModule {}
