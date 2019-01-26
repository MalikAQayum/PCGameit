function pending(dburl){
    $(document).ready(function() {
        console.log("\nList of Pending Curator packages sent to PCGameit");
        GM_xmlhttpRequest({
            method: "GET",
            url: dburl,
            synchronous: true,
            onload: function(response) {
                var json = response.responseText;
                json = JSON.parse(json);
                var checkappids = [];
                for(var k in json) checkappids.push(k);
                for (let i = 0; i < checkappids.length; i++) {
                    if ($( "#app-ctn-"+checkappids[i] + "> div.offer_ctn > div.app_ctn.app_header > div > div.app_name_ctn > span.app_name").html() === undefined){
                    }else{
                        console.log(checkappids[i] + " : "+$( "#app-ctn-"+checkappids[i] + "> div.offer_ctn > div.app_ctn.app_header > div > div.app_name_ctn > span.app_name").html());
                    }
                }
            }
        });
    });
}