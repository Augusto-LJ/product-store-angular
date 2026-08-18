import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { List } from './features/list/list';
import { inject } from '@angular/core';
import { Products } from './shared/services/products.service';

export const routes: Routes = [
    {
        path: '',
        resolve: {
            products: () => {
                const productsService = inject(Products);
                return productsService.getAll();
            }
        },
        component: List
    },
    {
        path: 'create-product',
        loadComponent: () => import('./features/create/create').then(m => m.Create)
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const productsService = inject(Products);
                return productsService.get(route.params['id']);
            }
        },
        loadComponent: () => import('./features/edit/edit').then(m => m.Edit)
    }
];
