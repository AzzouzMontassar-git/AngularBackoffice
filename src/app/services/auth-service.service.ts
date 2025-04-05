// src/app/services/auth-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Pour faire des requêtes HTTP
import { Observable } from 'rxjs'; // Pour gérer les réponses asynchrones

@Injectable({
  providedIn: 'root' // Le service est accessible dans toute l'application
})
export class AuthServiceService {

  // L'URL de base de ton backend Spring Boot
  private baseUrl = 'http://localhost:8088/borrowit/api/auth';

  // Injecte HttpClient dans le constructeur pour pouvoir l’utiliser
  constructor(private http: HttpClient) { }

  // Fonction de login : envoie un objet { email, password } au backend
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Sauvegarde le token JWT dans le localStorage du navigateur
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Récupère le token depuis le localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Supprime le token (déconnexion)
  logout(): void {
    localStorage.removeItem('token');
  }

  // Vérifie si l'utilisateur est connecté (token présent dans le stockage)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
