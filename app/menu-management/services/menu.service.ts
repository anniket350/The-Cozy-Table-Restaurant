import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuItem {
  id?: any; // Optional for new items
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string; // Optional for items without an image
  availability: boolean;
  rating:number[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private baseUrl: string = 'http://localhost:3000/menu-items'; // JSON server URL

  constructor(private http: HttpClient) {}

  // Fetch all menu items
  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.baseUrl);
  }
  
  getMenuItemsById(id:any): Observable<MenuItem> {
    return this.http.get<MenuItem>(this.baseUrl+"/"+id);
  }

  // Add a new menu item
  addMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.baseUrl, menuItem);
  }
   // Get all menu items
   getAllItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.baseUrl);
  }
  // Get menu items by category
  getItemsByCategory(category: string): Observable<MenuItem[]> {
    console.log(category)
    return this.http.get<MenuItem[]>(`${this.baseUrl}/category/${category}`);
  }
  
  // Update a menu item
  updateMenuItem(menuItem: FormData): Observable<MenuItem> {
    const id = menuItem.get('id'); // Extract the ID
    if (!id) {
      throw new Error('Menu item ID is missing.');
    }

    const apiUrl = `${this.baseUrl}/${id}`;
    return this.http.put<MenuItem>(apiUrl, {
      id,
      name: menuItem.get('name'),
      description: menuItem.get('description'),
      price: parseFloat(menuItem.get('price') as string), // Parse price as a number
      category: menuItem.get('category'),
      imageUrl: menuItem.get('imageUrl'),
      availability: menuItem.get('availability') === 'true', // Convert to boolean
    });
  }

  // Delete a menu item
  deleteMenuItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  // Fetch menu items by category and price range
  getItemsByCategoryAndPrice(category: string, maxPrice: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`/api/menu/category/${category}/price`, {
      params: {
        maxPrice: maxPrice.toString() // Sending maxPrice as query parameter
      }
    });
  }
}
