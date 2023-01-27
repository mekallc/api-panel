import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertResult, SweetAlertOptions } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  constructor(
    private toastr: ToastrService,
  ) {}

  setToast(type: string, title: string, message: string, options: any= {}): any {
    if (type === 'error') {
      return this.toastr.error(message, title, options);
    } else if (type === 'info') {
      return this.toastr.info(message, title, options);
    } else if (type === 'warn') {
      return this.toastr.warning(message, title, options);
    }
    return this.toastr.success(message, title, options);
  }

  async setAlert(options: SweetAlertOptions): Promise<SweetAlertResult<any>> {
    return Swal.fire(options);
  }
}
