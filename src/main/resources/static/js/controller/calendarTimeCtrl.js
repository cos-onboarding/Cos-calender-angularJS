app.controller("calendarTimeCtrl",function ($scope,$rootScope,$http,$compile,$modal,$timeout,$stateParams,modalsss,manager,branchTemplate,chServer,branchEditTemplate) {
    $rootScope.isLandingPage = false;
    $scope.selectIds=[];
    $rootScope.sites = [
        {site : "完成", val : 0},
        {site : "未完成", val : 1},
        {site : "失败", val : 2}
    ];
    /* 页面日历标题*/
    $scope.events = [];
    $scope.userId = $stateParams.id; // 员工ID
    $scope.branchId = $stateParams.branchId; // 分行ID
    /**
     * calendarDemoApp - 0.9.0
     */

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    $rootScope.timeStamp = ''; // 获取每个组唯一时间戳
    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event',           // an option!
        currentTimezone: 'America/Chicago' // an option!
    };

    //获取权限
    $scope.jurisdiction = function() {
        var param = {userId: $scope.userId};
        $http.post("/camel/api/getGrade",param,{
        }).then(function (result) {  //正确请求成功时处理
            $rootScope.rid = result.data.grade; // 权限ID
            // $rootScope.bid = result.data.bid; // 分行ID
            if($rootScope.rid == 2){ // 领导
                managerLoads($scope.branchId);
            }else if ($rootScope.rid == 3){ // 总行
                headOfficeView($scope.branchId);
            }else{ //员工
                staffLoads(param);
            }
        }).catch(function (result) { //捕捉错误处理
        });
    }
    // jurisdiction();
    //加载员工自己日程
    function staffLoads(param) {
        $http.post("/camel/api/getCalendarTimeList",param,{
        }).then(function (result) {  //正确请求成功时处理
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
            console.log("员工自己:"+JSON.stringify($scope.events));
        }).catch(function (result) { //捕捉错误处理
        });
    };

    //加载所有员工数据
    function managerLoads(bid) {
        var param = {bid: bid};
        $http.post("/camel/api/getAllTimeSchedule",param,{
        }).then(function (result) {  //正确请求成功时处理
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
            console.log("所有员工:"+JSON.stringify($scope.events));
        }).catch(function (result) { //捕捉错误处理
        });
    };
    function headOfficeView() {
        $http.post("/camel/api/getHeadOfficeList",{
        }).then(function (result){
            angular.copy(result.data, $scope.events)
            console.log("所有:"+JSON.stringify($scope.events));
        }).catch(function (result){

            alert("-------------fail----------");
        });
    };

    // 点击日期
    $scope.eventOne = function (date, allDay, jsEvent, view) {
        $rootScope._date = date._i;
        if($rootScope.rid == 2){ // 领导
            manager.allEventOnes(date, allDay, jsEvent, view,$scope.branchId);
            manager.getStaff(); // 查询员工
        }else if ($rootScope.rid == 3){ // 总行
            branchTemplate.branchEventOne(date, allDay, jsEvent, view,$scope.branchId);

        }else{ //员工
            modalsss.eventOnes(date, allDay, jsEvent, view,$scope.userId,$scope.branchId);
        }
    }

    // 删除日程
    $scope.deleteProj = function (indexs) {
        if($rootScope.rid == 2){ // 领导
            manager.mDeleteSchedule(indexs);
        }else if ($rootScope.rid == 3){ // 总行
            branchTemplate.deleteTemplateRowInfo(indexs);
        }else{ //员工
            modalsss.deleteProjs(indexs);
        }
    }

    // 添加日程
    $scope.addSchedule = function () {
        if($rootScope.rid == 2){ // 领导
            manager.mAddSchedule();
        }else if ($rootScope.rid == 3){ // 总行
            branchTemplate.branchAdd($scope.branchId);
        }else{ //员工
            modalsss.addSchedules($scope.userId,$scope.branchId);
        }
    };

    // 保存窗口替换数据
    $scope.saveTemplate = function (event) {
        if($rootScope.rid == 2){ // 领导
            manager.mSaveSchedul();
        }else if ($rootScope.rid == 3){ // 总行
            branchTemplate.saveBranchTaskInfo();
        }else{ //员工
            modalsss.updateMss($scope.userId);
        }
        window.location.reload();
    };
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
        }).then(function (result) {  //正确请求成功时处理
        }).catch(function (result) { //捕捉错误处理
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

    //关闭窗口删除修改数据
    $scope.closeTemplate = function () {

        if($rootScope.rid == 2){ // 领导
            manager.mCloseSchedul()
        }else if ($rootScope.rid == 3){ // 总行
            branchTemplate.closeBranchTemplate();
        }else{ //员工
            modalsss.deleteMSs();
        }
    };


    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        callback(events)
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
    $scope.delItem = function(){
        branchEditTemplate.branchEditDelRow();
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
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRenders,
            dayClick: $scope.eventOne,
            loading:$scope.jurisdiction,
            eventDrop:$scope.endDragStip //拖拽功能
            // eventMouseover:$scope.eventMou
            /* Mouseover*/
            /*eventMouseover: $scope.eventMouseover*/
        }
    };
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
})

/* EOF */