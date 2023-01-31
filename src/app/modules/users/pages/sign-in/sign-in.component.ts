import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from '@core/services/fire.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  item: any;
  form!: FormGroup;
  formPass!: FormGroup;
	closeResult = '';

  constructor(
    private fb: FormBuilder,
    private fireService: FireService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.loadForm();
  }

  async onSubmit() {
    const { email, password } =this.form.value;
    const item = await this.fireService.login(email, password);
    if (!item.auth) {
      this.item = item;
    } else {
      this.router.navigate(['pages', 'home']);
    }
    console.log(item);

  }

  async onForgot() {
    const { email } = this.formPass.value;
    this.item = await this.fireService.forgotPassword(email);
    timer(500).subscribe(() => this.modalService.dismissAll());
  }

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  private loadForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.formPass = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

}
