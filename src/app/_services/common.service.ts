import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";
import Swal from "sweetalert2";

@Injectable()
export class CommonService {


    user: any;
    public isUserLoggedIn: BehaviorSubject<any> = new BehaviorSubject<any>({});
    public isSupplierChange: BehaviorSubject<any> = new BehaviorSubject<any>({});

    // ------ Local -------- //
    baseURL = "http://localhost:3000/";


    imageUrl: string = '';

    constructor(public http: HttpClient, private router: Router, public toastrService: ToastrService) {
    }

    public showSuccessToast(msg: string, title: string = "Success", options?: any) {
        return this.toastrService.success(msg, title, options);
    }
    public showErrorToast(msg: string = "Something went wrong. Please try again later...", title: string = "Oops!", options?: any) {
        return this.toastrService.error(msg, title, options);
    }
    public showWarningToast(msg: string, title: string = "Warning!", options?: any) {
        return this.toastrService.warning(msg, title, options);
    }
    public showInfoToast(msg: string, title: string = "Info!", options?: any) {
        return this.toastrService.info(msg, title, options);
    }


    viewForm() {
        $(".add-edit-form").fadeIn(1000);
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }
    closeForm() {
        $(".add-edit-form").fadeOut(800);
    }

    /* Show error toaster for 401 server error and do logout*/
    handleServerError(errStatus: any): any {
        if (errStatus && errStatus.status === 401) {
            this.isUserLoggedIn.next({ login: false, err: errStatus });
        }
    }

    getCurrentUser() {
        return localStorage.getItem('CurrentUser') ? JSON.parse(localStorage.getItem('CurrentUser') ?? '') : undefined;
    }
    getUser(): any {
        this.user = this.getCurrentUser();
        return this.user;
    }

    getToken(): string {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        } else {
            return '';
        }
    }

    getHeaderForm() {
        let headers = new HttpHeaders(
            {
                'X-Requested-With': 'XMLHttpRequest',
                "Authorization": 'bearer  ' + localStorage.getItem('token') ?? '',

            }
        );
        return headers;
    }

    getWithoutToken(url: any) {
        let headers = new HttpHeaders(
            {
            }
        );
        return this.http.get(this.baseURL + url, { headers: headers })
            .pipe(
                map(result => {
                    return result
                }),
                catchError(err => {
                    if (err) {
                        this.handleServerError(err);
                    }
                    return throwError(err);
                })
            )
    }

    postWithoutToken(url: any, data: any) {

        let headers = new HttpHeaders(
            {
                'Access-Control-Allow-Origin': '*'
            }
        );

        return this.http.post(this.baseURL + url, data, { headers: headers })
            .pipe(
                map(result => {
                    return result;
                }),
                catchError(err => {
                    if (err) {
                        this.handleServerError(err);
                    }
                    return throwError(err);
                })
            )
    }

    getHeader() {
        let headers = new HttpHeaders(
            {
                "Authorization": 'bearer ' + localStorage.getItem('token') ?? ''
            }
        );
        return headers;
    }

    get(url: any) {
        return this.http.get(this.baseURL + url, { headers: this.getHeader() })
            .pipe(
                map(result => {
                    return result
                }),
                catchError(err => {
                    if (err) {
                        this.handleServerError(err);
                    }
                    return throwError(err);
                })
            )
    }

    post(url: any, data?: any) {

        return this.http.post(this.baseURL + url, data ? data : {}, { headers: this.getHeader() })
            .pipe(
                map(result => {
                    return result
                }),
                catchError(err => {
                    if (err) {
                        this.handleServerError(err);
                    }
                    return throwError(err);
                })
            )
    }




    put(url: any, data?: any) {
        return this.http.put(this.baseURL + url, data ? data : {}, { headers: this.getHeader() })
            .pipe(
                map(result => {
                    return result
                }),
                catchError(err => {
                    if (err) {
                        this.handleServerError(err);
                    }
                    return throwError(err);
                })
            )
    }

    delete(url: any) {
        return this.http.delete(this.baseURL + url, { headers: this.getHeader() })
            .pipe(
                map(result => {
                    if (result)
                        return result
                    return null
                }),
                catchError(err => {
                    if (err) {
                        this.handleServerError(err);
                    }
                    return throwError(err);
                })
            )
    }



    deleteData(API: any, Next: any) {
        const swalWithBootstrapButtons: any = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-danger",
                cancelButton: "btn l-cyan"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            })
            .then((result: any): any => {
                if (result.value) {
                    API.subscribe(
                        (responce: any) => {
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "Your data has been deleted.",
                                "success"
                            );
                            Next.next(true);
                        },
                        (error: any) => {
                            let error_message = error.error;
                            swalWithBootstrapButtons.fire(
                                "Error",
                                error_message.Message,
                                "error"
                            );
                            return true;
                        }
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your imaginary data is safe :)",
                        "error"
                    );
                    return true;
                }
            });
        return true;
    }
}
