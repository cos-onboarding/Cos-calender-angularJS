app.service('editBranchInfoTemplate',function ($rootScope,$http) {
    $rootScope.branchInfoList = [];
    $rootScope.updateInfoList = [];
    $rootScope.delInfoList = [];
    $rootScope.addInfoList = [];
    $rootScope.addInfo = []
    return {
        editBranchInfoModalLabel: function(){
            $('#editBranchInfoModalLabel').modal('show');
        },

        closeEditBranchInfoTemplate: function () {
            $('#editBranchInfoModalLabel').modal('hide');
        },

        editRowBranchInfo: function (index) {
            if($rootScope["isDisabled" + $rootScope.branchInfoList[index].branchId]){
                $rootScope["isDisabled" + $rootScope.branchInfoList[index].branchId] = false;
            }else{
                $rootScope["isDisabled" + $rootScope.branchInfoList[index].branchId] = true;
            }
                console.log($rootScope["isDisabled" + $rootScope.branchInfoList[index].branchId]);
        },
        saveEditRowBranchInfo: function (index) {
            if(index >= 0){
                if($rootScope.updateInfoList!=''){
                    for(var i=0; i < $rootScope.updateInfoList.length; i++){
                        if($rootScope.updateInfoList[i].branchId == $rootScope.branchInfoList[index].branchId){
                            $rootScope.updateInfoList.splice(i,1);
                        }
                    }
                }
                    $rootScope.updateInfoList.push($rootScope.branchInfoList[index]);
                    $rootScope["isDisabled" + $rootScope.branchInfoList[index].branchId] = true;
                    $rootScope.isAllDisabled = false;
            }
        },
        //2019.02.17 Zach
        //Get all branch information
        getBranchInfoList: function () {
            $rootScope.isAllDisabled = true;
            $http.post("/camel/api/getBranchInfo", {}).then(function (result) {  //正确请求成功时处理
                $rootScope.branchInfoList = result.data;
                for(var i = 0; i < $rootScope.branchInfoList.length; i++){
                    $rootScope.branchInfoList[i].creatTime = $rootScope.branchInfoList[i].creatTime.replace("T", " ");
                     $rootScope["isDisabled"+$rootScope.branchInfoList[i].branchId] = true;
                    console.log($rootScope["isDisabled"+$rootScope.branchInfoList[i].branchId]);
                }

                console.log("员工集合:" + JSON.stringify(result));
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
        },

        //保存
        saveBranchInfo: function () {
            debugger;
            var param = {
                branchAddInfo: $rootScope.addInfoList,
                branchUpdateInfo: $rootScope.updateInfoList,
                branchDelInfo: $rootScope.delInfoList
            }
            console.log(JSON.stringify(param))
            if(JSON.stringify($rootScope.addInfoList) != '[]' || JSON.stringify($rootScope.updateInfoList) != '[]'){
                $http.post("/camel/api/editBranchInfo", param, {}).then(function (result) {  //正确请求成功时处理
                    $rootScope.addInfoList = [];
                }).catch(function (result) { //捕捉错误处理
                    console.info(result);
                });
            }else if(JSON.stringify($rootScope.delInfoList) != '[]'){
                $http.post("/camel/api/delBranchInfo", param, {}).then(function (result) {  //正确请求成功时处理
                    $rootScope.delInfoList = [];
                }).catch(function (result) { //捕捉错误处理
                    console.info(result);
                });
            }
            $('#editBranchInfoModalLabel').modal('hide');
        },
        deleteRowBranchInfo: function (index) {
            alert("Are you sure you want to delete the " + $rootScope.branchInfoList[index].branchName + " information?");
            if ($rootScope.branchInfoList[index].id != 0) {
                $rootScope.delInfoList.push($rootScope.branchInfoList[index]);
            }
            // $rootScope.branchInfoList.splice(index,1);
            delete $rootScope.branchInfoList[index]
            $rootScope.isAllDisabled = false;
        },
        //Get all the tasks for the branch today
        getBranchScheduleInfo: function (indexs, date) {
            var params = {id: $rootScope.schedule[indexs].id, time: date};
            $http.post("/camel/api/dayBranchStaffInfo", params, {}).then(function (result){
                $rootScope.branchStaffList = result.data;
                for(var i = 0; i < $rootScope.branchStaffList.length; i++){
                    $rootScope.branchStaffList[i].endTime = $rootScope.branchStaffList[i].endTime.replace("T", " ");
                    $rootScope.branchStaffList[i].startTime = $rootScope.branchStaffList[i].startTime.replace("T", " ");
                }
                console.log(JSON.stringify($rootScope.branchStaffList));
                $rootScope.isShow = !$rootScope.isShow;
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
        },
        openMyBranchModel: function () {
            $('#myBranchModel').modal('show');
        },
        //关闭Template
        closeEditBranchInfoModalLabel: function () {
            $('#myBranchModel').modal('hide');
        },

        saveAddBranchInfo: function () {
            $rootScope.addInfo.creatTime = '';
            $rootScope.addInfo.branchLevel = 0;
            $rootScope.branchInfoList.unshift($rootScope.addInfo);
            $rootScope.addInfo = [];
            $rootScope.addInfoList.push($rootScope.addInfo);
            $('#myBranchModel').modal('hide');
            $rootScope.isAllDisabled = false;
        },
    }
});