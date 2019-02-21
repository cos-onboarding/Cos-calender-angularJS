app.service('branchEditTemplate',function ($rootScope,$http) {
    $rootScope.branchList = [];
    var indexReport;
    $rootScope.newSchedule = [];
    return {
        getBranch: function (dayNum) {
            var num = dayNum != undefined && dayNum > 0 ? dayNum : 1;
            var params = {
                dayNum: num
            }

            var dayTime = new Date(new Date().getTime()).toLocaleDateString();
            var isdate = new Date(dayTime.replace(/-/g,"/"));
            var newdate = new Date((isdate/1000+(86400*num))*1000);
            $rootScope.toDay = newdate.getFullYear()+"-"+(newdate.getMonth()+1)+"-"+(newdate.getDate());
            $rootScope.nowDay = isdate;

            $http.post("/camel/api/getAllBranch", params, {}).then(function (result) {  //正确请求成功时处理
                $rootScope.branchList = result.data;
                console.log("AllBranch:" + JSON.stringify($rootScope.branchList));
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
        },

        //Commit the save task and delete the current display
        branchEditDelRow: function (indexs) {
                if(indexs>=0) {
                    $rootScope.schedule[indexs].startTime = new Date($rootScope.schedule[indexs].startTime._d).toISOString().slice(0, 10) + " 08:00:00";
                    $rootScope.schedule[indexs].branchId = $rootScope.schedule[indexs].rowId;
                    $rootScope.schedule[indexs].infoId = new Date($rootScope.schedule[indexs].startTime).getTime();
                    $rootScope.newSchedule.push($rootScope.schedule[indexs]);
                    $rootScope.schedule.splice(indexs, 1);
                }
        },

        //关闭Template
        closeBranchEditTemplate : function () {
            $('#branchEditModalLabel').modal('hide');
            $rootScope.newSchedule = [];
            $rootScope.dayNum = undefined;
        },

        saveBranchTaskInfo : function() {
                var param = {
                    newSchedule: $rootScope.newSchedule
                }
            console.log(JSON.stringify(param))
            $http.post("/camel/api/saveBranchCalendar", param, {}).then(function (result) {  //正确请求成功时处理
                window.location.reload();
                $('#branchEditModalLabel').modal('hide');
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
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
            $http.post("/camel/api/getDistributeTaskList", {}).then(function (result) {  //正确请求成功时处理
                debugger;
                if (result.data.length != 0) {
                    $rootScope.schedule = result.data;
                    console.log(JSON.stringify($rootScope.schedule));
                }
            }).catch(function (result) { //捕捉错误处理
            });
            $('#branchEditModalLabel').modal('show');
        },

        editPitchOnButton: function (BranchId,index) {
            debugger;
            if(BranchId != ''){
                if(indexReport != index && indexReport != undefined){
                    $rootScope.branchList[indexReport].scheduledNum++;
                }
                for(var i=0; i < $rootScope.branchList.length; i++){
                    if(BranchId == $rootScope.branchList[i].branchId) {
                        if($rootScope.branchList[i].scheduledNum>0){
                            $rootScope.branchList[i].scheduledNum--;
                            indexReport = i;
                            break;
                        }else{
                            alert("The biggest limit");
                        }
                    }
                }
            }
        },
    }
});