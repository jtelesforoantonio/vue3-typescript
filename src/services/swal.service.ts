import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  icon: 'success',
  toast: true,
  position: 'top',
  timer: 1000,
  timerProgressBar: true,
  showConfirmButton: false,
});

export const ErrorAlert = Swal.mixin({
  title: 'Something went wrong, try again please',
  icon: 'error',
});

export const DeleteAlert = Swal.mixin({
  icon: 'warning',
  showConfirmButton: true,
  showCancelButton: true,
  reverseButtons: true,
});

