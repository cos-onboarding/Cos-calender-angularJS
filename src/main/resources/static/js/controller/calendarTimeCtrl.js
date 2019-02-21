app.controller("calendarTimeCtrl",function ($scope,$rootScope,$http,$compile,$modal,$timeout,$stateParams,modalsss,manager,branchTemplate,chServer,branchEditTemplate,editBranchInfoTemplate) {
    $rootScope.isLandingPage = false;
    $rootScope.isJudge = false;
    $rootScope.dayCount = {};
    $scope.selectIds=[];
    $rootScope.sites = [
        {site : "Completed", val : 0},
        {site : "uncompleted", val : 1},
        {site : "Fail", val : 2}
    ];
    /* Page calendar title*/
    $scope.events = [];
    $scope.userId = $stateParams.id; // 员工ID The employee ID
    $scope.branchId = $stateParams.branchId; // 分行ID  The branch ID
    /**
     * calendarDemoApp - 0.9.0
     */

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $rootScope.timeStamp = ''; // 获取每个组唯一时间戳    Gets a unique timestamp for each group
    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event',           // an option!
        currentTimezone: 'America/Chicago' // an option!
    };

    //Access permissions
    //获取权限
    $scope.jurisdiction = function () {
        var param = {userId: $scope.userId};
        $http.post("/camel/api/getGrade",param,{
        }).then(function (result) {  //
            $rootScope.rid = result.data.grade; // 权限ID  Authorization ID
            // $rootScope.bid = result.data.bid; // 分行ID  The branch ID
            if($rootScope.rid == 2){ // 领导   leadership
                managerLoads($scope.branchId,$rootScope.rid);
                $scope.uiConfig.calendar.eventStartEditable = false;
            }else if ($rootScope.rid == 3){ // 总行   The headquarters of
                headOfficeView($rootScope.rid);
                $scope.uiConfig.calendar.eventStartEditable = false;
            }else{ //员工  employees
                staffLoads($scope.userId,$rootScope.rid);
                $scope.uiConfig.calendar.eventStartEditable = true;
            }

        }).catch(function (result) { //捕捉错误处理
        });
    }

    // jurisdiction();
    //Load the employee's own schedule
    //加载员工自己日程
    function staffLoads(userId,rid) {
        var param = {userId: userId,rid:rid};
        $http.post("/camel/api/getCalenderTitle",param,{
        }).then(function (result) {
            angular.copy(result.data, $scope.events)
            for (var i =0;i<$scope.events.length;i++){
                if($scope.events[i].type == 0){
                    $scope.events[i].color = "green"
                }else if ($scope.events[i].type == 1){
                    $scope.events[i].color = "yellow"
                }else{
                    $scope.events[i].color = "red"
                }
            }
        }).catch(function (result) {
        });
    };

    //Load all employee data
    //加载所有员工数据
    function managerLoads(bid,rid) {
        var param = {bid: bid,rid:rid};
        $http.post("/camel/api/getCalenderTitle",param,{
        }).then(function (result) {
            angular.copy(result.data, $scope.events)
            for (var i =0;i<$scope.events.length;i++){
                if($scope.events[i].type == 0){
                    $scope.events[i].color = "green"
                }else if ($scope.events[i].type == 1){
                    $scope.events[i].color = "yellow"
                }else{
                    $scope.events[i].color = "red"
                }
            }
        }).catch(function (result) {
        });
    };

    function headOfficeView(rid) {
        var param = {rid:rid}
        $http.post("/camel/api/getCalenderTitle",param,{
        }).then(function (result){
            angular.copy(result.data, $scope.events)
            console.log(result.data);
        }).catch(function (result){

        });
    };

    //Click on the date
    // 点击日期
    $scope.eventOne = function (date, allDay, jsEvent, view) {
        $rootScope._date = date._i;
        console.log(date._i)
        if($rootScope.rid == 2){
            everyDayCount($scope.userId,date._i,$rootScope.rid);
            manager.allEventOnes(date._i, $scope.branchId,$rootScope.rid);
            manager.getStaff($scope.branchId); // 查询员工   Query staff
        }else if ($rootScope.rid == 3){
            branchTemplate.branchEventOne(date._i,$scope.branchId,$rootScope.rid);
        }else{
            everyDayCount($scope.userId,date._i,$rootScope.rid)
            modalsss.eventOnes(date._i,$scope.userId,$scope.branchId,$rootScope.rid);
        }
    };
    // 点击查找每日上报的任务量 人员ID  时间戳    人员类型
    function everyDayCount (userId,timeStamp,type) {
        var param = {userId:userId,timeStamp:timeStamp,type:type}
        $http.post("/camel/api/everyDayCount",param,{
        }).then(function (result) {
            console.log(result.data[0]);
            if(result.data[0] == undefined){
                $rootScope.dayCount = {
                    id:0,
                    maxCount:0
                }
            }else{
                $rootScope.isJudge = true;
                $rootScope.dayCount = result.data[0];
            }
        }).catch(function (result) {
        });
    }

    // 查看员工剩余数量
    $scope.seeNumber = function (userId) {
        manager.seePersonalNumber(userId,$rootScope._date)
    }

    //Delete the schedule
    // 删除日程
    $scope.deleteProj = function (indexs,id) {
        if($rootScope.rid == 2){
            var userId = $rootScope.schedule[indexs].userId;
            modalsss.deleteProjs(id,$rootScope._date,userId);
            $timeout(function() {
                manager.allEventOnes($rootScope._date,$scope.branchId,$rootScope.rid);
            }, 1000);
        }else if ($rootScope.rid == 3){
            branchTemplate.deleteTemplateRowInfo(indexs);
        }else{
            modalsss.deleteProjs(id,$rootScope._date,$scope.userId);
            $timeout(function() {
                modalsss.eventOnes($rootScope._date,$scope.userId,$scope.branchId,$rootScope.rid);
            }, 1000);
        }
    }

    //查看单个日程
    $scope.updateProj = function (index) {
        if($rootScope.rid == 2){
            manager.seeOneProj1(index);
            var userId =$rootScope.schedule[index].userId;
            var infoId =$rootScope.schedule[index].infoId;
            manager.seePersonalNumber(userId,infoId);
        }else if ($rootScope.rid == 3){
        }else{
            modalsss.seeOneProj(index);
        }
    }

    //Add the schedule
    // 添加日程
    $scope.addSchedule = function (type) {
        if($rootScope.rid == 2){
            manager.mAddSchedule($rootScope._date,$scope.branchId);
        }else if ($rootScope.rid == 3){
            branchTemplate.branchAdd($scope.branchId);
        }else{
            modalsss.addSchedules($rootScope._date,$scope.userId,$scope.branchId);
        }
    };

    // 保存任务量
    $scope.saveCount = function (id,type) {
        if(id == 0){
            $rootScope.dayCount.everyDay = $rootScope.timeStamp;
            $rootScope.dayCount.type = type;
            $rootScope.dayCount.userId = $scope.userId;
        }
        $http.post("/camel/api/saveTaskQuantity",$rootScope.dayCount,{
        }).then(function (result) {
            everyDayCount($scope.userId,$rootScope.timeStamp,type)
            $rootScope.isJudge = true;
        }).catch(function (result) {
        });
    }

    // 编辑任务量
    $scope.updateCount = function () {
        $rootScope.isJudge = false;
    }

    //Save window replacement data
    // 保存窗口替换数据
    $scope.saveTemplate = function () {
        if($rootScope.rid == 2){
            manager.mSaveSchedul();
            $timeout(function() {
                manager.allEventOnes($rootScope._date,$scope.branchId,$rootScope.rid);
            }, 1500);
        }else if ($rootScope.rid == 3){
            branchEditTemplate.saveBranchTaskInfo();
        }else{
            modalsss.updateMss();
            $timeout(function() {
                modalsss.eventOnes($rootScope._date,$scope.userId,$scope.branchId,$rootScope.rid);
            }, 1000);
        }
    };
    //Drag and drop functionality
    // 拖拽功能
    $scope.endDragStip = function (event, delta, revertFunc, jsEvent, ui, view) {
        var timeStamp = chServer.dateTimeChuo(event.info_id,delta._days);
        var allToDay = chServer.dateAddDays(event.start,delta._days);
        var eventId = event.id;
        var param = {dateTime:timeStamp,userId:$scope.userId}
        $http.post("/camel/api/seePersonalNumber",param).then(function(res){
            // 把数据存到server中并返回
            if (res.data[0] != undefined && res.data[0] != null ){
                saveHaul(eventId,timeStamp,allToDay);
            }else {
                revertFunc();
            }
        })
    };

    function saveHaul(id,timeStamp,allToDay) {
        var param = {id:id,timeStamp:timeStamp,timeDay:allToDay};
        $http.post("/camel/api/dragAndDrop",param,{
        }).then(function (result) {
        }).catch(function (result) {
        });
    }

    //Get all the tasks for the branch today
    $scope.branchScheduleInfo = function (indexsst) {
        branchTemplate.getBranchScheduleInfo(indexsst,$rootScope._date);
    };

    //Close the window to delete modified data
    //关闭窗口删除修改数据
    $scope.closeTemplate = function () {
        if($rootScope.rid == 2){
            manager.mCloseSchedul();
            window.location.reload();
        }else if ($rootScope.rid == 3){
            editBranchInfoTemplate.closeEditBranchInfoTemplate();
        }else{
            modalsss.deleteMs();
            window.location.reload();
        }
    };

    // 关闭详情窗口
    $scope.closeDetailsWindowAll = function () {
        if($rootScope.rid == 2){
            manager.closeOneDetailsWindow();
        }else if ($rootScope.rid == 3){
            branchTemplate.closeBranchTemplate();
        }else{
            modalsss.closeOneDetailsWindow();
        }
    };

    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
        if(new Date(end).getMonth() == 0){
            $rootScope.adadad = (new Date(end).getFullYear()-1) + " -"+ 12;
            console.log((new Date(end).getFullYear()-1) + " -"+ 12)
        }else{
            $rootScope.adadad = (new Date(end).getFullYear()) + " -"+(new Date(end).getMonth());
            console.log((new Date(end).getFullYear()) + " -"+(new Date(end).getMonth()))
        }
        $scope.jurisdiction();
        // var s = new Date(start).getTime() / 1000;
        // var e = new Date(end).getTime() / 1000;
        // var m = new Date(start).getMonth();
        // var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        callback($scope.events)
    };

    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
        var canAdd = 0;
        angular.forEach(sources,function(value, key){
            if(sources[key] === source){
                sources.splice(key,1);
                canAdd = 1;
            }
        });
        if(canAdd === 0){
            sources.push(source);
        }
    };
    /* add custom event*/
    $scope.addEvent = function() {
        $scope.events.push({
            title: 'Open Sesame',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            className: ['openSesame']
        });
    };
    /* remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };

    $scope.eventRenders = function( event, element, view ) {
        element.attr({'tooltip': event.title,
            'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    $scope.pitchOnButton = function(rowId,index){
        branchEditTemplate.editPitchOnButton(rowId,index);
    };

    $scope.addBranchEditTemplate = function () {
        branchEditTemplate.branchEidtAddTemplate();
        branchEditTemplate.getBranch();
    };

    $scope.addBranchEditTemplateCopy = function (dayNum) {
        branchEditTemplate.getBranch(dayNum);
    }

    $scope.closeEditTemplate = function() {
        branchEditTemplate.closeBranchEditTemplate();
    };

    $scope.submitUpdate = function(indexs){
        branchEditTemplate.branchEditDelRow(indexs);
    };
    
    $scope.addEditBranchInfoTemplate = function () {
        editBranchInfoTemplate.getBranchInfoList();
    };

    $scope.editRowBranchInfoButton = function (index) {
            editBranchInfoTemplate.editRowBranchInfo(index);
    };

    $scope.saveEditRowBranchInfoButton = function (index) {
        editBranchInfoTemplate.saveEditRowBranchInfo(index);
    };

    $scope.saveEditBranchInfo = function () {
        editBranchInfoTemplate.saveBranchInfo();
        window.location.reload();
    };

    $scope.addBranchInfo = function () {
        editBranchInfoTemplate.openMyBranchModel();
    },
    $scope.closeBranchInfoWindow = function () {
        editBranchInfoTemplate.closeEditBranchInfoModalLabel();
    };
    $scope.saveAddBranchInfoButton = function () {
        editBranchInfoTemplate.saveAddBranchInfo();
        $timeout(function() {
            editBranchInfoTemplate.getBranchInfoList();
        }, 500);
    };
    $scope.deleteRowBranchInfoButton = function (index) {
        editBranchInfoTemplate.deleteRowBranchInfo(index);
    }

    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: false,
            stick: true,
            fixedWeekCount: false,
            displayEventTime: false,
            slotEventOverlap: true,
            eventStartEditable:true,
            //
            businessHours: {
                dow: [ 1, 2, 3, 4, 5 ], // 周一 - 周四
            },
            titleFormat:'MMMM YYYY',
            header:{
                left: 'prevYear, nextYear, title, ',
                center: '',
                right: 'prev,next'
            },
            // eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRenders,
            dayClick: $scope.eventOne,
            // loading:$scope.jurisdiction,
            eventDrop:$scope.endDragStip 
            // eventMouseover:$scope.eventMou
            /* Mouseover*/
            /*eventMouseover: $scope.eventMouseover*/
        }
    };

    // $scope.changeLang = function() {
    //     if($scope.changeTo === 'Hungarian'){
    //         $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
    //         $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
    //         $scope.changeTo= 'English';
    //     } else {
    //         $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //         $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //         $scope.changeTo = 'Hungarian';
    //     }
    // };
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventsF];

})

/* EOF */