import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, ValidationErrors, Validators} from '@angular/forms';
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

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    }

    updateUserType(x: any) {
        this.signUpForm.controls.userType.patchValue(x);
    }

    _onSubmit() {
        this.signUpForm.markAllAsTouched();
        if (this.signUpForm.valid) {
            const formData = this.signUpForm.value;
            this.authService.signUp(formData).subscribe({
                next: (response) => {
                    this.onSignUp.emit(formData as any);
                    this.goToHomePage();
                },
                error: (error) => {
                    console.error('Sign-up failed', error);
                }
            });
        }
    }

    goToHomePage() {
        this.router.navigate(['/homepage']);
    }

    getErrorMessage(errors: ValidationErrors | null): string {
        if (!errors) return '';
        if (errors['required']) return 'שדה חובה';
        if (errors['pattern']) return 'שדה לא תקין';
        return 'שגיאה';
    }
}
