import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EMPTY_STRING, INTERNAL_PATHS } from '@data/constants/routes';

import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { ClientModule } from '@modules/client/client.module';
import { LoginComponent } from '@modules/client/pages/login/login.component';
import { SignUpComponent } from '@modules/client/pages/signup/sign-up.component';

export const routes: Routes = [
    {
        path: EMPTY_STRING,
        component: SkeletonComponent,
        children: [
            {
                path:INTERNAL_PATHS.CLIENT,
                loadChildren: () => import('@modules/client/client.module').then((m): typeof ClientModule => m.ClientModule),
            },
            {
                path: INTERNAL_PATHS.APP_DEFAULT,
                component: LoginComponent
            },
            {
                path: INTERNAL_PATHS.SIGN,
                component: SignUpComponent
            },
            { path: '**', redirectTo: INTERNAL_PATHS.APP_DEFAULT, pathMatch: 'full'},
        ],
    },
    { path: '**', redirectTo: INTERNAL_PATHS.CLIENT, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }