app.service('modalsss',function ($rootScope,$http,chServer) {
    //Click to see the process of selecting the date
    /*点击出现选择日期的历程*/
    $rootScope.schedule =[];
    //All dates calendar schedule
    /*所有日期日历日程*/
    $rootScope.scheduleAll = [];
    //Deleted collection
    //删除的集合
    $rootScope.scheduleDel = [];
    return {

        //Click the date to get the schedule information
    // 点击日期  获取日程信息
        eventOnes :function (date, allDay, jsEvent, view,userId,bid) {
            //Get timestamp
            // 获取时间戳
            $rootScope.timeStamp = date._i;
            console.log(date._i);
            var param = { timeStamp: date._i, userId: userId};
            $http.post("/camel/api/getDaySchedule",param ,{
            }).then(function (result) {
                $rootScope.schedule = result.data;
                console.log("sdada123:"+JSON.stringify(result));
            }).catch(function (result) {
                console.info(result);
            });
            $('#myModal').modal('show');
        },

        //Delete the schedule
        //删除日程
        deleteProjs:function (indexs) {
            if($rootScope.schedule[indexs].id != 0){
                $rootScope.scheduleDel.push($rootScope.schedule[indexs]);
            }
            $rootScope.schedule.splice(indexs,1);
        },

        //Add the schedule
        // 添加日程
        addSchedules: function (userId,bid) {
            //Append a schedule for a single day
            //追加单独某天的日程
            var ms = {id:0,title:'',message: '',dateTime: '',endTime:'',infoId:$rootScope.timeStamp,userId:userId,type:1,bid:bid}
            $rootScope.schedule.push(ms);
            console.log(JSON.stringify($rootScope.schedule))
        },

        //Save window replacement data
        // 保存窗口替换数据
        updateMss: function (userId) {
            // debugger;
            for (var i =0;i<$rootScope.schedule.length;i++){
                var dateTime = $rootScope.schedule[i].dateTime;
                var endTime = $rootScope.schedule[i].endTime;
                var times = $rootScope.schedule[i].infoId;
                var d = chServer.dateStampDay(times);
                var c = " ";
                var a = " ";
                if(typeof dateTime != "string"){
                    c = chServer.timeStampDay(dateTime);
                }else{
                    c =  c + dateTime;
                }
                if(typeof endTime != "string"){
                    a = chServer.timeStampDay(endTime);
                }else{
                    a =  a + endTime;
                }
                $rootScope.schedule[i].dateTime = d+c;
                $rootScope.schedule[i].endTime = d+a;
            }
            var param = {
                time:$rootScope.timeStamp,
                scheduleDel:$rootScope.scheduleDel,
                schedule:$rootScope.schedule
            }
            $http.post("/camel/api/saveCalendarSchdule",param ,{
            }).then(function (result) {
            }).catch(function (result) {
            });
            $rootScope.scheduleDel = [];
            $('#myModal').modal('hide');
        },

        //Close the window to delete modified data
        //关闭窗口删除修改数据
        deleteMSs: function () {
            $rootScope.scheduleDel = [];
            $('#myModal').modal('hide');
        },
    }
});