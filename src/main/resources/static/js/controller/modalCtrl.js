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
        eventOnes :function (date,userId,bid,rid) {
            //Get timestamp
            // 获取时间戳
            $rootScope.timeStamp = date;
            var param = { timeStamp: $rootScope.timeStamp, userId: userId,rid:rid};
            $http.post("/camel/api/getDaySchedule",param ,{
            }).then(function (result) {
                $rootScope.schedule = result.data;
                console.log($rootScope.schedule)
            }).catch(function (result) {
                console.info(result);
            });
            $('#listModal').modal('show');
        },

        //Delete the schedule
        //删除日程
        deleteProjs:function (id,timeStamp,userId) {
            var param = {id:id,timeStamp:timeStamp,userId:userId}
            $http.post("/camel/api/deleteSchdule",param ,{
            }).then(function (result) {
            }).catch(function (result) {
            });
        },

        //Add the schedule
        // 添加日程
        addSchedules: function (date,userId,branchId) {
            $rootScope.singleEntity = {
                infoId:date,
                bid:branchId,
                userId:userId,
                id:0
            }
            $('#myModal').modal('show');
        },

        //查看日程
        seeOneProj:function (index) {
            $rootScope.singleEntity = $rootScope.schedule[index];
            console.log($rootScope.singleEntity)
            $('#myModal').modal('show');
        },

        //Save window replacement data
        // 保存窗口替换数据
        updateMss: function () {
            console.log($rootScope.singleEntity);
                var dateTime = $rootScope.singleEntity.dateTime;
                var endTime = $rootScope.singleEntity.endTime;
                var times = $rootScope.singleEntity.infoId;
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
                $rootScope.singleEntity.dateTime = d+c;
                $rootScope.singleEntity.endTime = d+a;
            var param = {
                time:$rootScope.timeStamp,
                schedule:$rootScope.singleEntity
            }
            $http.post("/camel/api/saveCalendarSchdule",param ,{
            }).then(function (result) {

            }).catch(function (result) {
            });
            $('#myModal').modal('hide');
        },


        //Close the window to delete modified data
        //关闭窗口删除修改数据
        deleteMs: function () {
            $('#listModal').modal('hide');
        },
        closeOneDetailsWindow:function () {
            $('#myModal').modal('hide');
        },
    }
});