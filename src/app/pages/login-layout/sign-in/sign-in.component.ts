import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SignInData} from 'src/app/models/Internal/SignInData';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss', '../../../../app/shared/styles/forms.scss']
})
export class SignInComponent implements OnInit {
    loginForm = this.fb.group({
        PersonalId: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        MilitaryId: ['', [Validators.required, Validators.pattern(/^\d{6,}$/)]],
    });    @Output() onSignIn = new EventEmitter<SignInData>();

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.goToHomePage();
        }
    }

    _onSubmit() {
        this.loginForm.markAllAsTouched();
        if (this.loginForm.valid) {
            const formData = this.loginForm.value;
            console.log(formData)
            this.authService.login(formData).subscribe({
                next: () => {
                    this.onSignIn.emit(formData as any);
                    this.goToHomePage();
                },
                error: (error) => {
                    console.error('Login failed', error);
                }
            });
        }
        this.onSignIn.emit(this.loginForm.value as any);
    }

    goToHomePage() {
        this.router.navigate(['/homepage']);
    }
}
