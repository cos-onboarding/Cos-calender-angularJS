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
            if(indexs>=0) {
                $rootScope.schedule.splice(indexs, 1);
            }
        },

        //关闭Template
        closeBranchEditTemplate:function () {
            $('#branchEditModalLabel').modal('hide');
            $rootScope.schedule = [];
        },

        saveBranchTaskInfo:function() {
                for (var i = 0; i < $rootScope.schedule.length; i++) {
                    var startTime = new Date($rootScope.schedule[i].startTime._d).toISOString().slice(0,10);
                    var endTime = new Date($rootScope.schedule[i].endTime._d).toISOString().slice(0,10);
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
                window.location.reload();

            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
            $rootScope.scheduleDel = [];
            $('#managerModal').modal('hide');
        },
        deleteTemplateRowInfo: function (indexs) {
            console.log()
            if($rootScope.schedule[indexs] != '') {
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