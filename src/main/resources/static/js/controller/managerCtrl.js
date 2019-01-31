app.service('manager',function ($rootScope,$http,chServer) {
    $rootScope.staffList = [];
    return {
        //获取员工列表
        getStaff:function () {
            $http.post("/camel/api/getStaffList" ,{
            }).then(function (result) {  //正确请求成功时处理
                $rootScope.staffList = result.data;
                console.log("员工集合:"+JSON.stringify(result));
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
        },
        // 点击日期  获取日程信息
        allEventOnes :function (date, allDay, jsEvent, view,bid) {
                // 获取时间戳
                $rootScope.timeStamp = date._i;
            console.log(date._i);
            var param = { timeStamp: date._i,bid:bid};
            $http.post("/camel/api/getDaySchedule",param ,{
            }).then(function (result) {  //正确请求成功时处理
                $rootScope.schedule = result.data;
                console.log("sdada123:"+JSON.stringify(result));
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
            $('#managerModal').modal('show');
        },
        //分配日程
        mAddSchedule:function () {
            //追加单独某天的日程
            var ms = {id:0,title:'',message: '',dateTime: '',endTime:'',infoId:$rootScope.timeStamp,userId:"",type:1,}
            $rootScope.schedule.push(ms);
        },
        // 删除分配日程
        mDeleteSchedule:function (indexs) {
            if($rootScope.schedule[indexs].id != 0){
                $rootScope.scheduleDel.push($rootScope.schedule[indexs]);
            }
            $rootScope.schedule.splice(indexs,1);
        },
        // 保存数据
        mSaveSchedul:function () {
            for (var i =0;i<$rootScope.schedule.length;i++){
                var dateTime = $rootScope.schedule[i].dateTime;
                var endTime = $rootScope.schedule[i].endTime;
                var times = $rootScope.schedule[i].infoId;
                var d = chServer.dateStampDay(times);
                var c = chServer.timeStampDay(dateTime);
                var a = chServer.timeStampDay(endTime);
                $rootScope.schedule[i].dateTime = d+c;
                $rootScope.schedule[i].endTime = d+a;
                console.log(times);
            }
            var param = {
                time:$rootScope.timeStamp,
                scheduleDel:$rootScope.scheduleDel,
                schedule:$rootScope.schedule
            }
            console.log(JSON.stringify(param))
            $http.post("/camel/api/saveCalendarSchdule",param ,{
            }).then(function (result) {  //正确请求成功时处理

            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
            $rootScope.scheduleDel = [];
            $('#managerModal').modal('hide');
        },
        // 关闭窗口
        mCloseSchedul:function () {
            $rootScope.scheduleDel = [];
            $('#managerModal').modal('hide');
        }
    }
});