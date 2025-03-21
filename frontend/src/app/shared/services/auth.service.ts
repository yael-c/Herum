import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private authenticate(url: string, data: any) {
    return this.http.post<SessionResponse>(url, data).pipe(
      tap({
        next: (response) => {
          localStorage.setItem('session-id', response.sessionId);
        },
      }),
    );
  }

  login(data: any) {
    return this.authenticate('/api/login', data);
  }

  signUp(data: any) {
    return this.authenticate('/api/login/create', data);
  }

  isAuthenticated() {
    return !!localStorage.getItem('session-id');
  }
}

type SessionResponse = {
  sessionId: string;
};
