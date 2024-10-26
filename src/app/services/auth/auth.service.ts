import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth, ResponseAuth } from '../../interfaces/auth';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroments';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = apiUrl;
  private currentUser: IAuth | null = {
    userType: 'regularType',
    token: '',
    username: '',
    timeExpiration: new Date(),
  };

  constructor(private http: HttpClient, private router: Router) { 
    this.loadUserFromLocalStorage()
  }

  login(email: string, password: string, isMock = false): Promise<IAuth> {
    const payload = { email, password };
    return new Promise((resolve, reject) => {
      if (isMock) {
        const user: IAuth = {
          userType: 'adminType',
          token: 'token',
          username: 'username',
          timeExpiration: new Date(new Date().getDate() + 1),
        };
        this.setCurrentUser(user);
        resolve(user);

      }
      this.http.post<ResponseAuth>(`${this.apiUrl}/login`, payload).subscribe(
        (data) => {
          const mapperResponseAuth: IAuth = {
            userType: data.data.role[0] === 'admin' ? 'adminType' : 'regularType',
            token: data.data.access_token,
            username: data.data.user.name,
            timeExpiration: new Date(new Date().getDate() + 1),
          }
          this.currentUser = mapperResponseAuth;
          this.setCurrentUser(mapperResponseAuth);
          resolve(mapperResponseAuth);
        },
        (error) => {
          reject(error);
          this.currentUser = null;
        }
      );
    });
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  getCurrentUser(): IAuth | null {
    return this.currentUser;
  }

  private loadUserFromLocalStorage() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  private setCurrentUser(user: IAuth) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  register(name: string, email: string, password: string): Promise<IAuth> {
    const payload = { name, email, password };
    return new Promise((resolve, reject) => {
      this.http.post<ResponseAuth>(`${this.apiUrl}/register`, payload).subscribe(
        (data) => {
          const mapperResponseAuth: IAuth = {
            token: data.data.access_token,
            username: data.data.user.name,
            timeExpiration: new Date(new Date().getDate() + 1),
            userType: data.data.role[0] === 'admin' ? 'adminType' : 'regularType',
          }
          this.currentUser = mapperResponseAuth;
          this.setCurrentUser(mapperResponseAuth);
          resolve(mapperResponseAuth);
        },
        (error) => {
          reject(error);
          this.currentUser = null;
        }
      );
    });

  }
}
