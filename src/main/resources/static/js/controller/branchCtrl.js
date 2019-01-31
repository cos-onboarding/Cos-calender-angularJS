app.service('branchTemplate',function ($rootScope,$http) {
    $rootScope.branchList = [];
    $rootScope.branchStaffList = [];
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
        branchEventOne: function (date, allDay, jsEvent, view) {

            var param = {time: date._i};
            $http.post("/camel/api/getAllBranchSchedule", param, {}).then(function (result) {  //正确请求成功时处理
                if (result.data.length != 0) {
                    $rootScope.schedule = result.data;
                    console.log(JSON.stringify($rootScope.schedule));
                }
            }).catch(function (result) { //捕捉错误处理
            });
            $('#branchModalLabel').modal('show');
        },
        //分配日程
        branchAdd: function () {
            //追加单独某天的日程
            var ms = {
                id: 0,
                title: '',
                message: '',
                dateTime: '',
                endTime: '',
                infoId: $rootScope.timeStamp,
                userId: "",
                type: 1
            }
            $rootScope.schedule.push(ms);
        },
        // 删除分配日程
        // mDeleteSchedule:function (indexs) {
        //     if($rootScope.schedule[indexs].id != 0){
        //         $rootScope.scheduleDel.push($rootScope.schedule[indexs]);
        //     }
        //     $rootScope.schedule.splice(indexs,1);
        // },
        //关闭Template
        closeBranchTemplate: function () {
            $('#branchModalLabel').modal('hide');
        },
        saveBranchTaskInfo: function () {
            for (var i = 0; i < $rootScope.schedule.length; i++) {
                var dateTime = $rootScope.schedule[i].dateTime;
                var endTime = $rootScope.schedule[i].endTime;
                var times = $rootScope.schedule[i].infoId;
                var d = chServer.dateStampDay(times);
                var c = chServer.timeStampDay(dateTime);
                var a = chServer.timeStampDay(endTime);
                $rootScope.schedule[i].dateTime = d + c;
                $rootScope.schedule[i].endTime = d + a;
                console.log(times);
            }
            var param = {
                time: $rootScope.timeStamp,
                scheduleDel: $rootScope.scheduleDel,
                schedule: $rootScope.schedule
            }
            console.log(JSON.stringify(param))
            $http.post("/camel/api/saveCalendarSchdule", param, {}).then(function (result) {  //正确请求成功时处理

            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
            $rootScope.scheduleDel = [];
            $('#managerModal').modal('hide');
        },
        deleteTemplateRowInfo: function (indexs) {
            console.log()
            if ($rootScope.schedule[indexs].id != 0) {
                $rootScope.scheduleDel.push($rootScope.schedule[indexs]);
            }
            $rootScope.schedule.splice(indexs, 1);
        },
        getBranchScheduleInfo: function (indexs, date) {

            var params = {name: $rootScope.schedule[indexs].name, time: date._i};
            $http.post("/camel/api/dayBranchStaffInfo", params, {}).then(function (result){
                $rootScope.branchStaffList = result.data;
                console.log(JSON.stringify($rootScope.schedule));
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
            $('#branchModalLabel').modal('show');
        }
    }
});