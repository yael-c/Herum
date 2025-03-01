import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SignInData} from 'src/app/models/Internal/SignInData';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss', '../../../../app/shared/styles/forms.scss']
})
export class SignInComponent implements OnInit {
    loginForm!: FormGroup;
    @Output() onSignIn = new EventEmitter<SignInData>();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            id: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
            armyId: ['', [Validators.required, Validators.pattern(/^\d{6,}$/)]],
        });
    }

    _onSubmit() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value)
        }
        this.onSignIn.emit(this.loginForm.value);
    }
}