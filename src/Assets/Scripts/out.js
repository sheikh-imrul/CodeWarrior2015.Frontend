var directives = angular.module('directives', []);
var testme;
(function (testme) {
    testme.html = '<div>Hey wassup yo! what</div>';
})(testme || (testme = {}));
var Controllers;
(function (Controllers) {
    var MainController = (function () {
        function MainController($scope) {
            this.message = " Imrul Hasan asdf";
            $scope.vm = this;
        }
        return MainController;
    })();
    Controllers.MainController = MainController;
})(Controllers || (Controllers = {}));
var Controllers;
(function (Controllers) {
    var TestController = (function () {
        function TestController($scope) {
            this.message = "foo";
            $scope.vm = this;
        }
        return TestController;
    })();
    Controllers.TestController = TestController;
})(Controllers || (Controllers = {}));
var Controllers;
(function (Controllers) {
    var HomeController = (function () {
        function HomeController($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$localStorage = $localStorage;
            this.init();
        }
        HomeController.prototype.init = function () {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
            }
            else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
                jQuery('#account-id').hide();
            }
        };
        return HomeController;
    })();
    Controllers.HomeController = HomeController;
})(Controllers || (Controllers = {}));
directives.directive('testme', function () {
    return {
        restrict: 'EAC',
        template: testme.html
    };
});
var LoginService = (function () {
    function LoginService() {
    }
    LoginService.prototype.login = function (data) {
        var loginUrl = "http://localhost:41591/Token";
        return $.post(loginUrl, data);
    };
    LoginService.prototype.register = function (data) {
        var registerUrl = "http://localhost:41591/api/account/register";
        return $.post(registerUrl, data);
    };
    return LoginService;
})();
var AccountService = (function () {
    function AccountService() {
    }
    AccountService.prototype.getProfile = function (data) {
        var getUrl = "http://localhost:64237/api/profile/get";
        return $.post(getUrl, data);
    };
    AccountService.prototype.saveProfile = function (data) {
        var saveUrl = "http://localhost:64237/api/profile/save";
        return $.post(saveUrl, data);
    };
    return AccountService;
})();
angular.module('codeWarriorApp.controllers', []).controller(Controllers);
angular.module('codeWarriorApp', ['codeWarriorApp.controllers', 'codeWarriorApp.services', 'ngRoute', 'ngStorage']).config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.when('/home', { templateUrl: 'App/Templates/home.html', controller: 'HomeController' }).when('/login', { templateUrl: 'App/Templates/login.html', controller: 'LoginController' }).when('/account/:id', { templateUrl: 'App/Templates/account.html', controller: 'AccountController' }).otherwise({ redirectTo: '/home' });
}]);
var services = angular.module('codeWarriorApp.services', []);
var Controllers;
(function (Controllers) {
    var AccountController = (function () {
        function AccountController($scope, $rootScope, $localStorage) {
            this.accountService = new AccountService();
            this.profileEditMessage = '';
            this.accountModel = {
                userName: '',
                fullName: '',
                sex: '',
                addressLine1: '',
                addressLine2: '',
                mobile: '',
                email: '',
                password: '',
                confirmPassword: ''
            };
            this.saveProfile = function () {
                if (this.validateProfileEdit()) {
                }
            };
            this.validateProfileEdit = function () {
                if (!this.accountModel.fullName) {
                    this.profileEditMessage = 'user name field is empty';
                    return false;
                }
                if (!this.accountModel.mobile) {
                    this.profileEditMessage = 'mobile number field is empty';
                    return false;
                }
                if (!this.accountModel.email) {
                    this.profileEditMessage = 'email field is empty';
                    return false;
                }
                if (!this.accountModel.password) {
                    this.profileEditMessage = 'password field is empty';
                    return false;
                }
                if (this.accountModel.password.length < 6) {
                    this.profileEditMessage = 'passowrd must be atleast 6 character/digit long';
                    return false;
                }
                if (this.accountModel.password != this.accountModel.confirmPassword) {
                    this.signupMessage = 'passowrd not matched';
                    return false;
                }
                return true;
            };
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.init();
        }
        AccountController.prototype.init = function () {
            this.checkLoginStatus();
            this.callGetProfileService();
        };
        AccountController.prototype.callSaveProfileService = function () {
            var pub = this;
            this.profileEditMessage = 'Updating..';
            var data = 'userName=' + this.accountModel.userName + '&password=' + this.accountModel.password + '&confirmPassword=' + this.accountModel.confirmPassword + '&fullName=' + this.accountModel.fullName + '&sex=' + this.accountModel.sex + "&address=" + this.accountModel.addressLine1 + '|' + this.accountModel.addressLine2 + '&phoneNumber=' + this.accountModel.mobile + '&emailAddress=' + this.accountModel.email;
            this.accountService.saveProfile(data).done(function (response) {
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Saved successfully';
                });
            }).fail(function (response) {
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Error while saving profile information';
                });
            });
        };
        AccountController.prototype.callGetProfileService = function () {
            this.accountModel.userName = this.$localStorage.userName;
            this.accountModel.fullName = 'Code Warrior';
            this.accountModel.sex = 'Male';
            this.accountModel.addressLine1 = 'addressLine1';
            this.accountModel.addressLine2 = 'addressLine2';
            this.accountModel.mobile = '34059834';
            this.accountModel.email = 'tbh.tilok@live.com';
            this.accountModel.password = 'cwcUser';
            var pub = this;
            var data = 'userName=' + this.$localStorage.userName;
            this.accountService.getProfile(data).done(function (response) {
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Saved successfully';
                });
            }).fail(function (response) {
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Error while saving profile information';
                });
            });
        };
        AccountController.prototype.checkLoginStatus = function () {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
            }
            else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
                jQuery('#account-id').hide();
            }
        };
        return AccountController;
    })();
    Controllers.AccountController = AccountController;
})(Controllers || (Controllers = {}));
var Controllers;
(function (Controllers) {
    var LoginController = (function () {
        function LoginController($scope, $rootScope, $localStorage, $location) {
            this.loginServicve = new LoginService();
            this.loginMessage = '';
            this.signupMessage = '';
            this.loginModel = { userName: 'tilok369', password: '' };
            this.signupModel = {
                userName: '',
                fullName: '',
                sex: '',
                addressLine1: '',
                addressLine2: '',
                mobile: '',
                email: '',
                password: '',
                confirmPassword: ''
            };
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.$location = $location;
            this.init();
        }
        LoginController.prototype.init = function () {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
            }
            else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
                jQuery('#account-id').hide();
            }
        };
        LoginController.prototype.login = function () {
            if (this.validateLogin()) {
                this.loginMessage = '';
                this.callLoginService(this.loginModel.userName, this.loginModel.password, this.loginModel.password);
            }
        };
        LoginController.prototype.signup = function () {
            if (this.validateSingup()) {
                this.signupMessage = '';
                this.callRegisterService();
            }
        };
        LoginController.prototype.callLoginService = function (userName, password, confirmPassowrd) {
            var pub = this;
            this.loginMessage = 'logging in..';
            var data = 'userName=' + userName + '&password=' + password + '&confirmPassword=' + confirmPassowrd + '&grant_type=password';
            this.loginServicve.login(data).done(function (response) {
                pub.$localStorage.accessToken = response.access_token;
                pub.$localStorage.userName = userName;
                pub.showLoginMenu();
                pub.$scope.$apply(function () {
                    pub.$location.path('/home');
                });
            }).fail(function (response) {
                pub.$scope.$apply(function () {
                    pub.loginMessage = 'invalid user name or password';
                });
            });
        };
        LoginController.prototype.callRegisterService = function () {
            var pub = this;
            this.signupMessage = 'Registering..';
            var data = 'userName=' + this.signupModel.userName + '&password=' + this.signupModel.password + '&confirmPassword=' + this.signupModel.confirmPassword + '&fullName=' + this.signupModel.fullName + '&sex=' + this.signupModel.sex + "&address=" + this.signupModel.addressLine1 + '|' + this.signupModel.addressLine2 + '&phoneNumber=' + this.signupModel.mobile + '&emailAddress=' + this.signupModel.email;
            this.loginServicve.register(data).done(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.clearRegisterModel();
                    pub.signupMessage = 'Registration successful';
                });
            }).fail(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.signupMessage = 'Invalid request, please check all the fields again';
                });
            });
        };
        LoginController.prototype.validateLogin = function () {
            if (!this.loginModel.userName) {
                this.loginMessage = 'User name field is empty';
                return false;
            }
            if (!this.loginModel.password) {
                this.loginMessage = 'password field is empty';
                return false;
            }
            return true;
        };
        LoginController.prototype.validateSingup = function () {
            if (!this.signupModel.userName) {
                this.signupMessage = 'user name field is empty';
                return false;
            }
            if (!this.signupModel.fullName) {
                this.signupMessage = 'name field is empty';
                return false;
            }
            if (!this.signupModel.mobile) {
                this.signupMessage = 'mobile number field is empty';
                return false;
            }
            if (!this.signupModel.email) {
                this.signupMessage = 'email field is empty';
                return false;
            }
            if (!this.signupModel.password) {
                this.signupMessage = 'password field is empty';
                return false;
            }
            if (this.signupModel.password.length < 6) {
                this.signupMessage = 'passowrd must be atleast 6 character/digit long';
                return false;
            }
            if (this.signupModel.password != this.signupModel.confirmPassword) {
                this.signupMessage = 'passowrd not matched';
                return false;
            }
            return true;
        };
        LoginController.prototype.clearRegisterModel = function () {
            this.signupModel.userName = '';
            this.signupModel.password = '';
            this.signupModel.confirmPassword = '';
            this.signupModel.fullName = '';
            this.signupModel.sex = '';
            this.signupModel.addressLine1 = '';
            this.signupModel.addressLine2 = '';
            this.signupModel.mobile = '';
            this.signupModel.email = '';
        };
        LoginController.prototype.showLoginMenu = function () {
            jQuery('#login-id').hide();
            jQuery('#logout-id').show();
            jQuery('#user-id').show();
            jQuery('#account-id').show();
            jQuery('#account-id a').attr('href', '#/account/' + this.$localStorage.userName);
            jQuery('#user-id a').text(this.$localStorage.userName);
        };
        return LoginController;
    })();
    Controllers.LoginController = LoginController;
})(Controllers || (Controllers = {}));
var Controllers;
(function (Controllers) {
    var LogoutController = (function () {
        function LogoutController($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$localStorage = $localStorage;
        }
        LogoutController.prototype.logout = function () {
            this.callLogoutService();
        };
        LogoutController.prototype.callLogoutService = function () {
            this.$localStorage.accessToken = null;
            this.$localStorage.userName = null;
            jQuery('#login-id').show();
            jQuery('#logout-id').hide();
            jQuery('#account-id').hide();
            jQuery('#user-id').hide();
        };
        return LogoutController;
    })();
    Controllers.LogoutController = LogoutController;
})(Controllers || (Controllers = {}));
//# sourceMappingURL=out.js.map