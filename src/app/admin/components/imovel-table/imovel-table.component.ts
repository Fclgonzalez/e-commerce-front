import { ImovelDialogComponent } from './../imovel-dialog/imovel-dialog.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ImovelTableDataSource, ImovelTableItem } from './imovel-table-datasource';

@Component({
  selector: 'app-imovel-table',
  templateUrl: './imovel-table.component.html',
  styleUrls: ['./imovel-table.component.css']
})
export class ImovelTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ImovelTableItem>;
  dataSource: ImovelTableDataSource;



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'Titulo','Vendedor' ,'actions'];


  openDialog() {
    this.dialog.open(ImovelDialogComponent);
  }


  constructor(public dialog: MatDialog) {
    this.dataSource = new ImovelTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
