import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    // Convert search term to lowercase for case-insensitive search
    searchTerm = searchTerm.toLowerCase();

    // Filter items based on search term matching any property
    return items.filter(item =>
      item.first.toLowerCase().includes(searchTerm) ||
      item.address.toLowerCase().includes(searchTerm) ||
      item.mobile.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.dob.toLowerCase().includes(searchTerm)
    );
  }

}
