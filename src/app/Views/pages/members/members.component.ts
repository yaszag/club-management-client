import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { MemberService } from '../../core/services/member.service';
import { CreateUpdateMemberDialogComponent } from './create-update-dialog/create-update-dialog.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'activities',
    'subscribtion',
    'endDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _membersService: MemberService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this._membersService.getAllMemberes();
    this._membersService.memberes$.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  openConfirmDialog(member: any): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel(
      `Delete ${member.name}?`,
      message
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      dialogResult ? this.deleteMember(member.id) : null;
    });
  }
  openAddUpdateDialog(member: any): void {
    const dialogRef = this.dialog.open(CreateUpdateMemberDialogComponent, {
      maxWidth: '400px',
      data: member,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this._membersService.getAllMemberes();
    });
  }
  applyFilter(filterValues: any) {
    this.filterData();
    this.dataSource.filter = filterValues;
  }

  deleteMember(memberId: string): void {
    this._membersService.deleteMember(memberId).subscribe(
      () => this._membersService.getAllMemberes(),
      (e) => this._membersService.getAllMemberes()
    );
  }

  filterData(): void {
    this.dataSource.filterPredicate = ((data: any, filter) => {
      const name = !filter.name || data.name.includes(filter.name);
      const activities =
        !filter.activityId ||
        data.activities.some(
          (activity: { id: any }) => activity.id == filter.activityId
        );
      const subscribtion =
        !filter.subscribtion ||
        data.subscription.subscriptionDetails.id == filter.subscribtion;
      const status =
        !filter.status ||
        this.getUserStatus(data.subscription.endDate) == filter.status;

      return name && activities && subscribtion && status;
    }) as (PeriodicElement: any, string: any) => boolean;
  }

  private getUserStatus(endDate: string): number {
    const today = new Date();
    const end = new Date(endDate);
    return end > today ? 1 : 2;
  }

  getRowClass(row: any): string {
    const status = this.getUserStatus(row.subscription.endDate);
    return status === 1 ? 'active-row' : 'non-active-row';
  }
}
