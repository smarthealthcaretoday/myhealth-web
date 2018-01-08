import {Component, OnInit} from "@angular/core";
import {User} from "./user";
import {Credentials} from "./credentials";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  user: User;
  credentials: Credentials;
  submitted: boolean;
  router: Router;

  constructor(private loginService: LoginService, router: Router) {
    this.router = router;
  }

  ngOnInit() {
    this.credentials = new Credentials();
    this.submitted = false;
  }

  onSubmit() {
    this.loginService.login(this.credentials).subscribe(
      res => {
        localStorage.setItem('currentUser', this.credentials.email);
        this.router.navigate(['dashboard']);
        console.log(res)
      });


    this.submitted = true;
  }
}
