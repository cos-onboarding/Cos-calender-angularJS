app.controller("registryCtrl",function ($rootScope,$scope,$http) {
    $rootScope.isLandingPage = false;
    console.log("3"+$rootScope.isLandingPage);
    
    $scope.isUsernamePass = true;
    $scope.isUsernameBlank = false;
    $scope.isPasswordConfirmed = true;
    $scope.isButtonDisabled = true;

    $scope.usernameCheck = function(){
        if("" !== $scope.username) {
            var param = { username: $scope.username};
            $scope.isUsernameBlank = false;
            $http.post("/camel/api/usrcheck", param).then(function (response) {
                if("success" == response.data.data) {
                    $scope.isUsernamePass = true;
                    $scope.isButtonDisabled = false;
                } else {
                    $scope.isUsernamePass = false;
                }
            }).catch(function(){
                
            });
        } else {
            $scope.isButtonDisabled = true;
            $scope.isUsernamePass = true;
            $scope.isUsernameBlank = true;
        }
    }

    $scope.newUser = function(){
        var data = { username: $scope.username, password: $scope.password};
        if($scope.password === $scope.confirmPassword) {
            $scope.isPasswordConfirmed = true;
            $http.post("/camel/api/registry", data).then(function (response) {
                console.log(response);
                $scope.hello=response.data.data;
            }).catch(function(){
                
            });
        } else {
            $scope.isPasswordConfirmed = false;
        }
        
    }
   
})