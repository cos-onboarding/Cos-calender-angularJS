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
            return new Date(times).toLocaleTimeString().replace("上午"," ").replace("下午"," ");
        },
    }
}]);