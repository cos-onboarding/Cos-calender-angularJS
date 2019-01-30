app.controller("overviewCtrl",function ($rootScope,$scope,$http) {
    $rootScope.isLandingPage = false;

    $scope.applications = function(){
            var param = {username:window.sessionStorage.getItem("username")};
            $http.post("/camel/api/apps", param).then(function (response) {
                $scope.records = {};
                $scope.records = response.data.data[0];
                    
            }).catch(function(){
                
            });
    }
   
})