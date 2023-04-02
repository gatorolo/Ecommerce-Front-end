import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Social } from '../modelos/social';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private apiServerUrl='http://localhost:8080'

  constructor(private http: HttpClient) { }

  public getSocial():Observable<Social[]> {
    return this.http.get<Social[]>(`${this.apiServerUrl}/social/all`);
}
public addSocial(social: Social):Observable<Social>{
  return this.http.post<Social>(`${this.apiServerUrl}/social/add`, social);
}

public updateSocial(social: Social):Observable<Social>{
  return this.http.put<Social>(`${this.apiServerUrl}/social/update`, social);
}

public deleteSocial(idSoc: number):Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/social/delete/${idSoc}`);
}
}
