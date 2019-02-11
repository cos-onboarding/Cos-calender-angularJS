app.controller("calendarTimeCtrl",function ($scope,$rootScope,$http,$compile,$modal,$timeout,$stateParams,modalsss,manager,branchTemplate,chServer,branchEditTemplate) {
    $rootScope.isLandingPage = false;
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
    $scope.jurisdiction = function() {
        var param = {userId: $scope.userId};
        $http.post("/camel/api/getGrade",param,{
        }).then(function (result) {  //
            $rootScope.rid = result.data.grade; // 权限ID  Authorization ID
            // $rootScope.bid = result.data.bid; // 分行ID  The branch ID
            if($rootScope.rid == 2){ // 领导   leadership
                managerLoads($scope.branchId);
                $scope.uiConfig.calendar.eventStartEditable = false;
            }else if ($rootScope.rid == 3){ // 总行   The headquarters of
                headOfficeView($scope.branchId);
                $scope.uiConfig.calendar.eventStartEditable = false;
            }else{ //员工  employees
                staffLoads(param);
                $scope.uiConfig.calendar.eventStartEditable = true;
            }
        }).catch(function (result) { //捕捉错误处理
        });
    }
    // jurisdiction();
    //Load the employee's own schedule
    //加载员工自己日程
    function staffLoads(param) {
        $http.post("/camel/api/getCalendarTimeList",param,{
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
    function managerLoads(bid) {
        var param = {bid: bid};
        $http.post("/camel/api/getAllTimeSchedule",param,{
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
    function headOfficeView() {
        $http.post("/camel/api/getHeadOfficeList",{
        }).then(function (result){
            angular.copy(result.data, $scope.events)
        }).catch(function (result){

            alert("-------------fail----------");
        });
    };

    //Click on the date
    // 点击日期
    $scope.eventOne = function (date, allDay, jsEvent, view) {
        $rootScope._date = date._i;
        if($rootScope.rid == 2){
            manager.allEventOnes(date, allDay, jsEvent, view,$scope.branchId);
            manager.getStaff(); // 查询员工   Query staff
        }else if ($rootScope.rid == 3){
            branchTemplate.branchEventOne(date, allDay, jsEvent, view,$scope.branchId);
        }else{
            modalsss.eventOnes(date, allDay, jsEvent, view,$scope.userId,$scope.branchId);
        }
    }

    //Delete the schedule
    // 删除日程
    $scope.deleteProj = function (indexs) {
        if($rootScope.rid == 2){
            manager.mDeleteSchedule(indexs);
        }else if ($rootScope.rid == 3){
            branchTemplate.deleteTemplateRowInfo(indexs);
        }else{
            modalsss.deleteProjs(indexs);
        }
    }

    //Add the schedule
    // 添加日程
    $scope.addSchedule = function () {
        if($rootScope.rid == 2){
            manager.mAddSchedule($scope.branchId);
        }else if ($rootScope.rid == 3){
            branchTemplate.branchAdd($scope.branchId);
        }else{
            modalsss.addSchedules($scope.userId,$scope.branchId);
        }
    };

    //Save window replacement data
    // 保存窗口替换数据
    $scope.saveTemplate = function (event) {
        if($rootScope.rid == 2){
            manager.mSaveSchedul();
        }else if ($rootScope.rid == 3){
            branchEditTemplate.saveBranchTaskInfo($scope.rowId);
        }else{
            modalsss.updateMss($scope.userId);
        }
        window.location.reload();
    };

    //Drag and drop functionality
    // 拖拽功能
    $scope.endDragStip = function (event, delta, revertFunc, jsEvent, ui, view) {
        console.log(event)
        console.log(delta._days)
        var timeStamp = chServer.dateTimeChuo(event.info_id,delta._days);
        var allToDay = chServer.dateAddDays(event.start,delta._days);
        console.log(timeStamp);
        console.log(allToDay);

        var param = {id:event.id,timeStamp:timeStamp,timeDay:allToDay};
        $http.post("/camel/api/dragAndDrop",param,{
        }).then(function (result) {
        }).catch(function (result) {
        });
    },


    $scope.branchScheduleInfo = function (indexsst) {
        branchTemplate.getBranchScheduleInfo(indexsst,$rootScope._date);
    };

    // // 筛选是否包含该对象
    // function findElem(arrayToSearch,val){
    //     for (var i=0;i<arrayToSearch.length;i++){
    //         if(arrayToSearch[i].title==val){
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    //Close the window to delete modified data
    //关闭窗口删除修改数据
    $scope.closeTemplate = function () {

        if($rootScope.rid == 2){
            manager.mCloseSchedul()
        }else if ($rootScope.rid == 3){
            branchTemplate.closeBranchTemplate();
        }else{
            modalsss.deleteMSs();
        }
    };


    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {

        if(new Date(end).getMonth() == 0){
            console.log((new Date(end).getFullYear()-1) + " -"+ 12)
        }else{
            console.log((new Date(end).getFullYear()) + " -"+(new Date(end).getMonth()))
        }
        // var s = new Date(start).getTime() / 1000;
        // var e = new Date(end).getTime() / 1000;
        // var m = new Date(start).getMonth();
        // var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        callback($scope.events)
    };;

    $scope.calEventsExt = {
        color: '#f00',
        textColor: 'yellow',
        events: [
            {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
            {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
            {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ]
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

    $scope.addBranchEditTemplate = function () {
        branchEditTemplate.branchEidtAddTemplate();
        branchEditTemplate.getBranch();
    };

    $scope.closeEditTemplate = function() {
        branchEditTemplate.closeBranchEditTemplate();
    };
    $scope.delItem = function(indexs){
        branchEditTemplate.branchEditDelRow(indexs);
    };
    $scope.addBranchSchedule = function () {
        branchEditTemplate.branchEditAdd();
    };

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
            header:{
                left: 'prevYear, nextYear, title, ',
                center: '',
                right: 'today prev,next'
            },
            // eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRenders,
            dayClick: $scope.eventOne,
            loading:$scope.jurisdiction,
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