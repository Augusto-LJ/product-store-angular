import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Products } from "../services/products.service";

export const getProduct = (route: ActivatedRouteSnapshot) => {
    const productsService = inject(Products);
    return productsService.get(route.params['id']);
}