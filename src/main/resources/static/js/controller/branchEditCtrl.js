app.service('branchEditTemplate',function ($rootScope,$http) {
    $rootScope.branchList = [];
    var indexReport;
    $rootScope.newSchedule = [];
    return {
        //获取分行及经理名称
        getBranch: function () {
            $http.post("/camel/api/getAllBranch", {}).then(function (result) {  //正确请求成功时处理
                $rootScope.branchList = result.data;
                console.log("AllBranch:" + JSON.stringify($rootScope.branchList));
            }).catch(function (result) { //捕捉错误处理
                console.info(result);
            });
        },
        //Commit the save task and delete the current display
        branchEditDelRow: function (indexs) {
                if(indexs>=0) {
                    $rootScope.schedule[indexs].startTime = new Date($rootScope.schedule[indexs].startTime._d).toISOString().slice(0, 10) + " 00:00:00";
                    $rootScope.schedule[indexs].branchId = $rootScope.schedule[indexs].rowId;
                    $rootScope.newSchedule.push($rootScope.schedule[indexs]);
                    $rootScope.schedule.splice(indexs, 1);
                }

        },

        //关闭Template
        closeBranchEditTemplate : function () {
            $('#branchEditModalLabel').modal('hide');
            $rootScope.newSchedule = [];
        },

        saveBranchTaskInfo : function() {
            debugger;
                /*for (var i = 0; i < $rootScope.schedule.length; i++) {
                    if($rootScope.schedule[i].itemId!='') {
                        var startTime = new Date($rootScope.schedule[i].startTime._d).toISOString().slice(0, 10) + " 00:00:00";
                        $rootScope.schedule[i].startTime = startTime;
                        $rootScope.newSchedule.push($rootScope.schedule);
                    }
                }*/
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
       /* //点击add Item button 弹窗
        branchEidtAddTemplate: function () {

            $('#branchEditModalLabel').modal('show');
        },*/
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
        
        /*editPitchOnButton: function (rowId) {
            for(var i=0; $rootScope.branchList.length > i; i++){
                if(rowId == $rootScope.branchList[i].id){
                    var index = i;
                }
            }
            console.log();
            var reportNum;
            if (rowId!='') {
                switch (rowId) {
                    case 1:
                        if($rootScope.branchReportList[0].CentralBranch>0) {
                        $rootScope.branchReportList[0].CentralBranch--;
                        break;
                        }else{
                            $rootScope.branchList[0].splice(index,1);
                        }
                    case 2:
                        if($rootScope.branchReportList[0].NathanRoadBranch>0) {
                            $rootScope.branchReportList[0].NathanRoadBranch--;
                            break;
                        }else{
                            $rootScope.branchList[0].splice(index,1);
                        }
                    case 3:
                        if($rootScope.branchReportList[0].TsimShaTsuiBranch>0) {
                            $rootScope.branchReportList[0].TsimShaTsuiBranch--;
                            break;
                        }else{
                            $rootScope.branchList[0].splice(index,1);
                        }
                    case 4:
                        if($rootScope.branchReportList[0].ShatinBranch>0) {
                            $rootScope.branchReportList[0].ShatinBranch--;
                            break;
                        }else{
                            $rootScope.branchList[0].splice(index,1);
                        }
                    case 5:
                        if($rootScope.branchReportList[0].Sheungwanbranch>0) {
                            $rootScope.branchReportList[0].Sheungwanbranch--;
                            break;
                        }else{
                            $rootScope.branchList[0].splice(index,1);
                        }
                }
            }
            oldRowId = rowId;
        },*/
    }
});