import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from '../../components/confirm-dialog/confirm-dialog.component';
import { EquipementService } from '../../core/services/equipement.service';
import { CreateUpdateEquipementDialogComponent } from './create-update-dialog/create-update-dialog.component';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.scss'],
})
export class EquipementsComponent {
  displayedColumns: string[] = ['name', 'description', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _equipementesService: EquipementService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this._equipementesService.getAllEquipements();
    this._equipementesService.equipements$.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  openConfirmDialog(equipement: any): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel(
      `Delete ${equipement.name}?`,
      message
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      dialogResult ? this.deleteEquipement(equipement.id) : null;
    });
  }
  openAddUpdateDialog(equipement: any): void {
    const dialogRef = this.dialog.open(CreateUpdateEquipementDialogComponent, {
      maxWidth: '400px',
      data: equipement,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this._equipementesService.getAllEquipements();
    });
  }

  deleteEquipement(equipementId: string): void {
    this._equipementesService.deleteEquipement(equipementId).subscribe(
      () => this._equipementesService.getAllEquipements(),
      (e) => this._equipementesService.getAllEquipements()
    );
  }
}
