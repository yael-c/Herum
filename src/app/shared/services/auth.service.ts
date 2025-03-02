import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<SessionResponse>('/api/login', data).pipe(tap({
      next: (response) => {
        localStorage.setItem('session-id', response.sessionId);
      }
    }));
  }

  isAuthenticated(){
    return !!localStorage.getItem('session-id');
  }
}


type SessionResponse = {
  sessionId: string;
}