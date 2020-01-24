import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User } from 'src/models/user'


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private readonly base_url = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    const url = `${this.base_url}/users`

    return this.http.get<User[]>(url)
  }

  getUserById(user_id): Observable<User> {
    const url = `${this.base_url}/users/${user_id}`

    return this.http.get<User>(url)
  }

  createUser(user: User): Observable<User> {
    const url = `${this.base_url}/user`

    return this.http.post<User>(url, user)
  }

  updateUser(user_id, user: User): Observable<User> {
    const url = `${this.base_url}/user/${user_id}`

    return this.http.put<User>(url, user)
  }

  deleteUser(user_id): Observable<User> {
    const url = `${this.base_url}/user/${user_id}`

    return this.http.delete<User>(url)
  }
}
