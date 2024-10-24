import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Categories } from '../categories';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-index',
  templateUrl:  './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(public categoriesService: CategoriesService) {}

  categories: MatTableDataSource<Categories>;
  columns: string[] = ['imagecategorie', 'nomcategorie', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  filter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.categories.filter = filter.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe((data: Categories[]) => {
      this.categories = new MatTableDataSource<any>(data);
      this.categories.paginator = this.paginator;
      this.categories.sort = this.sort;
    });
  }

  viewCategorie(categoryId: string) {
    // Implémentez la logique pour afficher une catégorie
    // Par exemple, redirigez l'utilisateur vers la page de détails de la catégorie.
  }

  editCategorie(categoryId: string) {
    // Implémentez la logique pour éditer une catégorie
    // Par exemple, redirigez l'utilisateur vers la page de modification de la catégorie.
  }

  deleteCategorie(_id: object) {
    this.categoriesService.delete(_id).subscribe((res) => {
      console.log(res);
      const data = this.categories.filteredData.filter(
        (item: { _id: object }) => item._id !== _id
      );
      this.categories = new MatTableDataSource<any>(data);
      this.categories.paginator = this.paginator;
      this.categories.sort = this.sort;
    });
  }
}
