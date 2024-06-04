import {Component} from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  highscores: any[] = [];

  constructor(private router: Router, private http: HttpClient) {
  }

  sendHighscore() {
    const token = localStorage.getItem('token');
    const highscoreData = {username: 'player1', score: 100, token};
    this.http.post('http://localhost:3000/highscores', highscoreData).subscribe(
      response => {
        console.log('Highscore sent', response);
      },
      error => {
        console.log('Error:', error);
      }
    );
  }

  getHighscores() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.http.get('http://localhost:3000/highscores', {headers}).subscribe(
      (response: any) => {
        console.log('Highscores:', response);
        this.highscores = response;
        //this.router.navigate(['/highscore'], { state: { highscores: response } });
      },
      error => {
        console.log('Error:', error);
      }
    );
  }

  logout() {
    const token = localStorage.getItem('token');
    this.http.delete('http://localhost:3000/sessions', {body: {token}}).subscribe(
      response => {
        console.log('Logout successful', response);
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      error => {
        console.log('Error:', error);
      }
    );
  }
}
