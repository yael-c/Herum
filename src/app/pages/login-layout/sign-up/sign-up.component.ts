import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SignUpData} from 'src/app/models/Internal/SignUpData';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: [
        './sign-up.component.scss',
        '../../../../app/shared/styles/forms.scss',
    ],
})
export class SignUpComponent {
    signUpForm = this.fb.group({
        FirstName: ['', [Validators.required, Validators.pattern(/^[a-z א-ת,.'-]+$/i)]],
        LastName: ['', [Validators.required, Validators.pattern(/^[a-z א-ת,.'-]+$/i)]],
        ReferringUser: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        PersonalId: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        MilitaryId: ['', [Validators.required, Validators.pattern(/^\d{6,}$/)]],
        userType: ['', Validators.required],
    });
    @Output() onSignUp = new EventEmitter<SignUpData>();

    options: { name: string; id: string }[] = [
        {
            name: 'סדיר',
            id: 'sadir',
        },
        {
            name: 'מילואים',
            id: 'miluim',
        },
    ];

    selectedOption: string = '';

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    }

    updateUserType(x: any) {
        this.signUpForm.controls.userType.patchValue(x);
        console.log(this.signUpForm.value)
    }

    _onSubmit() {
        this.signUpForm.markAllAsTouched();
        console.log("onsubmit sign up")
        console.log(this.selectedOption)
        if (this.signUpForm.valid) {
            const formData = this.signUpForm.value;
            console.log(formData)
            this.authService.signUp(formData).subscribe({
                next: (response) => {
                    console.log('sign up successful', response);
                    this.onSignUp.emit(formData as any);
                    this.goToHomePage();
                },
                error: (error) => {
                    console.error('Sign-up failed', error);
                }
            });
        }
        console.log(this.signUpForm.value)
        this.onSignUp.emit(this.signUpForm.value as any);
    }

    goToHomePage() {
        this.router.navigate(['/homepage']);
    }
}
