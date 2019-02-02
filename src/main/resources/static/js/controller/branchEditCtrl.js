app.service('branchEditTemplate',function ($rootScope,$http) {
    $rootScope.branchList = [];
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
        //分配日程
        branchEditAdd: function () {
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
        //删除分配日程
        branchEditDelRow: function (indexs) {
            /*if ($rootScope.schedule[indexs].id != 0) {
                $rootScope.scheduleDel.push($rootScope.schedule[indexs]);
            }*/
            $rootScope.schedule.splice(indexs, 1);
        },

        //关闭Template
        closeBranchEditTemplate:function () {
            $('#branchEditModalLabel').modal('hide');
            $rootScope.schedule = [];
        },

        saveBranchTaskInfo:function() {
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
            if($rootScope.schedule[indexs].id != 0) {
                $rootScope.scheduleDel.push($rootScope.schedule[indexs]);
            }
            $rootScope.schedule.splice(indexs,1);
        },
        //点击add Item button 弹窗
        branchEidtAddTemplate: function () {
            $('#branchEditModalLabel').modal('show');
        },
    }
});