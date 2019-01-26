function ajaxrequests(){
    $(document).ready(function() {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://store.steampowered.com/curator/33779114-pcgameit/admin/accepted?ajax=1",
            onload: function(response) {
                if(response.status == 200){
                    var acceptedappids = response.responseText.match(/app-ctn-[0-9]*"/g);
                    for(var i=0; i < acceptedappids.length; i++) {
                        acceptedappids[i] = acceptedappids[i].replace(/app-ctn-/g, '');
                    }
                    //console.log(acceptedappids);
                    var acceptedJSON = {};
                    for(var j=0; j < acceptedappids.length; j++) {
                        acceptedJSON += '"' +acceptedappids[j] + ':{"id":"' + acceptedappids[j] + ',"success":true,"mailstatus":"success","type":"game","mail":"","url":""},\n';
                    }
                    setTimeout(function(){ console.log(acceptedJSON.replace('[object Object]','').substring(0, acceptedJSON.length - 17))}, 5000);
                }else{
                    setTimeout(function(){ ajaxrequests()}, 5000);
                }
            }
        });
    });
}