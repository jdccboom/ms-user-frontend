import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Movie } from '@data/interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private readonly _http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  private movies: Movie[] = []
  
  private moviesSubject = new BehaviorSubject<Movie[]>(this.movies)

  searchMovies(filters: any, page: number = 0, size: number = 12, sort?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) params = params.set('sort', sort);

    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params = params.set(key, filters[key]);
      }
    });
    return this._http.get<any>(`${this.API_URL}/movie/search`, { params});
  }

  getMovies(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/movie/search?id=${movieId}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this._http.post<Movie>(`${this.API_URL}/movie`, movie);
  }

  updateMovie(updatedMovie: Movie): Observable<Movie> {
    return this._http.put<Movie>(`${this.API_URL}/movie/${updatedMovie.id}`, updatedMovie);
  }

  deleteMovie(id: number): Observable<any> {
    return this._http.delete(`${this.API_URL}/movie/${id}`);
  }

}
