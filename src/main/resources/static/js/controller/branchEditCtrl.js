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
                dateTime:"",
                userId: "",
                type: 1
            }
            $rootScope.schedule.push(ms);
        },
        //Commit the save task and delete the current display
        branchEditDelRow: function (indexs) {
            debugger;
            var param = {
                body: $rootScope.schedule[indexs].body,
                endTime: $rootScope.schedule[indexs].endTime,
                itemId: $rootScope.schedule[indexs].itemId,
                phone: $rootScope.schedule[indexs].phone,
                startTime: new Date($rootScope.schedule[indexs].startTime._d).toISOString().slice(0,10),
                title: $rootScope.schedule[indexs].title
            };
            $http.post("/camel/api/updateDistributeTask", param, {}).then(function (result) {  //正确请求成功时处理
                if(indexs>=0) {
                    $rootScope.schedule.splice(indexs, 1);
                }
            }).catch(function (result) { //捕捉错误处理
            });
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
                    $rootScope.schedule[i].infoId = new Date(new Date().toLocaleDateString()).getTime() + 8 * 60 * 60 * 1000;
                    $rootScope.schedule[i].dateTime = new Date(times).toLocaleDateString().replace(/\//g, "-") + " " + new Date(times).toTimeString().substr(0, 8);
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
       /* //点击add Item button 弹窗
        branchEidtAddTemplate: function () {

            $('#branchEditModalLabel').modal('show');
        },*/
        //点击add Item button 弹窗
        branchEidtAddTemplate: function () {
            $http.post("/camel/api/getDistributeTaskList", {}).then(function (result) {  //正确请求成功时处理
                if (result.data.length != 0) {
                    $rootScope.schedule = result.data;
                    console.log(JSON.stringify($rootScope.schedule));
                }
            }).catch(function (result) { //捕捉错误处理
            });
            $('#branchEditModalLabel').modal('show');
        },
    }
});