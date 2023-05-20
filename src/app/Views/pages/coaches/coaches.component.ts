import { Component, OnInit, ViewChild } from '@angular/core';
import { CoachService } from '../../core/services/coach.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateCoachDialogComponent } from './create-update-dialog/create-update-dialog.component';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'specialization',
    'phone',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _coachesService: CoachService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this._coachesService.getAllCoaches();
    this._coachesService.coaches$.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  openConfirmDialog(coach: any): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel(`Delete ${coach.name}?`, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      dialogResult ? this.deleteCoach(coach.id) : null;
    });
  }
  openAddUpdateDialog(coach: any): void {
    const dialogRef = this.dialog.open(CreateUpdateCoachDialogComponent, {
      maxWidth: '400px',
      data: coach,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this._coachesService.getAllCoaches();
    });
  }

  deleteCoach(coachId: string): void {
    this._coachesService.deleteCoach(coachId).subscribe(
      () => this._coachesService.getAllCoaches(),
      (e) => this._coachesService.getAllCoaches()
    );
  }
}
