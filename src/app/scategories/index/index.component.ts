import { Component, OnInit, ViewChild } from '@angular/core';
import { ScategoriesService } from '../scategories.service';
import { Scategories } from '../scategories';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-scategories-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class ScategoriesComponent implements OnInit {
  constructor(public scategoriesService: ScategoriesService) {}

  scategories: MatTableDataSource<Scategories>;
  columns: string[] = ['imagescategorie', 'nomscategorie', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  filter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.scategories.filter = filter.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.scategoriesService.getAll().subscribe((data: Scategories[]) => {
      this.scategories = new MatTableDataSource<Scategories>(data);
      this.scategories.paginator = this.paginator;
      this.scategories.sort = this.sort;
    });
  }

  viewScategorie(scategoryId: string) {
    // Implémentez la logique pour afficher une scategorie
    // Par exemple, redirigez l'utilisateur vers la page de détails de la scategorie.
  }

  editScategorie(scategoryId: string) {
    // Implémentez la logique pour éditer une scategorie
    // Par exemple, redirigez l'utilisateur vers la page de modification de la scategorie.
  }

  deleteScategorie(_id: object) {
    this.scategoriesService.delete(_id).subscribe((res) => {
      console.log(res);
      const data = this.scategories.filteredData.filter(
        (item: { _id: object }) => item._id !== _id
      );
      this.scategories = new MatTableDataSource<Scategories>(data);
      this.scategories.paginator = this.paginator;
      this.scategories.sort = this.sort;
    });
  }
}
