// (function () {
//     'use strict';

//     angular
//         .module('minesweeper')
//         .config(routerConfig);

//     /** @ngInject */
//     function routerConfig($routeProvider) {
//         $routeProvider
//             .when('/', {
//                 controller: "MinesweeperLoginController",
//                 templateUrl: "html/login.html"
//             })
//             .when('/game', {
//                 controller: 'MinesweeperGameController',
//                 templateUrl: 'html/game.html'
//             })
//             .otherwise({
//                 redirectTo: '/'
//             });
//     }

// })();