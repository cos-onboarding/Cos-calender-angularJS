app.service('modalsss',function ($rootScope,$http,chServer) {

    /*点击出现选择日期的历程*/
    $rootScope.schedule =[];
    /*所有日期日历日程*/
    $rootScope.scheduleAll = [];
    //删除的集合
    $rootScope.scheduleDel = [];
    return {

    // 点击日期  获取日程信息
        eventOnes :function (date, allDay, jsEvent, view,userId,bid) {
            // 获取时间戳
            $rootScope.timeStamp = date._i;
            console.log(date._i);
            var param = { timeStamp: date._i, userId: userId};
            $http.post("/camel/api/getDaySchedule",param ,{
            }).then(function (result) {  //正确请求成功时处理
                $rootScope.schedule = result.data;
                console.log("sdada123:"+JSON.stringify(result));
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
            $('#myModal').modal('show');
        },

        //删除日程
        deleteProjs:function (indexs) {
            if($rootScope.schedule[indexs].id != 0){
                $rootScope.scheduleDel.push($rootScope.schedule[indexs]);
            }
            $rootScope.schedule.splice(indexs,1);
        },

        // 添加日程
        addSchedules: function (userId,bid) {
            //追加单独某天的日程
            var ms = {id:0,title:'',message: '',dateTime: '',endTime:'',infoId:$rootScope.timeStamp,userId:userId,type:1,bid:bid}
            $rootScope.schedule.push(ms);
            console.log(JSON.stringify($rootScope.schedule))
        },

        // 保存窗口替换数据
        updateMss: function (userId) {
            for (var i =0;i<$rootScope.schedule.length;i++){
                var dateTime = $rootScope.schedule[i].dateTime;
                var endTime = $rootScope.schedule[i].endTime;
                var times = $rootScope.schedule[i].infoId;
                var d = chServer.dateStampDay(times);
                var c = chServer.timeStampDay(dateTime);
                var a = chServer.timeStampDay(endTime);
                $rootScope.schedule[i].dateTime = d+c;
                console.log("开始："+$rootScope.schedule[i].dateTime)
                $rootScope.schedule[i].endTime = d+a;
                console.log("结束："+$rootScope.schedule[i].endTime)
            }
            var param = {
                time:$rootScope.timeStamp,
                scheduleDel:$rootScope.scheduleDel,
                schedule:$rootScope.schedule
            }
            console.log("sadasd:" + JSON.stringify(param))
            $http.post("/camel/api/saveCalendarSchdule",param ,{
            }).then(function (result) {  //正确请求成功时处理

            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
            $rootScope.scheduleDel = [];
            $('#myModal').modal('hide');
        },

        //关闭窗口删除修改数据
        deleteMSs: function () {
            $rootScope.scheduleDel = [];
            $('#myModal').modal('hide');
        },
    }
});