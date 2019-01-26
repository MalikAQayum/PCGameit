function barter_v2(){
    console.log("\nPCGameit Barter Pending Page.\n");
    var BAppidArr=[];
    var BPendingHTML = document.documentElement.innerHTML;
    var appidRegex= /app-ctn-[0-9]+/g;
    $.each(BPendingHTML.match(appidRegex), function(index, value) {
        BAppidArr.push(value.replace("app-ctn-",""));
    });
    for (let i = 0; i < BAppidArr.length; i++) {
        var BpendingString = $( "#app-ctn-"+BAppidArr[i] + "> div.offer_ctn > div.app_ctn.app_header > div > div.app_name_ctn").html();
        BpendingString = BpendingString.replace(/\s\s+/g, ' ');
        BpendingString = BpendingString
            .replace(/<span class="app_name">/g, '"')
            .replace(/<\/span> <br>You have been offered /g, '",')
            .replace(/ copy. <br> <span class="">This offer will expire on /g, ',"')
            .replace(/ copies. <br> <span class="">This offer will expire on /g, ',"')
            .replace(/",one,"/g, '",1,"')
            .replace(/<\/span>/g, '"');

        var firstvariable = "\",";
        var secondvariable = ",\"";
        var CheckCopies = BpendingString.match(new RegExp(firstvariable + "(.*)" + secondvariable));
        if(CheckCopies[1]>2){
            console.log(BpendingString.split('",')[0].substr(1));
        }
    }
}