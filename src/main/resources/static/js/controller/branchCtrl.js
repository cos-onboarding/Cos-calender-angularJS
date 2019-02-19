app.service('branchTemplate',function ($rootScope,$http) {
    $rootScope.branchList = [];
    $rootScope.branchStaffList = [];
    $rootScope.isShow = false;

    return {
        //获取分行及经理名称
        getBranch: function () {
            $http.post("/camel/api/getAllBranch", {}).then(function (result) {  //正确请求成功时处理
                $rootScope.branchList = result.data;
                console.log("员工集合:" + JSON.stringify(result));
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
        },
        // 点击日期  获取日程信息
        branchEventOne: function (date,bid,rid) {
            if($rootScope.isShow==true){
                $rootScope.isShow = !$rootScope.isShow;
            }
            var param = {timeStamp: date,rid:rid};
            $http.post("/camel/api/getDaySchedule", param, {}).then(function (result) {  //正确请求成功时处理
                if (result.data.length != 0) {
                    $rootScope.schedule = result.data;
                    console.log(JSON.stringify($rootScope.schedule));
                }
            }).catch(function (result) { //捕捉错误处理
            });
            $('#branchModalLabel').modal('show');
        },
      /*  //分配日程
        branchAdd: function () {
            //追加单独某天的日程
            var ms = {
                id: 0,
                title: '',
                message: '',
                dateTime: '',
                endTime: '',
                infoId: $rootScope.timeStamp,
                rowId: "",
                type: 1
            }
            $rootScope.schedule.push(ms);
        },
*/
        //关闭Template
        closeBranchTemplate: function () {
            $('#branchModalLabel').modal('hide');
            $rootScope.schedule = [];
        },
        saveBranchTaskInfo: function () {
            for (var i = 0; i < $rootScope.schedule.length; i++) {
                var startTime = new Date($rootScope.schedule[i].dateTime).toISOString().slice(0,10);
                var endTime = new Date($rootScope.schedule[i].endTime).toISOString().slice(0,10);
                var times = Date.parse(new Date());
                $rootScope.schedule[i].startTime = startTime;
                $rootScope.schedule[i].endTime = endTime;
                $rootScope.schedule[i].infoId = times;
                console.log(times);
            }
            var newSchedule = $rootScope.schedule;
            var param = {
                newSchedule: newSchedule
            }
            console.log(JSON.stringify(param))
            $http.post("/camel/api/saveBranchCalendar", param, {}).then(function (result) {  //正确请求成功时处理
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
            $rootScope.scheduleDel = [];
            $('#managerModal').modal('hide');
            $rootScope.isShow = !$rootScope.isShow;
        },
        deleteTemplateRowInfo: function (indexs) {
            console.log()
            if ($rootScope.branchStaffList[indexs].id != 0) {
                $rootScope.scheduleDel.push($rootScope.branchStaffList[indexs]);
            }
            $rootScope.branchStaffList.splice(indexs, 1);
            if($rootScope.branchStaffList.length==0){
                $rootScope.isShow = !$rootScope.isShow;
            }
        },
        //Get all the tasks for the branch today
        getBranchScheduleInfo: function (indexs, date) {
            var params = {id: $rootScope.schedule[indexs].id, time: date};
            $http.post("/camel/api/dayBranchStaffInfo", params, {}).then(function (result){
                $rootScope.branchStaffList = result.data;
                for(var i = 0; i < $rootScope.branchStaffList.length; i++){
                    $rootScope.branchStaffList[i].endTime =
                        $rootScope.branchStaffList[i].endTime != null ? $rootScope.branchStaffList[i].endTime.replace("T", " ") : "";
                    $rootScope.branchStaffList[i].startTime = $rootScope.branchStaffList[i].startTime.replace("T", " ");
                    if($rootScope.branchStaffList[i].userName == "Branch untreated") {
                        $rootScope["colorValue" + i] = {
                            "color": "red",
                            "borderColor":"red"
                        }
                    }
                    }
                console.log(JSON.stringify($rootScope.branchStaffList));
                $rootScope.isShow = !$rootScope.isShow;
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
        }
    }
});