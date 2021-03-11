import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Products } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;
  title = 'Create product...';
  id!: string | null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
    private aRoute: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editProduct();
  }
  createProduct() {
    const PRODUCT: Products = {
      name: this.productForm.get('product')?.value,
      category: this.productForm.get('category')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
    };
    if (this.id !== null) {
      this.productService.updateProduct(this.id, PRODUCT).subscribe(
        (data) => {
          this.toastr.info('Update product', 'Successfully....!');
          this.router.navigate(['/']);
        },
        (error) => {
          this.productForm.reset();
        }
      );
    } else {
      this.productService.createProduct(PRODUCT).subscribe(
        (data) => {
          this.toastr.success('Create new product', 'Successfully....!');

          this.router.navigate(['/']);
        },
        (error) => {
          this.productForm.reset();
        }
      );
    }
  }
  ////
  editProduct() {
    if (this.id !== null) {
      this.title = 'Edit product';
      this.productService.editProduct(this.id).subscribe((data) => {
        this.productForm.setValue({
          product: data.name,
          category: data.category,
          description: data.description,
          price: data.name,
        });
      });
    }
  }
}
