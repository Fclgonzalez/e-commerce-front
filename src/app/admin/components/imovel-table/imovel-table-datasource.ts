import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ImovelTableItem {
  Titulo: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ImovelTableItem[] = [
  {id: 1, Titulo: 'Hydrogen'},
  {id: 2, Titulo: 'Helium'},
  {id: 3, Titulo: 'Lithium'},
  {id: 4, Titulo: 'Beryllium'},
  {id: 5, Titulo: 'Boron'},
  {id: 6, Titulo: 'Carbon'},
  {id: 7, Titulo: 'Nitrogen'},
  {id: 8, Titulo: 'Oxygen'},
  {id: 9, Titulo: 'Fluorine'},
  {id: 10, Titulo: 'Neon'},
  {id: 11, Titulo: 'Sodium'},
  {id: 12, Titulo: 'Magnesium'},
  {id: 13, Titulo: 'Aluminum'},
  {id: 14, Titulo: 'Silicon'},
  {id: 15, Titulo: 'Phosphorus'},
  {id: 16, Titulo: 'Sulfur'},
  {id: 17, Titulo: 'Chlorine'},
  {id: 18, Titulo: 'Argon'},
  {id: 19, Titulo: 'Potassium'},
  {id: 20, Titulo: 'Calcium'},
];

/**
 * Data source for the ImovelTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ImovelTableDataSource extends DataSource<ImovelTableItem> {
  data: ImovelTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ImovelTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ImovelTableItem[]): ImovelTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ImovelTableItem[]): ImovelTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'Titulo': return compare(a.Titulo, b.Titulo, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Titulo columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
