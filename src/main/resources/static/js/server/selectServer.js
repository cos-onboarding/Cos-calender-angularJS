app.service('chServer', [function ($scope) {
    return {
        findElem: function(arrayToSearch,val){
            for (var i=0;i<arrayToSearch.length;i++){
                if(arrayToSearch[i].title==val){
                    return i;
                }
            }
            return -1;
        },
        dateStampDay:function (times) {
            return new Date(parseInt(times)).toLocaleDateString();
        },
        timeStampDay:function (times) {
            var toDay = new Date(times);
            var hours = toDay.getHours();
            var minutes= toDay.getMinutes();
            var seconds = toDay.getSeconds();
            return " "+hours + ":"+minutes+":"+seconds;
        },
        dateAddDays:function (dataStr,dayCount){
            var isdate = new Date(dataStr);  //把日期字符串转换成日期格式
            var pdate = isdate.getFullYear() + "-" + (isdate.getMonth()+1) + "-" + (isdate.getDate());   //把日期格式转换成字符串
            return pdate;
        },
        dateTimeChuo:function (dataStr,dayCount) {
            var date1 = new Date(parseInt(dataStr));
            date1.setDate(date1.getDate() + dayCount);
            var timestamp2 = new Date(date1).getTime();
            return timestamp2;
        }
    }
}]);