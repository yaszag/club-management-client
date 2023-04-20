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
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private _membersService: MemberService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      dialogResult ? this.deleteCoach(member.id) : null;
    });
  }
  openAddUpdateDialog(coach: any): void {
    const dialogRef = this.dialog.open(CreateUpdateMemberDialogComponent, {
      maxWidth: '400px',
      data: coach,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this._membersService.getAllMemberes();
    });
  }

  deleteCoach(coachId: string): void {
    this._membersService.deleteMember(coachId).subscribe(
      () => this._membersService.getAllMemberes(),
      (e) => this._membersService.getAllMemberes()
    );
  }
}
