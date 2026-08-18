import { inject } from "@angular/core";
import { Products } from "../services/products.service";

export const getProducts = () => {
    const productsService = inject(Products);
    return productsService.getAll();
}