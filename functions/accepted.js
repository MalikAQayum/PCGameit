function accepted(db_url){
    $(document).ready(function() {
        console.log("\nList of Accepted Curator packages sent to PCGameit");
        GM_xmlhttpRequest({
            method: "GET",
            url: db_url,
            synchronous: true,
            onload: function(response) {
                var json = response.responseText;
                json = JSON.parse(json);
                var checkappids = [];
                for(var k in json) checkappids.push(k);
                for (let i = 0; i < checkappids.length; i++) {
                    if ($( "#app-ctn-"+checkappids[i] + "> div.app_accepted > div > span").html() === undefined){
                    }else{
                        console.log(checkappids[i] + " : "+$( "#app-ctn-"+checkappids[i] + "> div.app_accepted > div > span").html());
                    }
                }
            }
        });
    });
}