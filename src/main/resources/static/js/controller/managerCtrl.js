app.service('manager',function ($rootScope,$http,chServer) {
    $rootScope.staffList = [];
    return {
        //Get the employee list
        //获取员工列表
        getStaff:function () {
            $http.post("/camel/api/getStaffList" ,{
            }).then(function (result) {
                $rootScope.staffList = result.data;
            }).catch(function (result) {
            });
        },
        //Click the date to get the schedule information
        // 点击日期  获取日程信息
        allEventOnes :function (date, allDay, jsEvent, view,bid) {
            //Get timestamp
                // 获取时间戳
                $rootScope.timeStamp = date._i;
            var param = { timeStamp: date._i,bid:bid};
            $http.post("/camel/api/getDaySchedule",param ,{
            }).then(function (result) {
                $rootScope.schedule = result.data;
            }).catch(function (result) {
            });
            $('#managerModal').modal('show');
        },
        //Allocation schedule
        //分配日程
        mAddSchedule:function (bid) {
            //Append a schedule for a single day
            //追加单独某天的日程
            var ms = {id:0,title:'',message: '',dateTime: '',endTime:'',infoId:$rootScope.timeStamp,userId:"",type:1,bid:bid}
            $rootScope.schedule.push(ms);
        },
        //Delete allocation schedule
        // 删除分配日程
        mDeleteSchedule:function (indexs) {
            if($rootScope.schedule[indexs].id != 0){
                $rootScope.scheduleDel.push($rootScope.schedule[indexs]);
            }
            $rootScope.schedule.splice(indexs,1);
        },
        //Save the data
        // 保存数据
        mSaveSchedul:function () {
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
            $('#managerModal').modal('hide');
        },
        //Close the window
        // 关闭窗口
        mCloseSchedul:function () {
            $rootScope.scheduleDel = [];
            $('#managerModal').modal('hide');
        }
    }
});