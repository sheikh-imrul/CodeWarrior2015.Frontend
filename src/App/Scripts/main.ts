/// <reference path="reference.ts" />

angular.module('codeWarriorApp', ['codeWarriorApp.controllers', 'codeWarriorApp.services', 'ngRoute', 'ngStorage'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
            when('/home', { templateUrl: 'App/Templates/home.html', controller: 'HomeController' }).
            when('/login', { templateUrl: 'App/Templates/login.html', controller: 'LoginController' }).
            when('/account', { templateUrl: 'App/Templates/account.html', controller: 'AccountController' }).
            when('/buyer', { templateUrl: 'App/Templates/buyerProfile.html', controller: 'BuyerProfileController' }).
            when('/seller', { templateUrl: 'App/Templates/sellerProfile.html', controller: 'SellerProfileController' }).
            when('/addProduct', { templateUrl: 'App/Templates/addProduct.html', controller: 'SellerProfileController' }).
            when('/productDetails/:id', { templateUrl: 'App/Templates/productDetails.html', controller: 'ProductDetailsController' }).
            when('/wishlist', { templateUrl: 'App/Templates/wishlist.html', controller: 'WishlistController' }).
            otherwise({ redirectTo: '/home' });
        //$locationProvider.html5Mode(true);
    }]);
