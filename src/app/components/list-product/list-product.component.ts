import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private toast: ToastrService
  ) {}
  listProduct: Products[] = [];

  ngOnInit(): void {
    this.getAllProduct();
  }
  getAllProduct() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.listProduct = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDelete(id: any) {
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        this.toast.success('Delete product', 'Successfully...');
        this.getAllProduct();
      },
      (error) => {
        console.log(error);
      }
    );
    // console.log(id);
  }
}
