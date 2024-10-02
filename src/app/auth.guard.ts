import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const locoastoragedata=localStorage.getItem('Angular18');

  // debugger
  if(locoastoragedata !==null)
  {
     return true;
  }
  else
  {
    router.navigateByUrl('Login')
    return false;
  }
};
