import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'ss-login',
    templateUrl: './login.component.html',
  })

export class LoginComponent implements OnInit {

  loginform: FormGroup;
  formErrors = {
    password : '',
    username : ''
  };
  validationMessages = {
    password: {
      required: 'Name is required.',
      minlength: 'Name must be 3 characters.',
      maxlength: 'Name can\'t be longer than 6 characters.'
    },
    username: {
      required: 'Username is required.',
      minlength: 'Username must be 3 characters.'
    }
  };

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
      // build the data model for our form
      this.buildForm();
    }

    buildForm() {
      // build our form
      this.loginform = this.fb.group({
        password: ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
        username: ['', [Validators.required, Validators.minLength(3)]]
      });
      // watch for changes and validate
      this.loginform.valueChanges.subscribe(data => this.validateForm());
    }

    validateForm() {
      if (this.formErrors) {
        // tslint:disable-next-line:forin
        for (let field in this.formErrors) {
          // clear that input field errors
          this.formErrors[field] = '';

          // grab an input field by name
          let input = this.loginform.get(field);

          if (input.invalid && input.dirty) {
            // tslint:disable-next-line:forin
            for (let error in input.errors) {
              // assign that type of error message to a variable
              this.formErrors[field] = this.validationMessages[field][error];
            }
          }
        }
      }
      }

      processForm() {
        if (this.loginform.valid) {
          console.log('processing', this.loginform.value);
          this.router.navigate(['/aboutus']);
        }
      }

  }


