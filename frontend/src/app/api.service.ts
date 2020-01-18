import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly url = 'http://localhost:8095/users';

  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getAllAlunos(): Observable<User[]> {  
    return this.http.get<User[]>(this.url);  
  }  

  getAlunoById(userid: string): Observable<User> {  
    const apiurl = `${this.url}/${userid}`;
    return this.http.get<User>(apiurl);  
  } 
  createAluno(user: User): Observable<User> {  
    return this.http.post<User>(this.url, user);  
  }  
  updateAluno(userid: string, user: User): Observable<User> {  
    const apiurl = `${this.url}/${userid}`;
    return this.http.put<User>(apiurl, user);  
  }  
  deleteAlunoById(userid: string): Observable<number> {  
    const apiurl = `${this.url}/${userid}`;
    return this.http.delete<number>(apiurl);  
  } 
}
