function CheckCopiesP(){
    var p_count;
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://store.steampowered.com/curator/33779114-pcgameit/admin/pending?ajax=1",
        synchronous: true,
        onload: function(response) {
            var p_str = response.responseText;
            var re_copy = /(.*offered\s+)(.*)(\s+copy.*)/g;
            var re_copies = /(offered)(.*)(copies)/g;
            var p_str_copy = p_str.match(re_copy);
            var p_str_copies = p_str.match(re_copies);
            p_str_copies = p_str_copies.map(function(item){
                return item.replace('offered ', '').replace(' copies', '');
            });

            for(var i=0; i<p_str_copies.length;i++) {
                p_str_copies[i] = parseInt(p_str_copies[i], 10);
            }

            let p_count = eval(p_str_copies.join('+')) + p_str_copy.length;
            console.log("Pending Count = " +p_count);
            CheckCopiesE(p_count);
        }
    });
}

function CheckCopiesE(p_count){
    let pe_count;
    var e_count;
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://store.steampowered.com/curator/33779114-pcgameit/admin/excluded?ajax=1",
        synchronous: true,
        onload: function(response) {
            var e_str = response.responseText;
            var re_copy = /(.*offered\s+)(.*)(\s+copy.*)/g;
            var re_copies = /(offered)(.*)(copies)/g;
            var e_str_copy = e_str.match(re_copy);
            var e_str_copies = e_str.match(re_copies);
            e_str_copies = e_str_copies.map(function(item){
                return item.replace('offered ', '').replace(' copies', '');
            });

            for(var i=0; i<e_str_copies.length;i++) {
                e_str_copies[i] = parseInt(e_str_copies[i], 10);
            }
            let e_count = eval(e_str_copies.join('+')) + e_str_copy.length;
            console.log("Excluded Count = " +e_count);

            pe_count = parseInt(p_count) + parseInt(e_count);
            console.log("Total Pending/Excluded Count = " +pe_count);

            //localStorage.setItem("PCGameitPCopiesCount",p_count);
            //localStorage.setItem("PCGameitECopiesCount",e_count);
            //localStorage.setItem("PCGameitPECopiesCount",pe_count);

            if ($(".admin_content")[0]){

                    $("#subpage_container > div.titleframe > h4").html("").append("<h4> Total Pending Curator Copies => "+ p_count + "<br> Total Excluded Curator Copies => "+e_count+ "<br> Total Curator Copies => "+pe_count+"</h4>");
                $("#subpage_container > div.curator_connect.pending_games > div.titleframe > h4").html("").append("<h4> Total Pending Curator Copies => "+ p_count + "<br> Total Excluded Curator Copies => "+e_count+ "<br> Total Curator Copies => "+pe_count+"</h4>");

            } else {
            }
        }
    });
}
