import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SignUpData} from 'src/app/models/Internal/SignUpData';
import {HttpClient} from "@angular/common/http";

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

    constructor(private fb: FormBuilder,private http: HttpClient) {
    }

    ngOnInit() {
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
            this.http.post('/api/login/create', formData).subscribe({
                next: (response) => {
                    console.log('sign up successful', response);
                    this.onSignUp.emit(formData as any);
                },
                error: (error) => {
                    console.error('sign up failed', error);
                }
            });
        }
        console.log(this.signUpForm.value)
        console.log("after")
        this.onSignUp.emit(this.signUpForm.value as any);
    }
}
