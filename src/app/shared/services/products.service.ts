import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Service()
export class Products {
    httpClient = inject(HttpClient);

    getAll() {
        return this.httpClient.get<Product[]>('/api/products');
    }
}
