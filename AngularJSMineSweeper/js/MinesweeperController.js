var app = angular.module("minesweeper", []);

app.controller("MinesweeperController", function ($scope) {
	
	$scope.isLogin = false;
	
    $scope.login = function () {
        if (!$scope.playerName) {
          return
        }

        $scope.isLogin = true;
    };
    
    // $scope.alive = "";
    $scope.side = 8;
    // $scope.moveCount = 0;
    // $scope.totalCount = 60;
    $scope.mineCount = 4;

    $scope.board = [];
    
    $scope.initialize = function () {
        for (var row = 0; row < $scope.side; row++) {
          $scope.board[row] = [$scope.side];
          for (var column = 0; column < $scope.side; column++) {
            $scope.board[row][column] = {
              value: 0
            };
          }
        }

        $scope.randomMineOnBoard();
      };

      $scope.randomMineOnBoard = function () {
    	  var randscreated = 0;
          while (randscreated < $scope.mineCount) {
        	  var currentrow = Math.floor(Math.random() * ($scope.side));
        	  var currentcol = Math.floor(Math.random() * ($scope.side));

        	  if ($scope.board[currentrow][currentcol].value != 1) {
        		  $scope.board[currentrow][currentcol].value = 1;
        		  randscreated++;
        		  }
        	  }
          };
        
        $scope.grid = function () {
            var grid = [];
            for (var gridSize = 0; gridSize < $scope.side; gridSize++) {
              grid.push(gridSize);
            }
            return grid;
        };
        
        $scope.changeClass = function (state) {
            if (state.value == 0 || state.value == 1)
              return 'gd gd-hidden';
            else if (state.value == 2)
              return 'gd gd-show';
            else if (state.value == 3)
              return 'grid-show-mine';
            else if (state.value == 4)
              return 'gd gd-show-missed';
          };
          
          $scope.reInitialize = function () {
              $scope.alive = "";
              $scope.moveCount = 0;
              $scope.totalCount = 60;
              $scope.mineCount = 4;
              for (var row = 0; row < $scope.side; row++) {
                for (var column = 0; column < $scope.side; column++) {
                  $scope.board[row][column].value = 0;
                }
              }

              $scope.isOver = false;
              $scope.randomMineOnBoard();
            };
            
            $scope.reveal = function (row, col) {
                if ($scope.board[row][col].value == 1) {
                  $scope.showBomb();
                } else if ($scope.board[row][col].value == 0) {
                  $scope.place(row, col);
                }
              };

              $scope.place = function (row, col) {
                if (row < 0 || row >= $scope.side) {
                  return;
                }

                if (col < 0 || col >= $scope.side) {
                  return;
                }

                if ($scope.board[row][col].value == 0) {
                  $scope.board[row][col].value = 2;
                  $scope.moveCount++;

                  if ($scope.checkSurround(row - 1, col - 1) &&
                    $scope.checkSurround(row - 1, col) &&
                    $scope.checkSurround(row - 1, col + 1) &&
                    $scope.checkSurround(row, col - 1) &&
                    $scope.checkSurround(row, col + 1) &&
                    $scope.checkSurround(row + 1, col - 1) &&
                    $scope.checkSurround(row + 1, col) &&
                    $scope.checkSurround(row + 1, col + 1)) {
                    $scope.place(row - 1, col - 1);
                    $scope.place(row - 1, col);
                    $scope.place(row - 1, col + 1);
                    $scope.place(row, col - 1);
                    $scope.place(row, col + 1);
                    $scope.place(row + 1, col - 1);
                    $scope.place(row + 1, col);
                    $scope.place(row + 1, col + 1);
                  }
                }

                if ($scope.moveCount == $scope.totalCount) {
                  $scope.showAll();
                }
              };

              $scope.showBomb = function () {
                for (var row = 0; row < $scope.side; row++) {
                  for (var column = 0; column < $scope.side; column++) {
                    if ($scope.board[row][column].value == 0) {
                      $scope.board[row][column].value = 2;
                    } else if ($scope.board[row][column].value == 1) {
                      $scope.board[row][column].value = 3;
                    }
                  }
                }

                $scope.isOver = true;
                $scope.alive = "Game Over!";
              };

              $scope.showAll = function () {
                if ($scope.alive != "") {
                  return;
                }

                var missed = false;
                for (var row = 0; row < $scope.side; row++) {
                  for (var column = 0; column < $scope.side; column++) {
                    if ($scope.board[row][column].value == 0) {
                      missed = true;
                      $scope.board[row][column].value = 4;
                    }
                  }
                }

                  $scope.isOver = true;
                  $scope.alive = "Congratuation! You've won.";
              };

              $scope.checkSurround = function (row, col) {
                if (row < 0 || row >= $scope.side) {
                  return true;
                }

                if (col < 0 || col >= $scope.side) {
                  return true;
                }

                return $scope.board[row][col].value == 0 ||
                  $scope.board[row][col].value == 2 ||
                  $scope.board[row][col].value == 4;
              };

              $scope.changeTable = function (row, col) {
                if ($scope.board[row][col].value == 0 || $scope.board[row][col].value == 1 || $scope.board[row][col].value == 3)
                  return "";

                var ret =
                  !$scope.checkSurround(row - 1, col - 1) +
                  !$scope.checkSurround(row - 1, col) +
                  !$scope.checkSurround(row - 1, col + 1) +
                  !$scope.checkSurround(row, col - 1) +
                  !$scope.checkSurround(row, col + 1) +
                  !$scope.checkSurround(row + 1, col - 1) +
                  !$scope.checkSurround(row + 1, col) +
                  !$scope.checkSurround(row + 1, col + 1);

                if (ret == 0) {
                  return "";
                }

                return ret;
              };
      
});