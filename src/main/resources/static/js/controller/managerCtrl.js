app.service('manager',function ($rootScope,$http,chServer) {
    $rootScope.staffList = [];
    $rootScope.isSurplus = false;
    $rootScope.countNumber = {
        maxCount:0,
        surplusNumber:0,
        number:0
    }; // 查询剩余任务量对象
    return {
        //Get the employee list
        //获取员工列表
        getStaff:function (bid) {
            var param = {bid:bid}
            $http.post("/camel/api/getStaffList" ,param ,{
            }).then(function (result) {
                $rootScope.staffList = result.data;
            }).catch(function (result) {
            });
        },
        //Click the date to get the schedule information
        // 点击日期  获取日程信息
        allEventOnes :function (date,bid,rid) {
            //Get timestamp
                // 获取时间戳
            $rootScope.timeStamp = date;
            var param = { timeStamp:date,bid:bid,rid:rid};
            console.log(rid);
            $http.post("/camel/api/getDaySchedule",param ,{
            }).then(function (result) {
                $rootScope.schedule = result.data;
                console.log($rootScope.schedule)
            }).catch(function (result) {
                console.info(result);
            });
            $('#managerModal').modal('show');
        },
        //Allocation schedule
        //分配日程
        mAddSchedule:function (date,bid) {
            $rootScope.countNumber = {
                maxCount:0,
                surplusNumber:0,
                number:0
            };
            $rootScope.singleEntity = {
                infoId:date,
                bid:bid,
                userId:0,
                id:0
            }
            $('#managerListModal').modal('show');
        },

        //查看日程
        seeOneProj1:function (index) {
            $rootScope.singleEntity = $rootScope.schedule[index];
            console.log($rootScope.singleEntity)
            $('#managerListModal').modal('show');
        },
        //Save the data
        // 保存数据
        mSaveSchedul:function () {
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
            console.log($rootScope.singleEntity)
            $http.post("/camel/api/saveCalendarSchdule",param ,{
            }).then(function (result) {

            }).catch(function (result) {
            });
            $('#managerListModal').modal('hide');
        },

        // 查看个人剩余任务量
        seePersonalNumber:function(userId,dateTime) {
            $rootScope.singleEntity.userId = userId;
            var param = {userId:userId,dateTime:dateTime}
            $http.post("/camel/api/seePersonalNumber",param,{
            }).then(function (result) {
                if(result.data[0] != undefined){
                    $rootScope.countNumber = result.data[0];
                    $rootScope.countNumber.surplusNumber = $rootScope.countNumber.maxCount - $rootScope.countNumber.number;
                    console.log($rootScope.countNumber)
                }else{
                    $rootScope.countNumber.maxCount = 0;
                    $rootScope.countNumber.surplusNumber = 0;
                    $rootScope.countNumber.number = 0;
                }
                if ($rootScope.countNumber.surplusNumber == 0){
                    $rootScope.isSurplus = false;
                }else{
                    $rootScope.isSurplus = true;
                }
            }).catch(function (result) {
            });
        },

        //Close the window
        // 关闭窗口
        mCloseSchedul:function () {
            $('#managerModal').modal('hide');
        },
        closeOneDetailsWindow:function () {
            $('#managerListModal').modal('hide');
        }


    }
});