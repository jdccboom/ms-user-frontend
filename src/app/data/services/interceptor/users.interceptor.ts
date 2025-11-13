import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../utils/token.service';


export const usersInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor ejecutado para:', req.url);

  const tokenService = inject(TokenService);
  if (!tokenService.isLogged()) {
    console.log('No hay sesión activa, pasando la solicitud sin cambios.');
    return next(req);
  }

  const token = tokenService.getToken();
  console.log('Token obtenido:', token);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  });

  return next(authReq);
};
