import { Component, ViewChild } from '@angular/core';
import { CreateUpdateActivityDialogComponent } from './create-update-dialog/create-update-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent {
  displayedColumns: string[] = ['name', 'description', 'price', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private _activityService: ActivityService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this._activityService.getAllactivities();
    this._activityService.activities$.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  openConfirmDialog(activity: any): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel(
      `Delete ${activity.name}?`,
      message
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      dialogResult ? this.deleteActivity(activity.id) : null;
    });
  }
  openAddUpdateDialog(activity: any): void {
    const dialogRef = this.dialog.open(CreateUpdateActivityDialogComponent, {
      maxWidth: '400px',
      data: activity,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this._activityService.getAllactivities();
    });
  }

  deleteActivity(ActivityId: string): void {
    this._activityService.deleteActivity(ActivityId).subscribe(
      () => this._activityService.getAllactivities(),
      (e) => this._activityService.getAllactivities()
    );
  }
}
