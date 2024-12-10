"use strict";



define('cab-booking-application/app', ['exports', 'cab-booking-application/resolver', 'ember-load-initializers', 'cab-booking-application/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = void 0;

  Ember.MODEL_FACTORY_INJECTIONS = true;

  App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('cab-booking-application/components/auth-links', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('cab-booking-application/components/cab-form-input', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    label: '',
    id: '',
    value: '',
    type: 'text',
    placeholder: '',
    read: '',
    actions: {
      updateValue: function updateValue(newValue) {
        this.set('value', newValue);
      }
    }
  });
});
define('cab-booking-application/components/confirm-dialog', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    alertService: Ember.inject.service('alert'),

    actions: {
      proceed: function proceed() {
        this.get('alertService').proceed();
      },
      cancel: function cancel() {
        this.get('alertService').cancel();
      }
    }
  });
});
define('cab-booking-application/components/data-table', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    currentRole: Ember.inject.service(),
    presentRole: Ember.computed('currentRole.currentRole', function () {
      return this.get('currentRole').getRole();
    }),
    data: null,
    columns: null,
    columnKeys: null,
    action: null,
    passedAction: null,

    actions: {
      report: function report(item) {
        if (this.get('passedAction')) {
          this.get('passedAction')(item);
        }
      }
    }
  });
});
define('cab-booking-application/components/driver-form', ['exports', 'cab-booking-application/utils/api-request', 'cab-booking-application/utils/logout'], function (exports, _apiRequest, _logout) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        alertService: Ember.inject.service('alert'),
        companyNames: [],
        companyName: '',
        modelName: '',
        registerNumber: '',
        licenseNumber: '',
        errorMessage: '',
        companyNameError: '',
        modelNameError: '',
        registerNumberError: '',
        licenseNumberError: '',
        getCompanyNames: function getCompanyNames() {
            var self = this;
            (0, _apiRequest.default)("http://localhost:8080/api/v1/companies", "GET", null, this).then(function (response) {
                self.set('companyNames', response);
            }).catch(function (error) {
                self.set('errorMessage', error.message);
            });
        },

        cabModels: [{ value: "", label: "Select cabModel" }, { value: "Sedan", label: "Sedan" }, { value: "Suv", label: "Suv" }, { value: "Hatchback", label: "HatchBack" }],
        init: function init() {
            this._super.apply(this, arguments);
            this.getCompanyNames();
        },

        actions: {
            driverForm: function driverForm() {
                var companyName = this.get('companyName');
                var modelName = this.get('modelName');
                var registerNumber = this.get('registerNumber');
                var licenseNumber = this.get('licenseNumber');
                var userId = localStorage.getItem('userId');
                var self = this;
                if (companyName === '') {
                    this.set('companyNameError', 'Please enter companyName');
                    return;
                } else {
                    this.set('companyNameError', '');
                }
                if (modelName === '') {
                    this.set('modelNameError', 'Please enter modelName');
                    return;
                } else {
                    this.set('modelNameError', '');
                }
                if (registerNumber === '') {
                    this.set('registerNumberError', 'Please enter registerNumber');
                    return;
                } else {
                    this.set('registerNumberError', '');
                }
                if (licenseNumber === '') {
                    this.set('licenseNumberError', 'Please enter licenseNumber');
                    return;
                } else {
                    this.set('licenseNumberError', '');
                }
                var userdata = {
                    companyName: companyName,
                    modelName: modelName,
                    registerNumber: registerNumber,
                    licenseNumber: licenseNumber
                };

                console.log(modelName, registerNumber, licenseNumber, companyName);

                (0, _apiRequest.default)('http://localhost:8080/api/v1/users/' + userId + '/drivers', 'POST', userdata, this).then(function (response) {
                    self.setProperties({
                        companyName: '',
                        modelName: '',
                        registerNumber: '',
                        licenseNumber: '',
                        isFormVisible: false
                    });
                    (0, _logout.default)(self);
                }).catch(function (error) {
                    if (error.message === 'RegisterNumber is invalid' || error.message == 'RegisterNumber is already present') {
                        self.set('registerNumberError', error.message);
                    } else if (error.message === 'License number is invalid' || error.message === 'License number is already present') {
                        self.set('licenseNumberError', error.message);
                    } else {
                        console.error('Form submission error: ', error.message);
                    }
                });
            }
        }
    });
});
define('cab-booking-application/components/dynamic-action-table', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        data: null,
        columns: null,
        columnKeys: null,
        action: null,
        passedAction: null
    });
});
define("cab-booking-application/components/edit-action-table", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        data: null,
        columns: null,
        columnKeys: null,
        primaryAction: null,
        secondaryAction: null,
        primaryActionName: "",
        secondaryActionName: ""
    });
});
define("cab-booking-application/components/fixed-action-table", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        data: null,
        columns: null,
        columnKeys: null,
        action: null,
        primaryAction: null,
        secondaryAction: null,
        primaryActionName: "",
        secondaryActionName: "",
        // console.log('we')
        actions: {
            report: function report(item) {
                if (this.get('primaryAction')) {
                    this.get('primaryAction')(item);
                }
            }
        }
    });
});
define('cab-booking-application/components/nav-bar', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    alertService: Ember.inject.service('alert'),
    currentRole: Ember.inject.service('current-role'),
    presentRole: Ember.computed('currentRole.currentRole', function () {
      return this.get('currentRole').getRole();
    }),
    switchUser: Ember.computed('presentRole', function () {
      var presentRole = this.get('presentRole');
      var defaultRole = localStorage.getItem('role');
      if (defaultRole === 'driver' && presentRole === 'user') {
        return "SWITCH TO DRIVER";
      } else if (defaultRole === 'admin' && presentRole === 'user') {
        return "SWITCH TO ADMIN";
      } else if (defaultRole === 'superAdmin' && presentRole === 'user') {
        return "SWITCH TO SUPERADMIN";
      } else if (defaultRole === 'user' && presentRole === 'user') {
        return "UPGRADE TO DRIVER";
      } else {
        return "SWITCH TO USER";
      }
    }),
    isFormVisible: false,

    actions: {
      switchRole: function switchRole() {
        var switchuser = Ember.getOwner(this).lookup('router:main');
        var defaultRole = localStorage.getItem('role');
        var presentRole = this.get('currentRole').getRole();
        if (defaultRole === 'driver' && presentRole === 'user') {
          this.get('currentRole').setRole('driver');
          switchuser.transitionTo('drivers');
        } else if (defaultRole === 'admin' && presentRole === 'user') {
          this.get('currentRole').setRole('admin');
          switchuser.transitionTo('companies');
        } else if (defaultRole === 'superAdmin' && presentRole === 'user') {
          this.get('currentRole').setRole('superAdmin');
          switchuser.transitionTo('companies');
        } else if (defaultRole === 'user' && presentRole === 'user') {
          this.set('isFormVisible', true);
        } else {
          this.get('currentRole').setRole('user');
          switchuser.transitionTo('users');
        }
      },
      closeForm: function closeForm() {
        this.set('isFormVisible', false);
      }
    }

  });
});
define('cab-booking-application/components/side-bar', ['exports', 'cab-booking-application/utils/logout'], function (exports, _logout) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        currentRoute: Ember.inject.service(),
        activeRoute: Ember.computed('currentRoute.currentRoute', function () {
            return this.get('currentRoute.currentRoute');
        }),
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service(),
        presentRole: Ember.computed('currentRole.currentRole', function () {
            return this.get('currentRole').getRole();
        }),

        actions: {
            logoutUser: function logoutUser() {

                (0, _logout.default)(this);
            }
        }
    });
});
define('cab-booking-application/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('cab-booking-application/controllers/booking', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service('current-role'),
        presentRole: Ember.computed('currentRole.currentRole', function () {
            return this.get('currentRole').getRole();
        }),
        otpError: '',
        otp: '',
        errorMessage: '',
        actions: {
            cancelBooking: function cancelBooking(booking) {
                var _this = this;

                var userId = localStorage.getItem('userId');
                var rideId = booking.ride_id;
                var self = this;
                this.get('alertService').confirm('Are you sure you want to cancel this ride?').then(function (confirmed) {
                    if (!confirmed) {
                        return;
                    }
                    var data = {
                        status: 'cancelled'
                    };
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/users/' + userId + '/rides/' + rideId, 'PUT', data, _this).then(function (response) {
                        self.get('alertService').alert("Ride has been cancelled successfully");
                        self.transitionToRoute('users');
                        self.set('otp', '');
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                    });
                });
            },
            startRide: function startRide(booking) {
                var userId = localStorage.getItem('userId');
                var companyId = localStorage.getItem('companyId');
                var rideId = booking.ride_id;
                var cabId = localStorage.getItem('cabId');
                var otp = this.get('otp');
                var self = this;
                if (!otp) {
                    this.set('otpError', 'Please enter otp');
                    return;
                } else {
                    this.set('otpError', '');
                }

                var data = {
                    status: 'started',
                    rideId: rideId,
                    Otp: otp
                };

                (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId + '/cabs/' + cabId + '/rides/' + rideId, "PUT", data).then(function (response) {
                    self.get('alertService').alert("Ride has been started successfully");
                    Ember.set(booking, 'status', 'Started');
                    console.log(response);
                }).catch(function (error) {
                    if (error.message === 'invalid Otp') {
                        self.set('otpError', 'Please enter valid otp');
                    } else {
                        console.log(error.message);
                    }
                });
            },
            completeRide: function completeRide(booking) {
                var userId = localStorage.getItem('userId');
                var companyId = localStorage.getItem('companyId');
                var cabId = localStorage.getItem('cabId');
                var rideId = booking.ride_id;
                console.log(rideId);
                var self = this;
                var data = {
                    status: 'completed',
                    rideId: rideId
                };
                (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId + '/cabs/' + cabId + '/rides/' + rideId, "PUT", data).then(function (response) {
                    self.get("alertService").alert("Ride has been completed successfully");
                    console.log('Ride compleeted successfully');
                    self.transitionToRoute('drivers');
                }).catch(function (error) {
                    self.set('errorMessage', error.message);
                    console.log(error.message);
                });
            }
        }
    });
});
define('cab-booking-application/controllers/companies', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define('cab-booking-application/controllers/companies/details', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        errorMessage: '',
        actions: {
            deleteCompany: function deleteCompany(details) {
                var _this = this;

                var companyId = details.company_id;
                var self = this;
                this.get('alertService').confirm("Are you sure you want to delete this company?").then(function (confirmed) {
                    if (!confirmed) {
                        return;
                    }
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId, 'DELETE', null, _this).then(function (response) {
                        self.get('model').removeObject(details);
                        self.get('alertService').alert("Company has been successfully deleted");
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                    });
                });
            }
        }
    });
});
define('cab-booking-application/controllers/companies/drivers', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        errorMessage: '',
        actions: {
            blockDriver: function blockDriver(details) {
                var _this = this;

                var driverStatus = details.status;
                var companyId = localStorage.getItem('companyId');
                var driverId = details.user_id;
                var status = 'blocked';
                var self = this;
                var popUpMessage = 'Are you sure you want to block this driver?';
                if (driverStatus === 'Blocked') {
                    status = 'approved';
                    popUpMessage = 'Are you sure you want to unblock this driver?';
                }
                if (driverStatus === 'Approved' && details.report_count == 0) {
                    popUpMessage = 'The driver has no reports against them (report count: 0). Are you sure you want to block this driver?';
                }
                this.get('alertService').confirm(popUpMessage).then(function (confirmed) {
                    if (!confirmed) {
                        return;
                    }

                    var data = {
                        status: status
                    };
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + driverId, 'PUT', data, _this).then(function (response) {
                        if (status === 'blocked') {
                            Ember.set(details, 'status', 'Blocked');
                            self.get('alertService').alert("The driver has been successfully blocked");
                        } else if (status === 'approved') {
                            Ember.set(details, 'status', 'Approved');
                            self.get('alertService').alert("The driver has been successfully unblocked");
                        }
                        console.log(response.message);
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                        console.log(error.message);
                    });
                });
            }
        }
    });
});
define('cab-booking-application/controllers/companies/fares', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        errorMessage: '',
        actions: {
            editFare: function editFare(item) {
                if (!item.hasOwnProperty('isEditingFare')) {
                    Ember.set(item, 'isEditingFare', true);
                } else {
                    Ember.set(item, 'isEditingFare', true);
                }
            },
            updateFare: function updateFare(details) {
                var companyId = localStorage.getItem('companyId');
                var modelId = details.cab_type_id;
                var fareId = details.fare_id;
                var self = this;
                var data = {
                    fare: details.fare_per_km
                };
                (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/cabs/' + modelId + '/fares/' + fareId, 'PUT', data, this).then(function (response) {
                    Ember.set(details, 'isEditingFare', false);
                    self.get('alertService').alert("fare updated successfully");
                    console.log(response.message);
                }).catch(function (error) {
                    self.set('errorMessage', error.message);
                    console.log(error.message);
                });
            },
            cancelEdit: function cancelEdit(item) {
                Ember.set(item, 'isEditingFare', false);
            }
        }
    });
});
define('cab-booking-application/controllers/companies/index', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service(),
        presentRole: Ember.computed('currentRole.currentRole', function () {
            return this.get('currentRole').getRole();
        }),
        errorMessage: '',
        checkIfModelEmpty: function checkIfModelEmpty() {
            if (this.get('model.length') === 0) {
                this.set('errorMessage', 'Requests is Empty');
            } else {
                this.set('errorMessage', '');
            }
        },

        actions: {
            approveDriverRequest: function approveDriverRequest(driverDetails) {
                var _this = this;

                var userId = driverDetails.user_id;
                var companyId = localStorage.getItem('companyId');
                var self = this;
                var data = {
                    status: 'approved'
                };
                this.get('alertService').confirm('Are you sure you want to accept this driver request?').then(function (confirmed) {
                    if (!confirmed) {
                        return;
                    }
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId, 'PUT', data, _this).then(function (response) {
                        self.get('model').removeObject(driverDetails);
                        self.checkIfModelEmpty();
                        self.get('alertService').alert('Driver has been approved successfully');
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                    });
                });
            },
            cancelDriverRequest: function cancelDriverRequest(driverDetails) {
                var _this2 = this;

                var userId = driverDetails.user_id;
                var companyId = localStorage.getItem('companyId');
                var self = this;
                this.get('alertService').confirm('Are you sure you want to cancel this driver request?').then(function (confirmed) {
                    if (!confirmed) {
                        return;
                    }
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId, 'DELETE', null, _this2).then(function (response) {
                        self.get('model').removeObject(driverDetails);
                        self.checkIfModelEmpty();
                        self.get('alertService').alert('The driver request has been cancelled successfully');
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                        console.log(error.message);
                    });
                });
            },
            cancelAdminRequest: function cancelAdminRequest(details) {
                var _this3 = this;

                var userId = details.admin_id;
                var companyId = details.company_id;
                var self = this;
                this.get('alertService').confirm('Are you sure you want to cancel this company request?').then(function (confirmed) {
                    if (!confirmed) {
                        return;
                    }
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId, 'DELETE', null, _this3).then(function (response) {
                        self.get('model').removeObject(details);
                        self.checkIfModelEmpty();
                        self.get('alertService').alert("The company request has been deleted successfully");
                        // console.log(response);
                        // alert(response.message);
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                        console.log(error.message);
                    });
                });
            },
            approveAdminRequest: function approveAdminRequest(details) {
                var _this4 = this;

                var companyId = details.company_id;
                var self = this;
                var data = {
                    status: 'approved'
                };
                this.get('alertService').confirm('Are you sure you want to accept this company request?').then(function (confirmed) {
                    if (!confirmed) {
                        return;
                    }
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId, 'PUT', data, _this4).then(function (response) {
                        self.get('model').removeObject(details);
                        self.checkIfModelEmpty();
                        // console.log(response);
                        self.get('alertService').alert("The company request has been accepted successfully");
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                        console.log(error.message);
                    });
                });
            }
        }
    });
});
define('cab-booking-application/controllers/companies/users', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        errorMessage: '',
        actions: {
            blockUser: function blockUser(details) {
                var userId = details.user_id;
                var companyId = localStorage.getItem('companyId');
                var userStatus = details.status;
                var status = 'block';
                var self = this;
                var popUpMessage = 'Are you sure you want to block this user?';
                if (userStatus === 'Blocked') {
                    status = 'unblock';
                    popUpMessage = 'Are you sure you want to unblock this user?';
                }
                if (userStatus !== 'Blocked' && details.report_count === 0) {
                    popUpMessage = 'The user has no reports against them (report count: 0). Are you sure you want to block this user?';
                }
                this.get('alertService').confirm(popUpMessage).then(function (confirmed) {
                    if (!confirmed) {
                        return;
                    }
                    var data = {
                        status: 'block'
                    };
                    var request = 'POST';
                    if (status === 'unblock') {
                        request = 'DELETE';
                        data = null;
                    }
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/users/' + userId + '/block_lists', request, data).then(function (response) {
                        if (status === 'block') {
                            Ember.set(details, 'status', 'Blocked');
                            self.get('alertService').alert("The user has been successfully blocked");
                        } else if (status === 'unblock') {
                            Ember.set(details, 'status', 'Approved');
                            self.get('alertService').alert("The user has been successfully unblocked");
                        }
                        console.log(response.message);
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                        console.log(error.message);
                    });
                });
            }
        }
    });
});
define('cab-booking-application/controllers/drivers', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    alertService: Ember.inject.service('alert'),
    currentRole: Ember.inject.service(),
    presentRole: Ember.computed('currentRole.currentRole', function () {
      return this.get('currentRole').getRole();
    }),
    locations: [{ value: "", label: "Select Location" }, { value: "MahindraCity", label: "Mahindra City" }, { value: "Paranur", label: "Paranur" }, { value: "SingaperumalKoil", label: "Singaperumal Koil" }, { value: "Potheri", label: "Potheri" }, { value: "Kattankulathur", label: "Kattankulathur" }, { value: "ValliammaiEngineeringCollege", label: "Valliammai Engineering College" }, { value: "Thailavaram", label: "Thailavaram" }, { value: "Guduvancheri", label: "Guduvancheri" }, { value: "Urapakkam", label: "Urapakkam" }, { value: "Vandalur", label: "Vandalur" }, { value: "Perungalathur", label: "Perungalathur" }, { value: "Tambaram", label: "Tambaram" }, { value: "Chromepet", label: "Chromepet" }, { value: "Pallavaram", label: "Pallavaram" }, { value: "Guindy", label: "Guindy" }],
    location: '',
    errorMessage: '',
    checkIfModelEmpty: function checkIfModelEmpty() {
      if (this.get('model.length') === 0) {
        this.set('errorMessage', 'Ride requests is empty');
      } else {
        this.set('errorMessage', '');
      }
    },


    actions: {
      updateLocation: function updateLocation() {
        var userId = localStorage.getItem('userId');
        var companyId = localStorage.getItem('companyId');
        var cabId = localStorage.getItem('cabId');
        var location = this.get('location');
        var self = this;
        if (!location) {
          this.get('alertService').alert('Please select any location');
          return;
        }
        var data = {
          location: location
        };
        (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId + '/cabs/' + cabId, "PUT", data, this).then(function (response) {
          self.get('alertService').alert('Cab location has been updated successfully');
        }).catch(function (error) {
          self.get('alertService').alert('Please accept or reject the request before updating your location.');
        });
      },
      acceptBooking: function acceptBooking(booking) {
        console.log(booking);
        var userId = localStorage.getItem('userId');
        var companyId = localStorage.getItem('companyId');
        var cabId = localStorage.getItem('cabId');
        var rideId = booking.ride_id;
        var self = this;
        this.get('alertService').confirm("Are you sure you want to accept this ride?").then(function (confirmed) {
          if (!confirmed) {
            return;
          }
          var data = {
            status: 'accepted'
          };
          (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId + '/cabs/' + cabId + '/rides/' + rideId, 'PUT', data).then(function (response) {
            self.transitionToRoute('booking');
            self.get("alertService").alert('Ride has been accepted successfully');
          }).catch(function (error) {
            self.set('errorMessage', error.message);
          });
        });
      },
      cancelBooking: function cancelBooking(booking) {
        var userId = localStorage.getItem('userId');
        var companyId = localStorage.getItem('companyId');
        var cabId = localStorage.getItem('cabId');
        var rideId = booking.ride_id;
        var self = this;
        this.get('alertService').confirm("Are you sure you want to cancel this booking?").then(function (confirmed) {
          if (!confirmed) {
            return;
          }
          var data = {
            status: 'rejected'
          };
          (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId + '/cabs/' + cabId + '/rides/' + rideId, 'PUT', data).then(function (response) {
            self.get('model').removeObject(booking);
            self.checkIfModelEmpty();
            self.get("alertService").alert('Ride has been rejected successfully');
            self.transitionToRoute('drivers');
          }).catch(function (error) {
            self.set('errorMessage', error.message);
            console.log(error.message);
          });
        });
      }
    }
  });
});
define('cab-booking-application/controllers/history', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service('current-role'),
        presentRole: Ember.computed('currentRole.currentRole', function () {
            return this.get('currentRole').getRole();
        }),
        weeklyEarnings: '',
        errorMessage: '',
        reportReason: '',
        reportModalVisible: false,
        selectedItem: null,

        actions: {
            report: function report(item) {
                console.log(item);
                this.set('selectedItem', item);
                this.set('reportModalVisible', true);
                this.set('reportReason', '');
            },
            submitReport: function submitReport() {

                var item = this.get('selectedItem');
                var reason = this.get('reportReason');

                if (reason.trim()) {
                    if (reason.length > 100) {
                        this.get('alertService').alert('The reason for the report must be less than 100 characters.');
                        return;
                    }
                    this.set('reportModalVisible', false);
                    console.log('Report for item:', item, 'with reason:', reason);
                    var rideDetails = this.get('selectedItem');
                    var presentRole = this.get('presentRole');
                    var userId = localStorage.getItem('userId');
                    var cabId = localStorage.getItem('cabId');
                    var companyId = localStorage.getItem('companyId');
                    var rideId = rideDetails.ride_id;
                    var self = this;
                    var url = 'http://localhost:8080/api/v1/users/' + userId + '/rides/' + rideId;
                    if (presentRole === 'driver') {
                        url = 'http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId + '/cabs/' + cabId + '/rides/' + rideId;
                    }
                    var data = {
                        report: reason
                    };
                    (0, _apiRequest.default)(url, 'PUT', data, this).then(function (response) {
                        if (presentRole === 'user') {
                            Ember.set(item, 'user_report_message', reason);
                            self.get('alertService').alert('Reported the ride successfully');
                        } else {
                            Ember.set(item, 'driver_report_message', reason);
                            self.get('alertService').alert('Reported the ride successfully');
                        }
                        // console.log(response);
                        self.set('selectedItem', null);
                        self.set('reportReason', '');
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                        console.log(error.message);
                    });
                } else {
                    this.get('alertService').alert('Report cannot be empty.');
                }
                this.set('selectedItem', null);
                this.set('reportReason', '');
            },
            closeReport: function closeReport() {
                this.set('selectedItem', null);
                this.set('reportReason', '');
                this.set('reportModalVisible', false);
            }
        }
    });
});
define('cab-booking-application/controllers/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define('cab-booking-application/controllers/login', ['exports', 'cab-booking-application/utils/api-request', 'cab-booking-application/utils/validate-phone-number', 'cab-booking-application/utils/validate-password'], function (exports, _apiRequest, _validatePhoneNumber, _validatePassword) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service(),
        phoneNumber: '',
        password: '',
        phoneNumberError: '',
        passWordError: '',
        actions: {
            login: function login() {
                var phoneNumber = this.get('phoneNumber');
                var password = this.get('password');
                var self = this;

                if (phoneNumber === '') {
                    self.set('phoneNumberError', "Please enter phone number");
                    return;
                } else if (!(0, _validatePhoneNumber.default)(phoneNumber)) {
                    this.set('phoneNumberError', "Please enter a valid phone number.");
                    return;
                } else {
                    self.set('phoneNumberError', "");
                }

                if (password === '') {
                    this.set('passWordError', "Please enter password");
                    return;
                } else if (!(0, _validatePassword.default)(password)) {
                    self.set('passWordError', "Please enter a valid password");
                    return;
                } else {
                    this.set('passWordError', "");
                }

                var userdata = {
                    phoneNumber: phoneNumber,
                    password: password
                };

                (0, _apiRequest.default)('http://localhost:8080/auth/login', 'POST', userdata, this).then(function (response) {
                    var role = response.role;
                    console.log(response);
                    localStorage.setItem('userId', response.userId);
                    if (role === 'user') {
                        localStorage.setItem('role', role);
                        self.get('currentRole').setRole(role);
                        self.transitionToRoute('users');
                    } else if (role === 'driver') {
                        localStorage.setItem('companyId', response.companyId);
                        localStorage.setItem('cabId', response.cabId);
                        localStorage.setItem('role', role);
                        self.get('currentRole').setRole(role);
                        self.transitionToRoute('drivers');
                    } else if (role === 'admin' || role === 'superAdmin') {
                        localStorage.setItem('companyId', response.companyId);
                        localStorage.setItem('role', role);
                        self.get('currentRole').setRole(role);
                        self.transitionToRoute('companies');
                    }
                    self.setProperties({
                        phoneNumber: '',
                        password: ''
                    });
                    self.get('alertService').alert('You have successfully logged in');
                }).catch(function (error) {
                    if (error.message === 'PhoneNumber not found') {
                        self.set('phoneNumberError', "Phone number not found");
                    } else if (error.message === 'Invalid password.Please provide valid password') {
                        self.set('passWordError', "Invalid password");
                    } else {
                        self.get('alertService').alert(error.message);
                    }
                });
            }
        }
    });
});
define('cab-booking-application/controllers/profile', ['exports', 'cab-booking-application/utils/api-request', 'cab-booking-application/utils/logout'], function (exports, _apiRequest, _logout) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service('current-role'),
        presentRole: Ember.computed('currentRole.currentRole', function () {
            return this.get('currentRole').getRole();
        }),
        errorMessage: '',
        defaultRole: '',
        actions: {
            cancelRequest: function cancelRequest(details) {
                var userId = localStorage.getItem('userId');
                var companyId = localStorage.getItem('companyId');
                var self = this;
                this.get('alertService').confirm('Are you sure you want to cancel the driver request?').then(function (confirmed) {
                    if (!confirmed) {
                        return;
                    }
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId, 'DELETE', null, self).then(function (response) {
                        console.log(response);
                        (0, _logout.default)(self);
                    }).catch(function (error) {
                        self.set('errorMessage', error.message);
                        console.log(error.message);
                    });
                });
            },
            cabAvialableStatus: function cabAvialableStatus(userProfile) {
                var cabstatus = userProfile.cabstatus;;
                var userId = localStorage.getItem('userId');
                var cabId = localStorage.getItem('cabId');
                var companyId = localStorage.getItem('companyId');
                var status = 'unavailable';
                var self = this;
                if (cabstatus === 'UnAvailable') {
                    status = 'available';
                }
                var data = {
                    status: status
                };
                (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId + '/cabs/' + cabId, 'PUT', data).then(function (response) {
                    if (cabstatus === 'UnAvailable') {
                        Ember.set(userProfile, 'cabstatus', 'Available');
                    } else {
                        Ember.set(userProfile, 'cabstatus', 'UnAvailable');
                    }
                    console.log(response.message);
                }).catch(function (error) {
                    self.get('alertService').alert(error.message);
                });
            }
        }

    });
});
define('cab-booking-application/controllers/register', ['exports', 'cab-booking-application/utils/api-request', 'cab-booking-application/utils/validate-email', 'cab-booking-application/utils/validate-phone-number', 'cab-booking-application/utils/validate-password'], function (exports, _apiRequest, _validateEmail, _validatePhoneNumber, _validatePassword) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    alertService: Ember.inject.service('alert'),
    currentRole: Ember.inject.service('current-role'),
    companyName: '',
    startedYear: null,
    description: '',
    contactFullName: '',
    contactEmail: '',
    contactPhoneNumber: '',
    contactAddress: '',
    password: '',
    companyNameError: '',
    startedYearError: '',
    descriptionError: '',
    adminNameError: '',
    emailError: '',
    phoneNumberError: '',
    addressError: '',
    passwordError: '',
    actions: {
      register: function register() {
        var self = this;
        var currentYear = new Date().getFullYear();
        if (this.companyName.trim() === '') {
          self.set('companyNameError', "Please enter the company name.");
          return;
        } else {
          self.set('companyNameError', "");
        }

        if (!this.startedYear || isNaN(this.startedYear) || this.startedYear.toString().length !== 4 || this.startedYear > currentYear || this.startedYear < 1900) {
          self.set('startedYearError', "Please enter a valid year.");
          return;
        } else {
          self.set('startedYearError', "");
        }

        if (this.description.trim() === '') {
          self.set('descriptionError', "Please enter a company description.");
          return;
        } else {
          self.set('descriptionError', "");
        }

        if (this.contactFullName.trim() === '') {
          self.set('adminNameError', "Please enter the contact's full name.");
          return;
        } else {
          self.set('adminNameError', "");
        }

        if (this.contactEmail.trim() === '' || !(0, _validateEmail.default)(this.contactEmail)) {
          self.set('emailError', "Please enter a valid email address.");
          return;
        } else {
          self.set('emailError', "");
        }

        if (this.contactPhoneNumber === '') {
          self.set('phoneNumberError', "Please enter phone number.");
          return;
        } else if (!(0, _validatePhoneNumber.default)(this.contactPhoneNumber)) {
          self.set('phoneNumberError', "Please enter a valid contact phone number.");
          return;
        } else {
          self.set('phoneNumberError', "");
        }

        if (this.contactAddress.trim() === '') {
          self.set('addressError', "Please enter the contact's address.");
          return;
        } else {
          self.set('addressError', "");
        }

        if (this.password === '') {
          self.set('passwordError', "Please enter a password.");
          return;
        } else if (!(0, _validatePassword.default)(this.password)) {
          self.set('passWordError', "Please enter strong password");
          return;
        } else {
          self.set('passwordError', "");
        }

        var companyData = {
          companyName: this.companyName,
          startedYear: this.startedYear,
          description: this.description,
          name: this.contactFullName,
          email: this.contactEmail,
          phoneNumber: this.contactPhoneNumber,
          address: this.contactAddress,
          password: this.password
        };
        (0, _apiRequest.default)('http://localhost:8080/auth/register', 'POST', companyData, this).then(function (response) {
          self.transitionToRoute('companies');
          localStorage.setItem('role', response.role);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('companyId', response.companyId);
          self.get('currentRole').setRole(response.role);
          self.get('alertService').alert('Company has been Registered Successfully');
        }).catch(function (error) {
          if (error.message === 'CompanyName already Present') {
            self.set('companyNameError', "CompanyName already exists");
          } else if (error.message === 'Email already Present') {
            self.set('emailError', "Email already exists");
          } else if (error.message === 'EmailId MisMatched') {
            self.set('emailError', "Please enter a valid email address");
          } else if (error.message === 'PhoneNumber already Present') {
            self.set('contactPhoneNumber', "PhoneNumber already exists");
          } else if (error.message === 'Invalid password') {
            self.set('passwordError', "Please enter a valid password");
          } else {
            console.log(error.message);
          }
        });
      }
    }
  });
});
define('cab-booking-application/controllers/signup', ['exports', 'cab-booking-application/utils/api-request', 'cab-booking-application/utils/validate-email', 'cab-booking-application/utils/validate-phone-number', 'cab-booking-application/utils/validate-password'], function (exports, _apiRequest, _validateEmail, _validatePhoneNumber, _validatePassword) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service(),
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        password: '',
        nameError: '',
        emailError: '',
        phoneNumberError: '',
        addressError: '',
        passWordError: '',

        actions: {
            signup: function signup() {
                var name = this.get('fullName');
                var phoneNumber = this.get('phoneNumber');
                var email = this.get('email');
                var address = this.get('address');
                var password = this.get('password');
                var self = this;

                if (name === '') {
                    self.set('nameError', "Please enter name");
                    return;
                } else {
                    self.set('nameError', "");
                }

                if (phoneNumber === '') {
                    self.set('phoneNumberError', "Please enter phone number.");
                    return;
                } else if (!(0, _validatePhoneNumber.default)(phoneNumber)) {
                    self.set('phoneNumberError', "Please enter a valid phone number.");
                    return;
                } else {
                    self.set('phoneNumberError', "");
                }

                if (email === '') {
                    self.set('emailError', "Please enter emailId.");
                    return;
                } else if (!(0, _validateEmail.default)(email)) {
                    self.set('emailError', "Please enter a valid email address.");
                    return;
                } else {
                    self.set('emailError', "");
                }

                if (address === '') {
                    self.set('addressError', "Please enter address");
                    return;
                } else {
                    self.set('addressError', "");
                }

                if (password === '') {
                    self.set('passWordError', "Please enter password");
                    return;
                } else if (!(0, _validatePassword.default)(password)) {
                    self.set('passWordError', "Please enter a strong password");
                    return;
                } else {
                    self.set('passWordError', "");
                }

                var userdata = {
                    name: name,
                    phoneNumber: phoneNumber,
                    email: email,
                    address: address,
                    password: password
                };

                (0, _apiRequest.default)('http://localhost:8080/auth/signup', "POST", userdata, this).then(function (response) {
                    localStorage.setItem('userId', response.userId);
                    localStorage.setItem('role', 'user');
                    self.get('currentRole').setRole('user');
                    self.transitionToRoute('users');
                    self.get('alertService').alert('You are successfully signed in');
                    self.setProperties({
                        fullName: '',
                        phoneNumber: '',
                        email: '',
                        address: '',
                        password: ''
                    });
                }).catch(function (error) {
                    if (error.message === 'Email already Present') {
                        self.set('emailError', "Email already exists");
                    } else if (error.message === 'PhoneNumber already Present') {
                        self.set('phoneNumberError', "PhoneNumber already exists");
                    } else {
                        console.log(error.message);
                    }
                });
            }
        }

    });
});
define('cab-booking-application/controllers/users', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        alertService: Ember.inject.service('alert'),
        availablecabs: [],
        isFormAction: true,
        startLocation: '',
        endLocation: '',
        errorMessage: '',
        startLocationError: '',
        endLocationError: '',
        locations: [{ value: "", label: "Select Location" }, { value: "MahindraCity", label: "Mahindra City" }, { value: "Paranur", label: "Paranur" }, { value: "SingaperumalKoil", label: "Singaperumal Koil" }, { value: "Potheri", label: "Potheri" }, { value: "Kattankulathur", label: "Kattankulathur" }, { value: "ValliammaiEngineeringCollege", label: "Valliammai Engineering College" }, { value: "Thailavaram", label: "Thailavaram" }, { value: "Guduvancheri", label: "Guduvancheri" }, { value: "Urapakkam", label: "Urapakkam" }, { value: "Vandalur", label: "Vandalur" }, { value: "Perungalathur", label: "Perungalathur" }, { value: "Tambaram", label: "Tambaram" }, { value: "Chromepet", label: "Chromepet" }, { value: "Pallavaram", label: "Pallavaram" }, { value: "Guindy", label: "Guindy" }],
        actions: {
            checkAvailableCabs: function checkAvailableCabs() {
                var userId = localStorage.getItem('userId');
                var startLocation = this.get('startLocation');
                var endLocation = this.get('endLocation');
                var self = this;
                if (!startLocation) {
                    this.set('startLocationError', "Please enter startlocation");
                    return;
                } else {
                    this.set('startLocationError', "");
                }

                if (!endLocation) {
                    this.set('endLocationError', "Please enter endlocation");
                    return;
                } else if (startLocation === endLocation) {
                    this.set('endLocationError', "Please enter valid endlocation");
                    return;
                } else {
                    this.set('endLocationError', "");
                }

                (0, _apiRequest.default)('http://localhost:8080/api/v1/cabs?start_location=' + startLocation + '&end_location=' + endLocation, 'GET', null, this).then(function (response) {
                    self.set('isFormAction', false);
                    self.set('availablecabs', response);
                    self.set('startLocation', '');
                    self.set('endLocation', '');
                }).catch(function (error) {
                    self.set('errorMessage', error.message);
                });
            },

            bookCab: function bookCab(booking) {
                var _this = this;

                var userId = localStorage.getItem('userId');
                var companyId = booking.company_id;
                var driverId = booking.driver_id;
                var cabId = booking.cab_id;
                var startLocation = booking.startLocation;
                var endLocation = booking.endLocation;
                var self = this;
                this.get('alertService').confirm('Are you sure you want to book this cab?').then(function (confirmed) {
                    if (!confirmed) {
                        return; // Do nothing if not confirmed
                    }
                    var data = {
                        user_id: userId,
                        startLocation: startLocation,
                        endLocation: endLocation
                    };
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + driverId + '/cabs/' + cabId + '/rides', 'POST', data, _this).then(function (response) {
                        self.set('isFormAction', true);
                        self.get('alertService').alert("Ride has been booked successfully");
                        self.transitionToRoute('booking');
                    }).catch(function (error) {
                        if (error.message === 'Unable to book a cab.Previous booking in progress') {
                            self.get('alertService').alert('You already have a booking');
                        } else {
                            self.set('errorMessage', error.message);
                        }
                    });
                });
            },
            updateStartLocation: function updateStartLocation(selectedLocation) {
                this.set('startLocation', selectedLocation);
            },
            updateEndLocation: function updateEndLocation(selectedLocation) {
                this.set('endLocation', selectedLocation);
            },
            goBack: function goBack() {
                this.set('isFormAction', true);
            }
        }
    });
});
define('cab-booking-application/helpers/and', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.and = and;
  function and(params) {
    return params[0] && params[1];
  }

  exports.default = Ember.Helper.helper(and);
});
define('cab-booking-application/helpers/app-version', ['exports', 'cab-booking-application/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    var versionOnly = hash.versionOnly || hash.hideSha;
    var shaOnly = hash.shaOnly || hash.hideVersion;

    var match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('cab-booking-application/helpers/eq', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.eq = eq;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function eq(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return a === b;
  }

  exports.default = Ember.Helper.helper(eq);
});
define('cab-booking-application/helpers/gt', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.gt = gt;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function gt(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        b = _ref2[1];

    return a > b;
  }

  exports.default = Ember.Helper.helper(gt);
});
define('cab-booking-application/helpers/if-else', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ifElse = ifElse;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function ifElse(_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        condition = _ref2[0],
        trueValue = _ref2[1],
        falseValue = _ref2[2];

    return condition ? trueValue : falseValue;
  }

  exports.default = Ember.Helper.helper(ifElse);
});
define('cab-booking-application/helpers/is-empty-object', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isEmptyObject = isEmptyObject;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function isEmptyObject(_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        obj = _ref2[0];

    return Object.keys(obj).length === 0;
  }

  exports.default = Ember.Helper.helper(isEmptyObject);
});
define('cab-booking-application/helpers/is-not-null', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isNotNull = isNotNull;
  function isNotNull(value1, value2) {
    console.log(value1 != null || value2 != null);
    return value1 != null || value2 != null;
  }

  exports.default = Ember.Helper.helper(isNotNull);
});
define('cab-booking-application/helpers/is-null', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isNull = isNull;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function isNull(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        value1 = _ref2[0],
        value2 = _ref2[1];

    return value1 != null && value2 != null;
  }

  exports.default = Ember.Helper.helper(isNull);
});
define('cab-booking-application/helpers/join-strings', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.joinStrings = joinStrings;
  function joinStrings(values) {
    return values.join('');
  }

  exports.default = Ember.Helper.helper(joinStrings);
});
define('cab-booking-application/helpers/not-equal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.notEqual = notEqual;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function notEqual(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        value1 = _ref2[0],
        value2 = _ref2[1];

    return value1 !== value2;
  }

  exports.default = Ember.Helper.helper(notEqual);
});
define('cab-booking-application/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('cab-booking-application/helpers/report-driver', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.reportDriver = reportDriver;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function reportDriver(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        report = _ref2[0],
        status = _ref2[1];

    return (report == 1 || report == 3) && status === 'COMPLETED';
  }

  exports.default = Ember.Helper.helper(reportDriver);
});
define('cab-booking-application/helpers/report-user', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.reportUser = reportUser;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function reportUser(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        report = _ref2[0],
        status = _ref2[1];

    return (report == 1 || report == 2) && status === 'COMPLETED';
  }

  exports.default = Ember.Helper.helper(reportUser);
});
define('cab-booking-application/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('cab-booking-application/helpers/to-array', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toArray = toArray;
  function toArray(params) {
    return params;
  }

  exports.default = Ember.Helper.helper(toArray);
});
define('cab-booking-application/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'cab-booking-application/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('cab-booking-application/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('cab-booking-application/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('cab-booking-application/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('cab-booking-application/initializers/export-application-global', ['exports', 'cab-booking-application/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('cab-booking-application/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('cab-booking-application/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('cab-booking-application/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("cab-booking-application/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('cab-booking-application/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('cab-booking-application/router', ['exports', 'cab-booking-application/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('index', { path: '/' });
    this.route('signup');
    this.route('companies', function () {
      this.route('index', { path: '/' });
      this.route('users');
      this.route('drivers');
      this.route('fares');
      this.route('details');
    });
    this.route('users');
    this.route('drivers');
    this.route('history');
    this.route('booking');
    this.route('profile');
    this.route('login');
    this.route('register');
    this.route('not-found', { path: '/*path' });
  });

  exports.default = Router;
});
define('cab-booking-application/routes/application', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        currentRoute: Ember.inject.service(),
        init: function init() {
            this._super.apply(this, arguments);
            var self = this;

            window.addEventListener('load', function () {
                setTimeout(function () {
                    var fullPath = window.location.pathname.split('/');
                    var activeRoute = fullPath[fullPath.length - 1];
                    self.get('currentRoute').setRoute(activeRoute);
                }, 50);
            });
        },

        actions: {
            didTransition: function didTransition() {
                var _this = this;

                this._super.apply(this, arguments);

                setTimeout(function () {
                    var fullPath = window.location.pathname.split('/');
                    var activeRoute = fullPath[fullPath.length - 1];
                    _this.get('currentRoute').setRoute(activeRoute);
                }, 50);
                return true;
            }
        }
    });
});
define('cab-booking-application/routes/booking', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service('current-role'),
        beforeModel: function beforeModel() {
            var role = localStorage.getItem('role');
            var userId = localStorage.getItem('userId');
            var cabId = localStorage.getItem('cabId');
            var companyId = localStorage.getItem('companyId');
            if (!(role === 'driver' && userId && companyId && cabId || role === 'user' && userId || (role === 'admin' || role === 'superAdmin') && userId && companyId)) {
                this.transitionTo('index');
            }
        },

        model: function model() {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var presentRole = _this.get('currentRole').getRole();
                var self = _this;
                if (presentRole === 'user') {
                    var userId = localStorage.getItem('userId');

                    (0, _apiRequest.default)('http://localhost:8080/api/v1/users/' + userId + '/rides?status=progress', 'GET', null, _this).then(function (response) {
                        resolve({ response: response });
                        // console.log(response)
                    }).catch(function (error) {
                        resolve({ response: {}, message: error.message });
                        console.log(error.message);
                    });
                } else if (presentRole === 'driver') {
                    var _userId = localStorage.getItem('userId');
                    var companyId = localStorage.getItem('companyId');
                    var cabId = localStorage.getItem('cabId');

                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + _userId + '/cabs/' + cabId + '/rides?status=progress', "GET", null, _this).then(function (response) {
                        console.log(response);
                        resolve({ response: response });
                    }).catch(function (error) {
                        console.log(error.message);
                        resolve({ response: {}, message: error.message });
                    });
                }
            });
        },
        setupController: function setupController(controller, model) {
            this._super(controller, model.response);
            if (model.message) {
                controller.set('errorMessage', model.message);
            } else {
                controller.set('errorMessage', '');
            }
            controller.set('otp', '');
        }
    });
});
define('cab-booking-application/routes/companies', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('cab-booking-application/routes/companies/details', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    alertService: Ember.inject.service('alert'),
    beforeModel: function beforeModel(transition) {
      var role = localStorage.getItem('role');
      var userId = localStorage.getItem('userId');
      var companyId = localStorage.getItem('companyId');
      // if (role != 'superAdmin' && (userId == null || userId == undefined)) {
      //   this.transitionTo('index');
      // }
      if (!(role === 'superAdmin' && userId && companyId)) {
        this.transitionTo('index');
      }
    },

    model: function model() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var companyId = localStorage.getItem('companyId');
        var self = _this;
        (0, _apiRequest.default)('http://localhost:8080/api/v1/companies?status=approved', 'GET', null, _this).then(function (response) {
          console.log(response);
          resolve({ response: response });
        }).catch(function (error) {
          console.log(error.message);
          resolve({ response: [], message: error.message });
        });
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model.response);
      if (model.message) {
        controller.set('errorMessage', model.message);
      } else {
        controller.set('errorMessage', '');
      }
    }
  });
});
define('cab-booking-application/routes/companies/drivers', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    alertService: Ember.inject.service('alert'),
    beforeModel: function beforeModel(transition) {
      var role = localStorage.getItem('role');
      var userId = localStorage.getItem('userId');
      // if (role != 'admin' && (userId == null || userId == undefined)) {
      //   this.transitionTo('index');
      // }
      var companyId = localStorage.getItem('companyId');
      if (!(role === 'admin' && userId && companyId)) {
        this.transitionTo('index');
      }
    },

    model: function model() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var companyId = localStorage.getItem('companyId');
        var self = _this;
        (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers', 'GET', null, _this).then(function (response) {
          console.log(response);
          resolve({ response: response });
        }).catch(function (error) {
          // console.log(error.message);
          if (error.status === 401 || error.message === 'Drivers not found') {
            self.get('alertService').alert("Company Request is still in waiting.So unable to get the driver details");
          }
          resolve({ response: [], message: error.message });
        });
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model.response);
      if (model.message) {
        controller.set('errorMessage', model.message);
      } else {
        controller.set('errorMessage', '');
      }
    }
  });
});
define('cab-booking-application/routes/companies/fares', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    alertService: Ember.inject.service('alert'),
    beforeModel: function beforeModel(transition) {
      var role = localStorage.getItem('role');
      var userId = localStorage.getItem('userId');
      // if (role != 'admin' && (userId == null || userId == undefined)) {
      //   this.transitionTo('index');
      // }
      var companyId = localStorage.getItem('companyId');
      if (!(role === 'admin' && userId && companyId)) {
        this.transitionTo('index');
      }
    },

    model: function model() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var companyId = localStorage.getItem('companyId');
        var self = _this;
        (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/fares', 'GET', null, _this).then(function (response) {
          console.log(response);
          resolve({ response: response });
        }).catch(function (error) {
          console.log(error.message);
          resolve({ response: [], message: error.message });
        });
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model.response);
      if (model.message) {
        controller.set('errorMessage', model.message);
      } else {
        controller.set('errorMessage', '');
      }
    }
  });
});
define('cab-booking-application/routes/companies/index', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    alertService: Ember.inject.service('alert'),
    currentRole: Ember.inject.service('current-role'),
    beforeModel: function beforeModel(transition) {
      var role = localStorage.getItem('role');
      var userId = localStorage.getItem('userId');
      var companyId = localStorage.getItem('companyId');
      var presentRole = this.get('currentRole').getRole();
      if (!((role === 'admin' || role === 'superAdmin') && userId && companyId)) {
        this.transitionTo('index');
      }
      if (presentRole === 'user') {
        this.transitionTo('users');
      }
    },

    model: function model() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var companyId = localStorage.getItem('companyId');
        var presentRole = _this.get('currentRole').getRole();
        var self = _this;
        if (presentRole === 'admin') {
          (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers?status=pending', 'GET', null, _this).then(function (response) {
            console.log(response);
            resolve({ response: response });
          }).catch(function (error) {
            console.log(error.message);
            resolve({ response: [], message: error.message });
          });
        } else if (presentRole === 'superAdmin') {
          (0, _apiRequest.default)('http://localhost:8080/api/v1/companies?status=pending', 'GET', null, _this).then(function (response) {
            console.log(response);
            resolve({ response: response });
          }).catch(function (error) {
            console.log(error.message);
            resolve({ response: [], message: error.message });
          });
        }
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model.response);
      if (model.message) {
        controller.set('errorMessage', model.message);
      } else {
        controller.set('errorMessage', '');
      }
    }
  });
});
define('cab-booking-application/routes/companies/users', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    alertService: Ember.inject.service('alert'),
    beforeModel: function beforeModel(transition) {
      var role = localStorage.getItem('role');
      var userId = localStorage.getItem('userId');
      // if (role != 'admin' && (userId == null || userId == undefined)) {
      //   this.transitionTo('index');
      // }
      var companyId = localStorage.getItem('companyId');
      if (!(role === 'admin' && userId && companyId)) {
        this.transitionTo('index');
      }
    },

    model: function model() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var companyId = localStorage.getItem('companyId');
        var self = _this;
        (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/users', 'GET', null).then(function (response) {
          resolve({ response: response });
        }).catch(function (error) {
          if (error.status === 401 || error.message === 'Users not found') {
            self.get('alertService').alert("Company Request is still in waiting.So unable to get the user details");
          }
          resolve({ response: [], message: error.message });
        });
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model.response);
      if (model.message) {
        controller.set('errorMessage', model.message);
      } else {
        controller.set('errorMessage', '');
      }
    }
  });
});
define('cab-booking-application/routes/drivers', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    alertService: Ember.inject.service('alert'),
    currentRole: Ember.inject.service('current-role'),
    beforeModel: function beforeModel() {
      var role = localStorage.getItem('role');
      var userId = localStorage.getItem('userId');
      var cabId = localStorage.getItem('cabId');
      var companyId = localStorage.getItem('companyId');
      var presentRole = this.get('currentRole').getRole();
      if (!(role === 'driver' && userId && companyId && cabId)) {
        this.transitionTo('index');
      }
      if (presentRole === 'user') {
        this.transitionTo('users');
      }
    },

    model: function model() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var userId = localStorage.getItem('userId');
        var companyId = localStorage.getItem('companyId');
        var cabId = localStorage.getItem('cabId');
        var self = _this;
        (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + userId + '/cabs/' + cabId + '/rides?status=waiting', 'GET', null, _this).then(function (response) {
          resolve({ response: response });
        }).catch(function (error) {
          resolve({ response: [], message: error.message });
        });
      });
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model.response);
      if (model.message) {

        controller.set('errorMessage', model.message);
      } else {
        controller.set('errorMessage', '');
      }
      controller.set('location', '');
    }
  });
});
define('cab-booking-application/routes/history', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service('current-role'),
        beforeModel: function beforeModel(transition) {
            var role = localStorage.getItem('role');
            var userId = localStorage.getItem('userId');
            var cabId = localStorage.getItem('cabId');
            var companyId = localStorage.getItem('companyId');
            if (!(role === 'driver' && userId && companyId && cabId || role === 'user' && userId || (role === 'admin' || role === 'superAdmin') && userId && companyId)) {
                this.transitionTo('index');
            }
        },

        model: function model() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var presentRole = _this.get('currentRole').getRole();
                var self = _this;
                if (presentRole === 'user') {
                    var userId = localStorage.getItem('userId');
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/users/' + userId + '/rides', 'GET', null, _this).then(function (response) {
                        resolve({ response: response });
                        console.log(response);
                    }).catch(function (error) {
                        resolve({ response: [], message: error.message });
                        console.log(error);
                    });
                } else if (presentRole === 'driver') {
                    var _userId = localStorage.getItem('userId');
                    var companyId = localStorage.getItem('companyId');
                    var cabId = localStorage.getItem('cabId');
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + companyId + '/drivers/' + _userId + '/cabs/' + cabId + '/rides', 'GET', null, _this).then(function (response) {
                        resolve({ response: response });
                        console.log(response);
                    }).catch(function (error) {
                        resolve({ response: [], message: error.message });
                        console.log(error);
                    });
                } else if (presentRole === 'admin') {
                    var _userId2 = localStorage.getItem('userId');
                    var _companyId = localStorage.getItem('companyId');
                    var _cabId = localStorage.getItem('cabId');
                    (0, _apiRequest.default)('http://localhost:8080/api/v1/companies/' + _companyId + '/rides', 'GET', null, _this).then(function (response) {
                        resolve({ response: response });
                    }).catch(function (error) {
                        if (error.status === 401 || error.message === 'History not found') {
                            self.get('alertService').alert("Company Request is still in waiting.So unable to get the history");
                        }
                        resolve({ response: [], message: error.message });
                    });
                }
            });
        },
        setupController: function setupController(controller, model) {
            this._super(controller, model.response);
            if (model.message) {
                controller.set('errorMessage', model.message);
            } else {
                controller.set('errorMessage', '');
            }
            controller.set('reportModalVisible', false);
        }
    });
});
define('cab-booking-application/routes/index', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        alertService: Ember.inject.service('alert'),
        beforeModel: function beforeModel(transition) {
            var role = localStorage.getItem('role');
            var userId = localStorage.getItem('userId');
            var cabId = localStorage.getItem('cabId');
            var companyId = localStorage.getItem('companyId');
            var self = this;
            if (role === 'driver' && userId && companyId && cabId || role === 'user' && userId || (role === 'admin' || role === 'superAdmin') && userId && companyId) {
                (0, _apiRequest.default)('http://localhost:8080/session/check', 'GET', null, this).then(function (response) {
                    if (response.message === 'Session is valid') {
                        if (role === 'user') {
                            self.transitionTo('users');
                        } else if (role === 'admin' || role === 'superAdmin') {
                            self.transitionTo('companies');
                        } else if (role === 'driver') {
                            self.transitionTo('drivers');
                        }
                    }
                }).catch(function (error) {
                    console.log(error.message);
                    resolve({ response: {}, message: error.message });
                });
            }
        }
    });
});
define('cab-booking-application/routes/login', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        alertService: Ember.inject.service('alert'),
        beforeModel: function beforeModel() {
            var role = localStorage.getItem('role');
            var userId = localStorage.getItem('userId');
            var cabId = localStorage.getItem('cabId');
            var companyId = localStorage.getItem('companyId');
            var self = this;
            if (role === 'driver' && userId && companyId && cabId || role === 'user' && userId || (role === 'admin' || role === 'superAdmin') && userId && companyId) {
                (0, _apiRequest.default)('http://localhost:8080/session/check', 'GET', null, this).then(function (response) {
                    if (response.message === 'Session is valid') {
                        if (role === 'user') {
                            self.transitionTo('users');
                        } else if (role === 'admin' || role === 'superAdmin') {
                            self.transitionTo('companies');
                        } else if (role === 'driver') {
                            self.transitionTo('drivers');
                        }
                    }
                }).catch(function (error) {
                    console.log(error.message);
                });
            }
        },
        afterModel: function afterModel() {
            this.controllerFor(this.routeName).setProperties({
                phoneNumber: '',
                password: '',
                phoneNumberError: '',
                passWordError: ''
            });
        }
    });
});
define('cab-booking-application/routes/not-found', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        beforeModel: function beforeModel() {
            var role = localStorage.getItem('role');
            var userId = localStorage.getItem('userId');
            var cabId = localStorage.getItem('cabId');
            var companyId = localStorage.getItem('companyId');
            var self = this;
            if (role === 'driver' && userId && companyId && cabId || role === 'user' && userId || (role === 'admin' || role === 'superAdmin') && userId && companyId) {
                (0, _apiRequest.default)('http://localhost:8080/session/check', 'GET', null, this).then(function (response) {
                    if (response.message === 'Session is valid') {
                        if (role === 'user') {
                            self.transitionTo('users');
                        } else if (role === 'admin' || role === 'superAdmin') {
                            self.transitionTo('companies');
                        } else if (role === 'driver') {
                            self.transitionTo('drivers');
                        }
                    }
                }).catch(function (error) {
                    console.log(error.message);
                });
            }
        }
    });
});
define('cab-booking-application/routes/profile', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        alertService: Ember.inject.service('alert'),
        beforeModel: function beforeModel(transition) {
            var role = localStorage.getItem('role');
            var userId = localStorage.getItem('userId');
            var cabId = localStorage.getItem('cabId');
            var companyId = localStorage.getItem('companyId');
            if (!(role === 'driver' && userId && companyId && cabId || role === 'user' && userId || (role === 'admin' || role === 'superAdmin') && userId && companyId)) {
                this.transitionTo('index');
            }
        },

        model: function model() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var userId = localStorage.getItem('userId');
                var role = localStorage.getItem("role");
                (0, _apiRequest.default)('http://localhost:8080/api/v1/users/' + userId + '?role=' + role, 'GET', null, _this).then(function (response) {
                    resolve({ response: response });
                }).catch(function (error) {
                    console.log(error.message);
                    resolve({ response: {}, message: error.message });
                });
            });
        },
        setupController: function setupController(controller, model) {
            this._super(controller, model.response);
            if (model.message) {
                controller.set('errorMessage', model.message);
            } else {
                controller.set('errorMessage', '');
            }
            var role = localStorage.getItem('role');
            controller.set('defaultRole', role);
        }
    });
});
define('cab-booking-application/routes/register', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        alertService: Ember.inject.service('alert'),
        beforeModel: function beforeModel(transition) {
            var role = localStorage.getItem('role');
            var userId = localStorage.getItem('userId');
            var cabId = localStorage.getItem('cabId');
            var companyId = localStorage.getItem('companyId');
            var self = this;
            if (role === 'driver' && userId && companyId && cabId || role === 'user' && userId || (role === 'admin' || role === 'superAdmin') && userId && companyId) {
                (0, _apiRequest.default)('http://localhost:8080/session/check', 'GET', null, this).then(function (response) {
                    if (response.message === 'Session is valid') {
                        if (role === 'user') {
                            self.transitionTo('users');
                        } else if (role === 'admin') {
                            self.transitionTo('companies');
                        } else if (role === 'driver') {
                            self.transitionTo('drivers');
                        }
                    }
                }).catch(function (error) {
                    console.log(error.message);
                });
            }
        },
        afterModel: function afterModel() {
            this.controllerFor(this.routeName).setProperties({
                companyName: '',
                startedYear: null,
                description: '',
                contactFullName: '',
                contactEmail: '',
                contactPhoneNumber: '',
                contactAddress: '',
                password: '',
                companyNameError: '',
                startedYearError: '',
                descriptionError: '',
                adminNameError: '',
                emailError: '',
                phoneNumberError: '',
                addressError: '',
                passwordError: ''
            });
        }
    });
});
define('cab-booking-application/routes/signup', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        alertService: Ember.inject.service('alert'),
        beforeModel: function beforeModel(transition) {
            var role = localStorage.getItem('role');
            var userId = localStorage.getItem('userId');
            var cabId = localStorage.getItem('cabId');
            var companyId = localStorage.getItem('companyId');
            var self = this;
            if (role === 'driver' && userId && companyId && cabId || role === 'user' && userId || (role === 'admin' || role === 'superAdmin') && userId && companyId) {
                (0, _apiRequest.default)('http://localhost:8080/session/check', 'GET', null, this).then(function (response) {
                    if (response.message === 'Session is valid') {
                        if (role === 'user') {
                            self.transitionTo('users');
                        } else if (role === 'admin') {
                            self.transitionTo('companies');
                        } else if (role === 'driver') {
                            self.transitionTo('drivers');
                        }
                    }
                }).catch(function (error) {
                    console.log(error.message);
                    resolve({ response: {}, message: error.message });
                });
            }
        },
        afterModel: function afterModel() {
            this.controllerFor(this.routeName).setProperties({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                password: '',
                nameError: '',
                emailError: '',
                phoneNumberError: '',
                addressError: '',
                passWordError: ''
            });
        }
    });
});
define('cab-booking-application/routes/users', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        alertService: Ember.inject.service('alert'),
        currentRole: Ember.inject.service('current-role'),
        beforeModel: function beforeModel() {
            var role = localStorage.getItem('role');
            var userId = localStorage.getItem('userId');
            var cabId = localStorage.getItem('cabId');
            var companyId = localStorage.getItem('companyId');
            var presentRole = this.get('currentRole').getRole();
            if (!(role === 'user' && userId || role === 'driver' && userId && companyId && cabId || (role === 'admin' || role === 'superAdmin') && userId && companyId)) {
                this.transitionTo('index');
            }
            if (presentRole === 'driver') {
                this.transitionTo('drivers');
            } else if (presentRole === 'admin' || presentRole === 'superAdmin') {
                this.transitionTo('companies');
            }
        },
        setupController: function setupController(controller, model) {
            this._super(controller, model);
            controller.set('isFormAction', true);
            controller.set('errorMessage', '');
            controller.set('startLocationError', '');
            controller.set('endLocationError', '');
            controller.set('startLocation', '');
            controller.set('endLocation', '');
            controller.set('availablecabs', []);
        }
    });
});
define('cab-booking-application/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('cab-booking-application/services/alert', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    isShowing: false,
    message: '',
    isShowingAlert: false,
    alertMessage: '',
    resolve: null,

    confirm: function confirm(message) {
      var _this = this;

      this.set('isShowing', true);
      this.set('message', message);
      return new Promise(function (resolve) {
        _this.set('resolve', resolve);
      });
    },
    proceed: function proceed() {
      if (this.get('resolve')) {
        this.get('resolve')(true);
      }
      this.set('isShowing', false);
    },
    cancel: function cancel() {
      if (this.get('resolve')) {
        this.get('resolve')(false);
      }
      this.set('isShowing', false);
    },
    alert: function alert(message) {
      var _this2 = this;

      this.set('isShowingAlert', true);
      this.set('alertMessage', message);
      setTimeout(function () {
        _this2.dismissAlert();
      }, 3000);
    },
    dismissAlert: function dismissAlert() {
      this.set('isShowingAlert', false);
    }
  });
});
define('cab-booking-application/services/current-role', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Service.extend({
        currentRole: '',
        init: function init() {
            this._super.apply(this, arguments);
            var savedRole = localStorage.getItem('currentRole');
            if (savedRole) {
                this.set('currentRole', savedRole);
            }
        },
        setRole: function setRole(role) {
            this.set('currentRole', role);
            localStorage.setItem('currentRole', role);
        },
        getRole: function getRole() {
            return this.get('currentRole');
        }
    });
});
define('cab-booking-application/services/current-route', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Service.extend({
        currentRoute: '',
        setRoute: function setRoute(routeName) {
            this.set('currentRoute', routeName);
        }
    });
});
define("cab-booking-application/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QOFv8xX6", "block": "{\"statements\":[[0,\" \"],[11,\"div\",[]],[15,\"class\",\"content\"],[13],[0,\"\\n        \"],[1,[26,[\"confirm-dialog\"]],false],[0,\"\\n        \"],[1,[26,[\"outlet\"]],false],[0,\"\\n      \"],[14],[0,\"\\n  \"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/application.hbs" } });
});
define("cab-booking-application/templates/booking", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "L8uXJ5AR", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"taxi-container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-nav-bar\"],[13],[0,\"\\n      \"],[1,[26,[\"nav-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-display-area\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-side-bar\"],[13],[0,\"\\n        \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-currentBooking-page\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-content-area\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"errorMessage\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"cab-error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"user\"],null]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"cab-ride-details-table\"],[13],[0,\"\\n                  \"],[11,\"table\",[]],[13],[0,\"\\n                    \"],[11,\"tbody\",[]],[13],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Company Name\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"name\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Model Name\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"model\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Cab Register Number\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"register_number\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Start Location\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"start_location\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"End Location\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"end_location\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Fare\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"fare\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Status\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"state\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"state\"]],\"Waiting\"],null]],null,{\"statements\":[[0,\"                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[15,\"colspan\",\"2\"],[15,\"class\",\"action-cell\"],[15,\"style\",\"text-align: center;\"],[13],[0,\"\\n                          \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"cancelBooking\",[28,[\"model\"]]]],[13],[0,\"CANCEL\"],[14],[0,\"\\n                        \"],[14],[0,\"\\n                      \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"OTP\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"otp\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                    \"],[14],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"driver\"],null]],null,{\"statements\":[[0,\"                \"],[11,\"div\",[]],[15,\"class\",\"cab-ride-details-table\"],[13],[0,\"\\n                  \"],[11,\"table\",[]],[13],[0,\"\\n                    \"],[11,\"tbody\",[]],[13],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Customer Name\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"name\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Phone Number\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"phone_number\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Start Location\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"start_location\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"End Location\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"end_location\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Fare\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"fare\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Status\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[1,[28,[\"model\",\"status\"]],false],[14],[0,\"\\n                      \"],[14],[0,\"\\n\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"status\"]],\"Accepted\"],null]],null,{\"statements\":[[0,\"                      \"],[11,\"tr\",[]],[15,\"class\",\"otp-row\"],[13],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"Otp\"],[14],[0,\"\\n                        \"],[11,\"td\",[]],[13],[0,\"\\n                          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"otp-input\",\"cab-input\",\"text\",\"otp\",[28,[\"otp\"]],\"Enter OTP\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"otpError\"]]],null,{\"statements\":[[0,\"                            \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"otpError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                        \"],[14],[0,\"\\n                      \"],[14],[0,\"\\n                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[15,\"colspan\",\"2\"],[15,\"class\",\"action-cell\"],[15,\"style\",\"text-align: center;\"],[13],[0,\"\\n                          \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button primary\"],[5,[\"action\"],[[28,[null]],\"startRide\",[28,[\"model\"]]]],[13],[0,\"START\"],[14],[0,\"\\n                        \"],[14],[0,\"\\n                      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"status\"]],\"Started\"],null]],null,{\"statements\":[[0,\"                      \"],[11,\"tr\",[]],[13],[0,\"\\n                        \"],[11,\"td\",[]],[15,\"colspan\",\"2\"],[15,\"class\",\"action-cell\"],[15,\"style\",\"text-align: center;\"],[13],[0,\"\\n                          \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button primary\"],[5,[\"action\"],[[28,[null]],\"completeRide\",[28,[\"model\"]]]],[13],[0,\"COMPLETE\"],[14],[0,\"\\n                        \"],[14],[0,\"\\n                      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                    \"],[14],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}],[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n                  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n          \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/booking.hbs" } });
});
define("cab-booking-application/templates/companies", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QFsQ9LqF", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"taxi-container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-nav-bar\"],[13],[0,\"\\n      \"],[1,[26,[\"nav-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-display-area\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-side-bar\"],[13],[0,\"\\n        \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-company-details-page\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-content-area\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n            \"],[1,[26,[\"outlet\"]],false],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/companies.hbs" } });
});
define("cab-booking-application/templates/companies/details", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "4P9coA5W", "block": "{\"statements\":[[0,\"\\n\\n\"],[6,[\"if\"],[[28,[null,\"errorMessage\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"cab-error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[1,[33,[\"fixed-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"primaryAction\",\"primaryActionName\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"Company Name\",\"Description\",\"Started Year\"],null],[33,[\"to-array\"],[\"name\",\"description\",\"started_year\"],null],[33,[\"action\"],[[28,[null]],\"deleteCompany\"],null],\"DELETE\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[11,\"div\",[]],[15,\"class\",\"cab-child-link\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/companies/details.hbs" } });
});
define("cab-booking-application/templates/companies/drivers", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u/1Xb3dr", "block": "{\"statements\":[[6,[\"if\"],[[28,[null,\"errorMessage\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"cab-error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[1,[33,[\"dynamic-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"passedAction\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"Driver Name\",\"Phone Number\",\"Email\",\"License Number\",\"Register Number\",\"Cab Model\",\"Address\",\"Report Count\",\"Status\"],null],[33,[\"to-array\"],[\"name\",\"phone_number\",\"email\",\"license_number\",\"register_number\",\"cabModel\",\"address\",\"report_count\",\"status\"],null],[33,[\"action\"],[[28,[null]],\"blockDriver\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]}],[11,\"div\",[]],[15,\"class\",\"cab-child-link\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/companies/drivers.hbs" } });
});
define("cab-booking-application/templates/companies/fares", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Ro8IyJ+v", "block": "{\"statements\":[[6,[\"if\"],[[28,[null,\"errorMessage\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"cab-error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[1,[33,[\"edit-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"editAction\",\"primaryAction\",\"secondaryAction\",\"primaryActionName\",\"secondaryActionName\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"Cab Name\",\"Fare Per Km\"],null],[33,[\"to-array\"],[\"cabModel\",\"fare_per_km\"],null],[33,[\"action\"],[[28,[null]],\"editFare\"],null],[33,[\"action\"],[[28,[null]],\"updateFare\"],null],[33,[\"action\"],[[28,[null]],\"cancelEdit\"],null],\"SUBMIT\",\"CANCEL\"]]],false],[0,\"\\n\"]],\"locals\":[]}],[11,\"div\",[]],[15,\"class\",\"cab-child-link\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/companies/fares.hbs" } });
});
define("cab-booking-application/templates/companies/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "QJRrC1wj", "block": "{\"statements\":[[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"errorMessage\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"cab-error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"admin\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"\"],[13],[0,\"\\n            \"],[1,[33,[\"fixed-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"primaryAction\",\"secondaryAction\",\"primaryActionName\",\"secondaryActionName\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"Driver Name\",\"Phone Number\",\"Email\",\"License Number\",\"Model Name\",\"Register Number\",\"Address\"],null],[33,[\"to-array\"],[\"name\",\"phone_number\",\"email\",\"license_number\",\"ModelName\",\"register_number\",\"address\"],null],[33,[\"action\"],[[28,[null]],\"approveDriverRequest\"],null],[33,[\"action\"],[[28,[null]],\"cancelDriverRequest\"],null],\"ACCEPT\",\"REJECT\"]]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"superAdmin\"],null]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"fixed-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"primaryAction\",\"secondaryAction\",\"primaryActionName\",\"secondaryActionName\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"Company Name\",\"UserName\",\"Email\",\"Phone Number\",\"Address\"],null],[33,[\"to-array\"],[\"companyname\",\"username\",\"email\",\"phone_number\",\"address\"],null],[33,[\"action\"],[[28,[null]],\"approveAdminRequest\"],null],[33,[\"action\"],[[28,[null]],\"cancelAdminRequest\"],null],\"ACCEPT\",\"REJECT\"]]],false],[0,\"\\n        \"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n            \"],[1,[26,[\"outlet\"]],false],[0,\"\\n        \"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/companies/index.hbs" } });
});
define("cab-booking-application/templates/companies/users", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KJVOtUmx", "block": "{\"statements\":[[6,[\"if\"],[[28,[null,\"errorMessage\"]]],null,{\"statements\":[[11,\"div\",[]],[15,\"class\",\"cab-error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[1,[33,[\"dynamic-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"passedAction\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"User Name\",\"Phone Number\",\"Email\",\"Address\",\"Report Count\",\"Status\"],null],[33,[\"to-array\"],[\"username\",\"phone_number\",\"email\",\"address\",\"report_count\",\"status\"],null],[33,[\"action\"],[[28,[null]],\"blockUser\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]}],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/companies/users.hbs" } });
});
define("cab-booking-application/templates/components/auth-links", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "H9xwNJqc", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"auth-links\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"auth-logo\"],[13],[0,\"\\n    \"],[11,\"img\",[]],[15,\"src\",\"/client/assets/cabAppLogo.jpeg\"],[15,\"alt\",\"homelogo\"],[13],[14],[0,\"\\n    \"],[6,[\"link-to\"],[\"index\"],[[\"class\"],[\"auth-logo-link\"]],{\"statements\":[[0,\"Zoho Cabs\"]],\"locals\":[]},null],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"auth-links-container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"auth-link-item\"],[13],[0,\"\\n      \"],[6,[\"link-to\"],[\"login\"],[[\"class\"],[\"auth-link\"]],{\"statements\":[[0,\"Login\"]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"auth-link-item\"],[13],[0,\"\\n      \"],[6,[\"link-to\"],[\"signup\"],[[\"class\"],[\"auth-link\"]],{\"statements\":[[0,\"Sign Up\"]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"auth-link-item\"],[13],[0,\"\\n      \"],[6,[\"link-to\"],[\"register\"],[[\"class\"],[\"auth-link\"]],{\"statements\":[[0,\"CompanyRegister\"]],\"locals\":[]},null],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[18,\"default\"],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/auth-links.hbs" } });
});
define("cab-booking-application/templates/components/cab-form-input", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "z1EZolk7", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"cab-form-group\"],[13],[0,\"\\n  \"],[11,\"label\",[]],[16,\"for\",[26,[\"id\"]],null],[13],[1,[26,[\"label\"]],false],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"read\"]]],null,{\"statements\":[[0,\"      \"],[11,\"input\",[]],[16,\"type\",[26,[\"type\"]],null],[16,\"id\",[26,[\"id\"]],null],[16,\"value\",[26,[\"value\"]],null],[16,\"placeholder\",[26,[\"placeholder\"]],null],[15,\"readonly\",\"\"],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"      \"],[11,\"input\",[]],[16,\"type\",[26,[\"type\"]],null],[16,\"id\",[26,[\"id\"]],null],[16,\"value\",[26,[\"value\"]],null],[16,\"placeholder\",[26,[\"placeholder\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],\"updateValue\"],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\"]],\"locals\":[]}],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/cab-form-input.hbs" } });
});
define("cab-booking-application/templates/components/confirm-dialog", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "DCXzeKvZ", "block": "{\"statements\":[[0,\"\\n\\n\"],[6,[\"if\"],[[28,[\"alertService\",\"isShowing\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"modal-overlay\"],[13],[14],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"modal\"],[13],[0,\"\\n    \"],[11,\"p\",[]],[13],[1,[28,[\"alertService\",\"message\"]],false],[14],[0,\"\\n     \"],[11,\"div\",[]],[15,\"class\",\"button-container\"],[13],[0,\"\\n      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"proceed\"]],[13],[0,\"Confirm\"],[14],[0,\"\\n      \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"cancel\"]],[13],[0,\"Cancel\"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"],[6,[\"if\"],[[28,[\"alertService\",\"isShowingAlert\"]]],null,{\"statements\":[[0,\"  \"],[11,\"div\",[]],[15,\"class\",\"modal alert-message\"],[13],[0,\"\\n    \"],[11,\"p\",[]],[13],[1,[28,[\"alertService\",\"alertMessage\"]],false],[14],[0,\"\\n  \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/confirm-dialog.hbs" } });
});
define("cab-booking-application/templates/components/data-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SUjYTs1d", "block": "{\"statements\":[[11,\"table\",[]],[15,\"class\",\"cab-data-table\"],[13],[0,\"\\n    \"],[11,\"thead\",[]],[13],[0,\"\\n        \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-header\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columns\"]]],null,{\"statements\":[[0,\"                \"],[11,\"th\",[]],[15,\"class\",\"cab-data-table-header-cell\"],[13],[1,[28,[\"column\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"column\"]},null],[6,[\"if\"],[[28,[\"action\"]]],null,{\"statements\":[[0,\"                \"],[11,\"th\",[]],[15,\"class\",\"cab-data-table-header-cell\"],[13],[0,\"Action\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"tbody\",[]],[15,\"class\",\"cab-data-table-body\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"data\"]]],null,{\"statements\":[[0,\"        \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-row\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columnKeys\"]]],null,{\"statements\":[[6,[\"if\"],[[33,[\"and\"],[[28,[\"item\",\"isEditingFare\"]],[33,[\"eq\"],[[28,[\"key\"]],\"fare_per_km\"],null]],null]],null,{\"statements\":[[0,\"                    \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"value\",[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-cell\"],[13],[1,[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null],false],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[\"key\"]},null],[6,[\"if\"],[[33,[\"not-equal\"],[[28,[\"presentRole\"]],\"admin\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-action-cell\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"driver\"],null]],null,{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"action\"]],\"driverRideAcceptanceAction\"],null]],null,{\"statements\":[[0,\"\\n                        \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"acceptBooking\"]],[28,[\"item\"]]]],[13],[0,\"Accept\"],[14],[0,\"\\n                        \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"cancelBooking\"]],[28,[\"item\"]]]],[13],[0,\"Reject\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"action\"]],\"report\"],null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"driver_report_message\"]]],null,{\"statements\":[[0,\"                            \"],[11,\"span\",[]],[13],[0,\"Reported\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                            \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],\"report\",[28,[\"item\"]]]],[13],[0,\"Report\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                    \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"user\"],null]],null,{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"action\"]],\"book\"],null]],null,{\"statements\":[[0,\"                        \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"passedAction\"]],[28,[\"item\"]]]],[13],[0,\"Book\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"action\"]],\"report\"],null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"user_report_message\"]]],null,{\"statements\":[[0,\"                            \"],[11,\"span\",[]],[13],[0,\"Reported\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                            \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],\"report\",[28,[\"item\"]]]],[13],[0,\"Report\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"action\"]],\"block\"],null]],null,{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"item\",\"status\"]],\"BLOCKED\"],null]],null,{\"statements\":[[0,\"                            \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"passedAction\"]],[28,[\"item\"]]]],[13],[0,\"UNBLOCK\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                            \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"passedAction\"]],[28,[\"item\"]]]],[13],[0,\"BLOCK\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                    \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}],[0,\"                \"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-action-cell\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"action\"]],\"block\"],null]],null,{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"item\",\"status\"]],\"BLOCKED\"],null]],null,{\"statements\":[[0,\"                        \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"passedAction\"]],[28,[\"item\"]]]],[13],[0,\"UNBLOCK\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                        \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"passedAction\"]],[28,[\"item\"]]]],[13],[0,\"BLOCK\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"action\"]],\"driverApproval\"],null]],null,{\"statements\":[[0,\"                    \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"approveDriverRequest\"]],[28,[\"item\"]]]],[13],[0,\"APPROVE\"],[14],[0,\"\\n                    \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"cancelDriverRequest\"]],[28,[\"item\"]]]],[13],[0,\"REJECT\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"action\"]],\"editFare\"],null]],null,{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"isEditingFare\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"updateFare\"]],[28,[\"item\"]]]],[13],[0,\"Submit\"],[14],[0,\"\\n                        \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"cancelEdit\"]],[28,[\"item\"]]]],[13],[0,\"Cancel\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                        \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],[28,[\"editFare\"]],[28,[\"item\"]]]],[13],[0,\"Edit\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}],[0,\"                \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"        \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[18,\"default\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/data-table.hbs" } });
});
define("cab-booking-application/templates/components/driver-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UWm4C8vD", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"cab-content-area\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"overlay\"],[13],[14],[0,\"\\n\\n      \"],[11,\"div\",[]],[15,\"class\",\"form-container\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"form-container-title\"],[13],[0,\"USER TO DRIVER\"],[14],[0,\"\\n        \"],[11,\"form\",[]],[5,[\"action\"],[[28,[null]],\"driverForm\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"companyName\"],[13],[0,\"Company Name\"],[14],[0,\"\\n            \"],[11,\"select\",[]],[15,\"id\",\"companyName\"],[15,\"class\",\"form-control\"],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"companyName\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n                \"],[11,\"option\",[]],[15,\"value\",\"\"],[13],[0,\"Select Company\"],[14],[0,\"\\n\"],[6,[\"each\"],[[28,[\"companyNames\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"option\",[]],[16,\"value\",[28,[\"company\",\"id\"]],null],[13],[1,[28,[\"company\",\"name\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"company\"]},null],[0,\"            \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"companyNameError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"companyNameError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n    \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"modelName\"],[13],[0,\"Cab Model Name\"],[14],[0,\"\\n            \"],[11,\"select\",[]],[15,\"id\",\"modelName\"],[15,\"class\",\"form-control\"],[16,\"value\",[28,[null,\"modelName\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"modelName\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[null,\"cabModels\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"option\",[]],[16,\"value\",[28,[\"model\",\"value\"]],null],[13],[1,[28,[\"model\",\"label\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"model\"]},null],[0,\"            \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"modelNameError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"modelNameError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n    \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"registerNumber\"],[13],[0,\"Cab Registration Number\"],[14],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"value\",\"id\",\"placeholder\",\"class\"],[[28,[\"registerNumber\"]],\"registerNumber\",\"Enter registration number\",\"form-control\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"registerNumberError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"registerNumberError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n    \\n          \"],[11,\"div\",[]],[15,\"class\",\"form-group\"],[13],[0,\"\\n            \"],[11,\"label\",[]],[15,\"for\",\"licenseNumber\"],[13],[0,\"License Number\"],[14],[0,\"\\n            \"],[1,[33,[\"input\"],null,[[\"value\",\"id\",\"placeholder\",\"class\"],[[28,[\"licenseNumber\"]],\"licenseNumber\",\"Enter license number\",\"form-control\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"licenseNumberError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"licenseNumberError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"          \"],[14],[0,\"\\n          \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"btn btn-primary\"],[13],[0,\"Submit\"],[14],[0,\"\\n          \"],[11,\"button\",[]],[15,\"type\",\"button\"],[15,\"class\",\"btn btn-secondary\"],[5,[\"action\"],[[28,[null]],[28,[\"closeForm\"]]]],[13],[0,\"Cancel\"],[14],[0,\"\\n        \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/driver-form.hbs" } });
});
define("cab-booking-application/templates/components/dynamic-action-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9C1ZxR6n", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"cab-data-table-wrapper\"],[13],[0,\"\\n    \"],[11,\"table\",[]],[15,\"class\",\"cab-data-table\"],[13],[0,\"\\n        \"],[11,\"thead\",[]],[13],[0,\"\\n            \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-header\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columns\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"th\",[]],[15,\"class\",\"cab-data-table-header-cell\"],[13],[1,[28,[\"column\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"column\"]},null],[0,\"                \"],[11,\"th\",[]],[15,\"class\",\"cab-data-table-header-cell\"],[13],[0,\"Action\"],[14],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-data-table-body-container\"],[13],[0,\"\\n        \"],[11,\"table\",[]],[15,\"class\",\"cab-data-table\"],[13],[0,\"\\n            \"],[11,\"tbody\",[]],[15,\"class\",\"cab-data-table-body\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"data\"]]],null,{\"statements\":[[0,\"                \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-row\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columnKeys\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-cell\"],[13],[1,[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null],false],[14],[0,\"\\n\"]],\"locals\":[\"key\"]},null],[0,\"                    \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-action-cell\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"item\",\"status\"]],\"Blocked\"],null]],null,{\"statements\":[[0,\"                            \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button primary\"],[5,[\"action\"],[[28,[null]],[28,[\"passedAction\"]],[28,[\"item\"]]]],[13],[0,\"UNBLOCK\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                            \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button secondary\"],[5,[\"action\"],[[28,[null]],[28,[\"passedAction\"]],[28,[\"item\"]]]],[13],[0,\"BLOCK\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                    \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/dynamic-action-table.hbs" } });
});
define("cab-booking-application/templates/components/edit-action-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lO0EhWT+", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"cab-data-table-wrapper\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-data-table-container\"],[13],[0,\"\\n        \"],[11,\"table\",[]],[15,\"class\",\"cab-data-table\"],[13],[0,\"\\n            \"],[11,\"thead\",[]],[13],[0,\"\\n                \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-header\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columns\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"th\",[]],[15,\"class\",\"cab-data-table-header-cell\"],[13],[1,[28,[\"column\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"column\"]},null],[0,\"                    \"],[11,\"th\",[]],[15,\"class\",\"cab-data-table-header-cell\"],[13],[0,\"Action\"],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"tbody\",[]],[15,\"class\",\"cab-data-table-body\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"data\"]]],null,{\"statements\":[[0,\"                \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-row\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columnKeys\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-cell\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"and\"],[[28,[\"item\",\"isEditingFare\"]],[33,[\"eq\"],[[28,[\"key\"]],\"fare_per_km\"],null]],null]],null,{\"statements\":[[0,\"                                \"],[11,\"input\",[]],[15,\"type\",\"text\"],[16,\"value\",[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                                \"],[1,[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null],false],[0,\"\\n\"]],\"locals\":[]}],[0,\"                        \"],[14],[0,\"\\n\"]],\"locals\":[\"key\"]},null],[0,\"                    \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-action-cell\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"isEditingFare\"]]],null,{\"statements\":[[0,\"                            \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button primary\"],[5,[\"action\"],[[28,[null]],[28,[\"primaryAction\"]],[28,[\"item\"]]]],[13],[1,[26,[\"primaryActionName\"]],false],[14],[0,\"\\n                            \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button secondary\"],[5,[\"action\"],[[28,[null]],[28,[\"secondaryAction\"]],[28,[\"item\"]]]],[13],[1,[26,[\"secondaryActionName\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                            \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button secondary\"],[5,[\"action\"],[[28,[null]],[28,[\"editAction\"]],[28,[\"item\"]]]],[13],[0,\"EDIT\"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"                    \"],[14],[0,\"\\n                \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/edit-action-table.hbs" } });
});
define("cab-booking-application/templates/components/fixed-action-table", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "heUbXF2q", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"cab-data-table-wrapper\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-data-table-container\"],[13],[0,\"\\n        \"],[11,\"table\",[]],[15,\"class\",\"cab-data-table\"],[13],[0,\"\\n            \"],[11,\"thead\",[]],[13],[0,\"\\n                \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-header\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columns\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"th\",[]],[15,\"class\",\"cab-data-table-header-cell\"],[13],[1,[28,[\"column\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"column\"]},null],[6,[\"if\"],[[33,[\"not-equal\"],[[28,[\"primaryAction\"]],null],null]],null,{\"statements\":[[0,\"                        \"],[11,\"th\",[]],[15,\"class\",\"cab-data-table-header-cell\"],[13],[0,\"Action\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \"],[11,\"tbody\",[]],[15,\"class\",\"cab-data-table-body\"],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"not-equal\"],[[28,[\"secondaryAction\"]],null],null]],null,{\"statements\":[[6,[\"each\"],[[28,[\"data\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-row\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columnKeys\"]]],null,{\"statements\":[[0,\"                                \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-cell\"],[13],[1,[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null],false],[14],[0,\"\\n\"]],\"locals\":[\"key\"]},null],[0,\"                            \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-action-cell\"],[13],[0,\"\\n                                \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button primary\"],[5,[\"action\"],[[28,[null]],[28,[\"primaryAction\"]],[28,[\"item\"]]]],[13],[1,[26,[\"primaryActionName\"]],false],[14],[0,\"\\n                                \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button secondary\"],[5,[\"action\"],[[28,[null]],[28,[\"secondaryAction\"]],[28,[\"item\"]]]],[13],[1,[26,[\"secondaryActionName\"]],false],[14],[0,\"\\n                            \"],[14],[0,\"\\n                        \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"not-equal\"],[[28,[\"primaryAction\"]],null],null]],null,{\"statements\":[[6,[\"each\"],[[28,[\"data\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-row\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columnKeys\"]]],null,{\"statements\":[[0,\"                                \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-cell\"],[13],[1,[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null],false],[14],[0,\"\\n\"]],\"locals\":[\"key\"]},null],[0,\"                            \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-action-cell\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"item\",\"driver_report_message\"]]],null,{\"statements\":[[0,\"                                    \"],[11,\"span\",[]],[15,\"class\",\"reported-status\"],[13],[0,\"Reported\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"item\",\"user_report_message\"]]],null,{\"statements\":[[0,\"                                    \"],[11,\"span\",[]],[15,\"class\",\"reported-status\"],[13],[0,\"Reported\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                                    \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button secondary\"],[5,[\"action\"],[[28,[null]],[28,[\"primaryAction\"]],[28,[\"item\"]]]],[13],[1,[26,[\"primaryActionName\"]],false],[14],[0,\"\\n                                \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"                            \"],[14],[0,\"\\n                        \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null]],\"locals\":[]},{\"statements\":[[6,[\"each\"],[[28,[\"data\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"tr\",[]],[15,\"class\",\"cab-data-table-row\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"columnKeys\"]]],null,{\"statements\":[[0,\"                                \"],[11,\"td\",[]],[15,\"class\",\"cab-data-table-cell\"],[13],[1,[33,[\"get\"],[[28,[\"item\"]],[28,[\"key\"]]],null],false],[14],[0,\"\\n\"]],\"locals\":[\"key\"]},null],[0,\"                        \"],[14],[0,\"\\n\"]],\"locals\":[\"item\"]},null],[0,\"                \"]],\"locals\":[]}]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[18,\"default\"],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/fixed-action-table.hbs" } });
});
define("cab-booking-application/templates/components/nav-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "U/hdKpr0", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"layout-container\"],[13],[0,\"\\n  \"],[11,\"div\",[]],[15,\"class\",\"cab-navbar-container\"],[13],[0,\"\\n    \"],[11,\"nav\",[]],[15,\"class\",\"cab-navbar\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"cab-navbar-logo\"],[13],[0,\"\\n        \"],[11,\"img\",[]],[15,\"src\",\"/client/assets/cabAppLogo.jpeg\"],[15,\"alt\",\"homelogo\"],[13],[14],[0,\"\\n        Zoho Cabs\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"user\"],null]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"cab-navbar_welcome\"],[13],[0,\"USER CONTROL PANEL\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"driver\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"cab-navbar_welcome\"],[13],[0,\"DRIVER CONTROL PANEL\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"admin\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"cab-navbar_welcome\"],[13],[0,\"ADMIN CONTROL PANEL\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"superAdmin\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"div\",[]],[15,\"class\",\"cab-navbar_welcome\"],[13],[0,\"SUPERADMIN CONTROL PANEL\"],[14],[0,\"\\n        \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"cab-navbar-links\"],[13],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"cab-navbar__switch-role\"],[5,[\"action\"],[[28,[null]],\"switchRole\"]],[13],[1,[26,[\"switchUser\"]],false],[14],[0,\"\\n          \"],[11,\"div\",[]],[15,\"class\",\"cab-navbar__link-item\"],[13],[0,\"\\n            \"],[6,[\"link-to\"],[\"profile\"],[[\"class\"],[\"cab-navbar__link\"]],{\"statements\":[[0,\"PROFILE\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"main-content\"],[13],[0,\"\\n    \"],[18,\"default\"],[0,\"\\n\"],[6,[\"if\"],[[28,[\"isFormVisible\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"driver-form\"],null,[[\"isFormVisible\",\"closeForm\"],[[28,[null,\"isFormVisible\"]],[33,[\"action\"],[[28,[null]],\"closeForm\"],null]]]],false],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/nav-bar.hbs" } });
});
define("cab-booking-application/templates/components/side-bar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kNyjQwG0", "block": "{\"statements\":[[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"layout-container\"],[13],[0,\" \\n  \"],[11,\"div\",[]],[15,\"class\",\"cab-sidebar\"],[13],[0,\" \\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-sidebar__top-space\"],[13],[0,\"\\n      \"],[11,\"ul\",[]],[15,\"class\",\"cab-sidebar__left-menu\"],[13],[0,\" \\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"user\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"users\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"users\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-home sidebar-icon\"],[13],[14],[0,\"HOME\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"booking\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"booking\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-calendar-check sidebar-icon\"],[13],[14],[0,\"MY BOOKINGS\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"history\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"history\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-history sidebar-icon\"],[13],[14],[0,\"HISTORY\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"driver\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"drivers\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"drivers\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-paper-plane sidebar-icon\"],[13],[14],[0,\"RIDE REQUESTS\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"booking\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"booking\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-car sidebar-icon\"],[13],[14],[0,\"CURRENT RIDE\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"history\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"history\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-history sidebar-icon\"],[13],[14],[0,\"HISTORY\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"admin\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"companies\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"companies\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-home sidebar-icon\"],[13],[14],[0,\"HOME\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"companies.drivers\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"drivers\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-user-tie sidebar-icon\"],[13],[14],[0,\"DRIVERS\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"companies.users\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"users\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-user sidebar-icon\"],[13],[14],[0,\"USERS\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"companies.fares\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"fares\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-dollar-sign sidebar-icon\"],[13],[14],[0,\"FARES\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"history\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"history\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-history sidebar-icon\"],[13],[14],[0,\"HISTORY\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"superAdmin\"],null]],null,{\"statements\":[[0,\"          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"companies\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"companies\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-home sidebar-icon\"],[13],[14],[0,\"APPROVALS\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__menu-item\"],[13],[0,\" \\n            \"],[6,[\"link-to\"],[\"companies.details\"],[[\"class\"],[[33,[\"join-strings\"],[\"cab-sidebar__link \",[33,[\"if\"],[[33,[\"eq\"],[[28,[\"activeRoute\"]],\"details\"],null],\"active-route\",\"\"],null]],null]]],{\"statements\":[[11,\"i\",[]],[15,\"class\",\"fas fa-building sidebar-icon\"],[13],[14],[0,\"COMPANIES\"]],\"locals\":[]},null],[0,\"\\n          \"],[14],[0,\"\\n        \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"        \\n          \"],[11,\"li\",[]],[15,\"class\",\"cab-sidebar__logout-btn\"],[13],[0,\"\\n              \"],[11,\"div\",[]],[15,\"class\",\"cab-sidebar__link\"],[5,[\"action\"],[[28,[null]],\"logoutUser\"]],[13],[11,\"i\",[]],[15,\"class\",\"fas fa-sign-out-alt sidebar-icon\"],[13],[14],[0,\"LOG OUT\"],[14],[0,\"\\n          \"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[18,\"default\"],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/components/side-bar.hbs" } });
});
define("cab-booking-application/templates/drivers", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RdOkHH4I", "block": "{\"statements\":[[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"layout-container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-nav-bar\"],[13],[0,\"\\n        \"],[1,[26,[\"nav-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-display-area\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-side-bar\"],[13],[0,\"\\n            \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-driver-home\"],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-content-area\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"cab-location-container\"],[13],[0,\"\\n              \"],[11,\"select\",[]],[15,\"id\",\"cab-location\"],[15,\"class\",\"cab-select\"],[16,\"value\",[28,[null,\"location\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[null,\"location\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[15,\"style\",\"max-height: 100px; overflow-y: auto;\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[null,\"locations\"]]],null,{\"statements\":[[0,\"                      \"],[11,\"option\",[]],[16,\"value\",[28,[\"location\",\"value\"]],null],[13],[1,[28,[\"location\",\"label\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"location\"]},null],[0,\"              \"],[14],[0,\"\\n              \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button\"],[5,[\"action\"],[[28,[null]],\"updateLocation\"]],[13],[0,\"\\n                  UPDATE LOCATION\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n            \\n            \"],[11,\"div\",[]],[15,\"class\",\"cab-content-container\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"errorMessage\"]]],null,{\"statements\":[[0,\"                    \"],[11,\"div\",[]],[15,\"class\",\"cab-error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"                    \"],[1,[33,[\"fixed-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"primaryAction\",\"secondaryAction\",\"primaryActionName\",\"secondaryActionName\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"Customer Name\",\"Start Location\",\"End Location\",\"Fare\"],null],[33,[\"to-array\"],[\"name\",\"start_location\",\"end_location\",\"fare\"],null],[33,[\"action\"],[[28,[null]],\"acceptBooking\"],null],[33,[\"action\"],[[28,[null]],\"cancelBooking\"],null],\"ACCEPT\",\"REJECT\"]]],false],[0,\"\\n                \"]],\"locals\":[]},null]],\"locals\":[]}],[0,\"            \"],[14],[0,\"\\n            \\n            \"],[11,\"div\",[]],[15,\"class\",\"cab-child-link\"],[13],[0,\"\\n                \"],[1,[26,[\"outlet\"]],false],[0,\"\\n            \"],[14],[0,\"\\n        \"],[14],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/drivers.hbs" } });
});
define("cab-booking-application/templates/history", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KipUOWG9", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"taxi-container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-nav-bar\"],[13],[0,\"\\n      \"],[1,[26,[\"nav-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-history-page\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-display-area\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-side-bar\"],[13],[0,\"\\n        \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-content-area\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"errorMessage\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"cab-error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"user\"],null]],null,{\"statements\":[[0,\"            \"],[1,[33,[\"fixed-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"primaryAction\",\"primaryActionName\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"Company Name\",\"Start Location\",\"End Location\",\"Started At\",\"Ended At\",\"Fare\",\"Status\"],null],[33,[\"to-array\"],[\"name\",\"startlocation\",\"endlocation\",\"start_at\",\"end_at\",\"fare\",\"status\"],null],[33,[\"action\"],[[28,[null]],\"report\"],null],\"REPORT\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"driver\"],null]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"fixed-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"primaryAction\",\"primaryActionName\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"Customer Name\",\"Start Location\",\"End Location\",\"Started At\",\"Ended At\",\"Fare\",\"Status\"],null],[33,[\"to-array\"],[\"name\",\"start_location\",\"end_location\",\"start_at\",\"end_at\",\"fare\",\"status\"],null],[33,[\"action\"],[[28,[null]],\"report\"],null],\"REPORT\"]]],false],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"admin\"],null]],null,{\"statements\":[[0,\"                \"],[1,[33,[\"fixed-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\"],[[28,[\"model\"]],[33,[\"to-array\"],[\"Customer Name\",\"Driver Name\",\"Start Location\",\"End Location\",\"Started At\",\"Ended At\",\"Fare\",\"Status\",\"User Complaint\",\"Driver Complaint\"],null],[33,[\"to-array\"],[\"customername\",\"drivername\",\"startlocation\",\"endlocation\",\"start_at\",\"end_at\",\"fare\",\"status\",\"user_report_message\",\"driver_report_message\"],null]]]],false],[0,\"\\n            \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"        \"],[11,\"div\",[]],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"reportModalVisible\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"overlay\"],[13],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"report-modal\"],[13],[0,\"\\n                \"],[11,\"h3\",[]],[13],[0,\"Report Issue\"],[14],[0,\"\\n                \\n                \"],[11,\"label\",[]],[15,\"for\",\"reason\"],[13],[0,\"Reason for Reporting\"],[14],[0,\"\\n                \"],[11,\"input\",[]],[15,\"id\",\"reason\"],[15,\"type\",\"text\"],[16,\"value\",[26,[\"reportReason\"]],null],[16,\"oninput\",[33,[\"action\"],[[28,[null]],[33,[\"mut\"],[[28,[\"reportReason\"]]],null]],[[\"value\"],[\"target.value\"]]],null],[13],[14],[0,\"\\n\\n                \"],[11,\"div\",[]],[15,\"class\",\"modal-actions\"],[13],[0,\"\\n                    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"submitReport\"]],[13],[0,\"OK\"],[14],[0,\"\\n                    \"],[11,\"button\",[]],[5,[\"action\"],[[28,[null]],\"closeReport\"]],[13],[0,\"Cancel\"],[14],[0,\"\\n                \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n                \"],[1,[26,[\"outlet\"]],false],[0,\"\\n        \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/history.hbs" } });
});
define("cab-booking-application/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1vHKJLtq", "block": "{\"statements\":[[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"taxi-container\"],[13],[0,\"\\n  \"],[11,\"header\",[]],[13],[0,\"\\n    \"],[1,[26,[\"auth-links\"]],false],[0,\" \"],[4,\" Navigation Bar \"],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"homepage-content\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"hero-section\"],[13],[0,\"\\n      \"],[11,\"h1\",[]],[13],[0,\"Book Your Ride with Ease\"],[14],[0,\"\\n      \"],[11,\"p\",[]],[13],[0,\"Reliable, comfortable, and affordable rides at your fingertips\"],[14],[0,\"\\n      \"],[6,[\"link-to\"],[\"login\"],[[\"class\"],[\"alternative-btn\"]],{\"statements\":[[0,\"Login to Book a Cab Now\"]],\"locals\":[]},null],[0,\"\\n\\n    \"],[14],[0,\"\\n\\n    \"],[11,\"div\",[]],[15,\"class\",\"features-section\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"feature-item\"],[13],[0,\"\\n        \"],[11,\"h3\",[]],[13],[0,\"Affordable Rates\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"Enjoy budget-friendly fares without compromising on quality and comfort\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"feature-item\"],[13],[0,\"\\n        \"],[11,\"h3\",[]],[13],[0,\"Trusted Drivers\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"Our drivers are carefully selected to ensure a safe and pleasant ride\"],[14],[0,\"\\n      \"],[14],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"feature-item\"],[13],[0,\"\\n        \"],[11,\"h3\",[]],[13],[0,\"24/7 Support\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[13],[0,\"We are here to help anytime, day or night.\"],[14],[0,\"\\n      \"],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n    \"],[1,[26,[\"outlet\"]],false],[0,\" \"],[4,\" Dynamic Content Area \"],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/index.hbs" } });
});
define("cab-booking-application/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LVVY15KM", "block": "{\"statements\":[[0,\" \"],[11,\"div\",[]],[15,\"class\",\"cab-login-page\"],[13],[0,\"\\n  \"],[11,\"header\",[]],[13],[0,\"\\n    \"],[1,[26,[\"auth-links\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"cab-login-content\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-login-form-container\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"cab-welcome-container\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[15,\"class\",\"cab-title\"],[13],[0,\"Welcome to Zoho Cabs\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"cab-message\"],[13],[0,\"Log in to book your ride now!\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"form\",[]],[15,\"class\",\"cab-login-form\"],[5,[\"action\"],[[28,[null]],\"login\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"login-phone-number\"],[13],[0,\"Phone Number\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"name\",\"value\",\"placeholder\"],[\"login-phone-number\",\"cab-input\",\"phoneNumber\",[28,[\"phoneNumber\"]],\"Enter your phone number\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"phoneNumberError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"phoneNumberError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"login-password\"],[13],[0,\"Password\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"login-password\",\"cab-input\",\"password\",\"password\",[28,[\"password\"]],\"Enter your password\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"passWordError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"passWordError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"cab-btn-generic\"],[13],[0,\"Submit\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"p\",[]],[15,\"class\",\"cab-signup-link\"],[13],[0,\"Don't have an account? \"],[6,[\"link-to\"],[\"signup\"],null,{\"statements\":[[0,\"Sign up here\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n    \"],[1,[26,[\"outlet\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"  \\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/login.hbs" } });
});
define("cab-booking-application/templates/not-found", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FdpT8iUD", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"not-found-message\"],[13],[0,\"\\n  \"],[11,\"h1\",[]],[13],[0,\"404 - Page Not Found\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"The page you are looking for does not exist\"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/not-found.hbs" } });
});
define("cab-booking-application/templates/profile", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "OnSftS7w", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"taxi-container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-nav-bar\"],[13],[0,\"\\n      \"],[1,[26,[\"nav-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-display-area\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-side-bar\"],[13],[0,\"\\n        \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-profile-page\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-content-area\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[\"errorMessage\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"error\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"defaultRole\"]],\"user\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"cab-profile-form\"],[13],[0,\"\\n              \"],[11,\"form\",[]],[13],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"User Name\",\"cab-user-name\",[28,[\"model\",\"name\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Phone Number\",\"cab-phone-number\",[28,[\"model\",\"phone_number\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Email\",\"cab-email\",[28,[\"model\",\"email\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Address\",\"cab-address\",[28,[\"model\",\"address\"]],\"text\",\"true\"]]],false],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\" \\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"defaultRole\"]],\"driver\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"cab-profile-form\"],[13],[0,\"\\n              \"],[11,\"form\",[]],[13],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"User Name\",\"cab-user-name\",[28,[\"model\",\"username\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Phone Number\",\"cab-phone-number\",[28,[\"model\",\"phone_number\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Email\",\"cab-email\",[28,[\"model\",\"email\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"License Number\",\"cab-license-number\",[28,[\"model\",\"license_number\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Register Number\",\"cab-register-number\",[28,[\"model\",\"register_number\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Company Name\",\"cab-company-name\",[28,[\"model\",\"companyname\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Address\",\"cab-address\",[28,[\"model\",\"address\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Driver Status\",\"cab-driver-status\",[28,[\"model\",\"driverstatus\"]],\"text\",\"true\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"driverstatus\"]],\"Pending\"],null]],null,{\"statements\":[[0,\"                  \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button secondary\"],[5,[\"action\"],[[28,[null]],\"cancelRequest\",[28,[\"model\"]]]],[13],[0,\"Cancel\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"presentRole\"]],\"driver\"],null]],null,{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"driverstatus\"]],\"Approved\"],null]],null,{\"statements\":[[0,\"                    \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Weekly Earnings\",\"cab-weekly-earnings\",[28,[\"model\",\"earnings\"]],\"text\",\"true\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"eq\"],[[28,[\"model\",\"cabstatus\"]],\"UnAvailable\"],null]],null,{\"statements\":[[0,\"                      \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button primary\"],[5,[\"action\"],[[28,[null]],\"cabAvialableStatus\",[28,[\"model\"]]]],[13],[0,\"CHECK IN\"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"                      \"],[11,\"button\",[]],[15,\"class\",\"cab-action-button secondary\"],[5,[\"action\"],[[28,[null]],\"cabAvialableStatus\",[28,[\"model\"]]]],[13],[0,\"CHECK OUT\"],[14],[0,\"\\n\"]],\"locals\":[]}]],\"locals\":[]},null]],\"locals\":[]},null],[0,\"              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"defaultRole\"]],\"admin\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"cab-profile-form\"],[13],[0,\"\\n              \"],[11,\"form\",[]],[13],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"User Name\",\"cab-user-name\",[28,[\"model\",\"username\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Phone Number\",\"cab-phone-number\",[28,[\"model\",\"phone_number\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Email\",\"cab-email\",[28,[\"model\",\"email\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Company Name\",\"cab-company-name\",[28,[\"model\",\"companyname\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Role\",\"cab-admin-role\",[28,[\"model\",\"role\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Address\",\"cab-address\",[28,[\"model\",\"address\"]],\"text\",\"true\"]]],false],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[33,[\"eq\"],[[28,[\"defaultRole\"]],\"superAdmin\"],null]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"cab-profile-form\"],[13],[0,\"\\n              \"],[11,\"form\",[]],[13],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"User Name\",\"cab-user-name\",[28,[\"model\",\"username\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Phone Number\",\"cab-phone-number\",[28,[\"model\",\"phone_number\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Email\",\"cab-email\",[28,[\"model\",\"email\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Company Name\",\"cab-company-name\",[28,[\"model\",\"companyname\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Role\",\"cab-admin-role\",[28,[\"model\",\"role\"]],\"text\",\"true\"]]],false],[0,\"\\n                \"],[1,[33,[\"cab-form-input\"],null,[[\"label\",\"id\",\"value\",\"type\",\"read\"],[\"Address\",\"cab-address\",[28,[\"model\",\"address\"]],\"text\",\"true\"]]],false],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n          \"]],\"locals\":[]},null]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}]],\"locals\":[]}],[0,\"      \"],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n              \"],[1,[26,[\"outlet\"]],false],[0,\"\\n            \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/profile.hbs" } });
});
define("cab-booking-application/templates/register", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "X1zVBXZ0", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"company-signup-page\"],[13],[0,\"\\n  \"],[11,\"header\",[]],[13],[0,\"\\n    \"],[1,[26,[\"auth-links\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"company-signup-content\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"company-signup-form-container\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"company-welcome-container\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[15,\"class\",\"company-title\"],[13],[0,\"Welcome to Zoho Cabs\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"company-message\"],[13],[0,\"Register your company to start offering rides!\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"form\",[]],[15,\"class\",\"company-signup-form\"],[5,[\"action\"],[[28,[null]],\"register\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"company-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"company-name\"],[13],[0,\"Company Name\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"company-name\",\"company-input\",\"text\",\"companyName\",[28,[\"companyName\"]],\"Enter your company name\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"companyNameError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"companyNameError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"company-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"started-year\"],[13],[0,\"Started Year\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"started-year\",\"company-input\",\"number\",\"startedYear\",[28,[\"startedYear\"]],\"Enter the year the company started\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"startedYearError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"startedYearError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"company-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"company-description\"],[13],[0,\"Description\"],[14],[0,\"\\n          \"],[1,[33,[\"textarea\"],null,[[\"id\",\"class\",\"name\",\"value\",\"placeholder\"],[\"company-description\",\"company-textarea\",\"description\",[28,[\"description\"]],\"Describe your company\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"descriptionError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"descriptionError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"company-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"contact-full-name\"],[13],[0,\"Contact Person Name\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"contact-full-name\",\"company-input\",\"text\",\"contactFullName\",[28,[\"contactFullName\"]],\"Enter contact person full name\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"adminNameError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"adminNameError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"company-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"contact-email\"],[13],[0,\"Contact Email\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"contact-email\",\"company-input\",\"email\",\"contactEmail\",[28,[\"contactEmail\"]],\"Enter contact email\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"emailError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"emailError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"company-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"contact-phone-number\"],[13],[0,\"Contact Phone Number\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"name\",\"value\",\"placeholder\"],[\"contact-phone-number\",\"company-input\",\"contactPhoneNumber\",[28,[\"contactPhoneNumber\"]],\"Enter contact phone number\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"phoneNumberError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"phoneNumberError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"company-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"contact-address\"],[13],[0,\"Contact Address\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"contact-address\",\"company-input\",\"text\",\"contactAddress\",[28,[\"contactAddress\"]],\"Enter contact address\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"addressError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"addressError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"company-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"company-password\"],[13],[0,\"Password\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"company-password\",\"company-input\",\"password\",\"password\",[28,[\"password\"]],\"Create a password\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"passwordError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"passwordError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"company-btn-generic\"],[13],[0,\"Register Company\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"p\",[]],[15,\"class\",\"company-login-link\"],[13],[0,\"Already have an account? \"],[6,[\"link-to\"],[\"login\"],null,{\"statements\":[[0,\"Log in here\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\\n\"],[11,\"div\",[]],[15,\"class\",\"company-content\"],[13],[0,\"\\n  \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/register.hbs" } });
});
define("cab-booking-application/templates/signup", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5VRVNzk/", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"cab-signup-page\"],[13],[0,\"\\n  \"],[11,\"header\",[]],[13],[0,\"\\n    \"],[1,[26,[\"auth-links\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"cab-signup-content\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-signup-form-container\"],[13],[0,\"\\n      \"],[11,\"div\",[]],[15,\"class\",\"cab-welcome-container\"],[13],[0,\"\\n        \"],[11,\"h2\",[]],[15,\"class\",\"cab-title\"],[13],[0,\"Welcome to Zoho Cabs\"],[14],[0,\"\\n        \"],[11,\"p\",[]],[15,\"class\",\"cab-message\"],[13],[0,\"Create your account to book your ride!\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"form\",[]],[15,\"class\",\"cab-signup-form\"],[5,[\"action\"],[[28,[null]],\"signup\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"signup-full-name\"],[13],[0,\"Full Name\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"signup-full-name\",\"cab-input\",\"text\",\"fullName\",[28,[\"fullName\"]],\"Enter your full name\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"nameError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"nameError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n        \\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"signup-phone-number\"],[13],[0,\"Phone Number\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"name\",\"value\",\"placeholder\"],[\"signup-phone-number\",\"cab-input\",\"phoneNumber\",[28,[\"phoneNumber\"]],\"Enter your phone number\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"phoneNumberError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"phoneNumberError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"signup-email\"],[13],[0,\"Email\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"signup-email\",\"cab-input\",\"text\",\"email\",[28,[\"email\"]],\"Enter your email\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"emailError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"emailError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \\n        \\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"signup-address\"],[13],[0,\"Address\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"signup-address\",\"cab-input\",\"text\",\"address\",[28,[\"address\"]],\"Enter your address\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"addressError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"addressError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"div\",[]],[15,\"class\",\"cab-input-group\"],[13],[0,\"\\n          \"],[11,\"label\",[]],[15,\"for\",\"signup-password\"],[13],[0,\"Password\"],[14],[0,\"\\n          \"],[1,[33,[\"input\"],null,[[\"id\",\"class\",\"type\",\"name\",\"value\",\"placeholder\"],[\"signup-password\",\"cab-input\",\"password\",\"password\",[28,[\"password\"]],\"Create a password\"]]],false],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"passWordError\"]]],null,{\"statements\":[[0,\"              \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"passWordError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"        \"],[14],[0,\"\\n\\n        \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"cab-btn-generic\"],[13],[0,\"Sign Up\"],[14],[0,\"\\n      \"],[14],[0,\"\\n\\n      \"],[11,\"p\",[]],[15,\"class\",\"cab-login-link\"],[13],[0,\"Already have an account? \"],[6,[\"link-to\"],[\"login\"],null,{\"statements\":[[0,\"Log in here\"]],\"locals\":[]},null],[14],[0,\"\\n    \"],[14],[0,\"\\n  \"],[14],[0,\"\\n\\n  \"],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n    \"],[1,[26,[\"outlet\"]],false],[0,\"\\n  \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/signup.hbs" } });
});
define("cab-booking-application/templates/users", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RcgADmnU", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"taxi-container\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-nav-bar\"],[13],[0,\"\\n      \"],[1,[26,[\"nav-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-display-area\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-side-bar\"],[13],[0,\"\\n        \"],[1,[26,[\"side-bar\"]],false],[0,\"\\n    \"],[14],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-user-home\"],[13],[0,\"\\n    \"],[11,\"div\",[]],[15,\"class\",\"cab-content-area\"],[13],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"errorMessage\"]]],null,{\"statements\":[[0,\"        \"],[11,\"div\",[]],[15,\"class\",\"cab-error-message\"],[13],[1,[26,[\"errorMessage\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[6,[\"if\"],[[28,[null,\"isFormAction\"]]],null,{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"cab-book-page\"],[13],[0,\" \\n              \"],[11,\"div\",[]],[15,\"class\",\"slogan\"],[13],[0,\"Find Your Perfect Ride!\"],[14],[0,\"\\n              \"],[11,\"form\",[]],[15,\"class\",\"cab-form\"],[5,[\"action\"],[[28,[null]],\"checkAvailableCabs\"],[[\"on\"],[\"submit\"]]],[13],[0,\"\\n                \"],[11,\"ul\",[]],[15,\"class\",\"cab-form-group\"],[13],[0,\"\\n                  \"],[11,\"li\",[]],[15,\"class\",\"cab-form-item\"],[13],[0,\"\\n                    \"],[11,\"label\",[]],[15,\"for\",\"cab-start-location\"],[15,\"class\",\"cab-label\"],[13],[0,\"Start Location\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"startLocationError\"]]],null,{\"statements\":[[0,\"                      \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"startLocationError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                    \"],[11,\"select\",[]],[15,\"id\",\"cab-start-location\"],[15,\"class\",\"cab-select\"],[16,\"value\",[26,[\"startLocation\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"updateStartLocation\"],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[null,\"locations\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"option\",[]],[16,\"value\",[28,[\"location\",\"value\"]],null],[13],[1,[28,[\"location\",\"label\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"location\"]},null],[0,\"                    \"],[14],[0,\"\\n                  \"],[14],[0,\"\\n                  \"],[11,\"li\",[]],[15,\"class\",\"cab-form-item\"],[13],[0,\"\\n                    \"],[11,\"label\",[]],[15,\"for\",\"cab-end-location\"],[15,\"class\",\"cab-label\"],[13],[0,\"End Location\"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[null,\"endLocationError\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"div\",[]],[15,\"class\",\"error-message\"],[13],[1,[28,[null,\"endLocationError\"]],false],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"                    \"],[11,\"select\",[]],[15,\"id\",\"cab-end-location\"],[15,\"class\",\"cab-select\"],[16,\"value\",[26,[\"endLocation\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"updateEndLocation\"],[[\"value\"],[\"target.value\"]]],null],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[null,\"locations\"]]],null,{\"statements\":[[0,\"                        \"],[11,\"option\",[]],[16,\"value\",[28,[\"location\",\"value\"]],null],[13],[1,[28,[\"location\",\"label\"]],false],[14],[0,\"\\n\"]],\"locals\":[\"location\"]},null],[0,\"                    \"],[14],[0,\"\\n                  \"],[14],[0,\"\\n                  \"],[11,\"li\",[]],[15,\"class\",\"cab-form-item cab-submit-container\"],[13],[0,\"\\n                    \"],[11,\"button\",[]],[15,\"type\",\"submit\"],[15,\"class\",\"cab-submit-btn\"],[13],[0,\"SEARCH\"],[14],[0,\"\\n                  \"],[14],[0,\"\\n                \"],[14],[0,\"\\n              \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]},{\"statements\":[[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"cab-results-container\"],[13],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"cab-results-header\"],[13],[11,\"button\",[]],[15,\"type\",\"button\"],[15,\"class\",\"cab-back-btn\"],[5,[\"action\"],[[28,[null]],\"goBack\"]],[13],[0,\"Back\"],[14],[14],[0,\"\\n            \"],[11,\"div\",[]],[15,\"class\",\"cab-results-table\"],[13],[0,\"\\n            \"],[1,[33,[\"fixed-action-table\"],null,[[\"data\",\"columns\",\"columnKeys\",\"primaryAction\",\"primaryActionName\"],[[28,[\"availablecabs\"]],[33,[\"to-array\"],[\"Company Name\",\"Model Name\",\"Cab Register Number\",\"Fare\",\"Start Location\",\"End Location\"],null],[33,[\"to-array\"],[\"name\",\"model\",\"register_number\",\"fare\",\"startLocation\",\"endLocation\"],null],[33,[\"action\"],[[28,[null]],\"bookCab\"],null],\"BOOK\"]]],false],[0,\"\\n            \"],[14],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"            \"],[11,\"div\",[]],[15,\"class\",\"cab-content\"],[13],[0,\"\\n              \"],[1,[26,[\"outlet\"]],false],[0,\"\\n            \"],[14],[0,\"\\n\"]],\"locals\":[]}],[0,\"    \"],[14],[0,\"\\n    \"],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "cab-booking-application/templates/users.hbs" } });
});
define('cab-booking-application/utils/api-request', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = apiRequest;
  function apiRequest(url, method) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var self = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var options = {
      url: url,
      method: method,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      }
    };

    if (data) {
      options.contentType = 'application/json';
      options.data = JSON.stringify(data);
    }
    return $.ajax(options).then(function (response) {
      console.log(response);
      return response;
    }).catch(function (xhr, status, error) {

      if (xhr.status === 401) {
        var message = xhr.responseText;
        if (message === 'Invalid Session') {
          Ember.getOwner(self).lookup('router:main').transitionTo('index');
          xhr.responseText = 'Session has expired. Redirecting to login.';
          self.get('alertService').alert("Please do login again and continue");
          localStorage.clear();
        } else if (message === 'Unauthorized Request') {
          self.get('alertService').alert("You don't have access to this resource");
        }
      }
      return Promise.reject({
        status: xhr.status,
        message: xhr.responseJSON ? xhr.responseJSON.message : 'An unknown error occurred.'
      });
    });
  }
});
define('cab-booking-application/utils/logout', ['exports', 'cab-booking-application/utils/api-request'], function (exports, _apiRequest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = logout;
  function logout() {
    var self = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var userId = localStorage.getItem('userId');
    var userdata = {
      userId: userId
    };

    (0, _apiRequest.default)('http://localhost:8080/auth/logout', 'POST', userdata).then(function (response) {
      localStorage.clear();
      Ember.getOwner(self).lookup('router:main').transitionTo('index');
      if (self != null) {
        self.get('alertService').alert("Please do login again to continue");
      }
    }).catch(function (error) {
      console.log(error.message);
    });
  }
});
define("cab-booking-application/utils/validate-email", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validateEmail;
  function validateEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
});
define("cab-booking-application/utils/validate-password", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validatePassword;
  function validatePassword(password) {
    var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
});
define("cab-booking-application/utils/validate-phone-number", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validatePhoneNumber;
  function validatePhoneNumber(phoneNumber) {
    var phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }
});


define('cab-booking-application/config/environment', ['ember'], function(Ember) {
  var prefix = 'cab-booking-application';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("cab-booking-application/app")["default"].create({"name":"cab-booking-application","version":"0.0.0+290b26cd"});
}
//# sourceMappingURL=cab-booking-application.map
