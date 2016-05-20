import { Meteor } from 'meteor/meteor';
import React from 'react';
import sAlert from 'react-s-alert';
import swal from 'sweetalert';

/**
 *  sAlerts defaults
 *  https://github.com/juliancwirko/react-s-alert
 */

// wrapper for simpler calls
export const Notify = {
  success(text, location) {
    sAlert.info(text, {
      effect: 'stackslide',
      position: location || 'top'
    });
  },

  info(text, location) {
    sAlert.info(text, {
      position: location || 'bottom-right'
    });
  },

  warn(text, location) {
    sAlert.warning(text, {
      position: location || 'top-right',
      timeout: 7000
    });
  },

  error(text, location) {
    sAlert.error(text, {
      position: location || 'top',
      timeout: 7000
    });
  }
};


/**
 *  SweetAlert defaults
 *  https://github.com/t4t5/sweetalert
 */
export const Alert = {
  success(title, text) {
    swal(title, text, 'success');
  },

  info(title, text) {
    swal(title, text);
  },

  confirm(options, callback) {
    swal({
      title: options.title || 'Are you sure?',
      text: options.text || '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: options.confirmButtonText || 'Do it!',
      closeOnConfirm: false
    }, () => {
      swal({
        title: 'Success!',
        text: options.successMsg || '',
        type: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      if (typeof callback === 'function') {
        callback();
      }
    });
  },

  input(options, callback) {
    swal({
      title: options.title,
      text: options.text,
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: false,
      animation: 'slide-from-top'
    }, (inputValue) => {
      if (typeof callback === 'function') {
        callback(inputValue);
      }
    });
  },

  error(options) {
    swal(options.title || 'Oops!', options.text || 'Something went wrong.', 'error');
  }
};
