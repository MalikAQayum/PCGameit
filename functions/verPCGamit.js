function verPCGamit(){
    var st_Version = GM_info.script.version, st_Name = GM_info.script.name, st_Author = GM_info.script.author, st_Namespace = GM_info.script.namespace;
    console.log ('%c '+st_Name + ': v'+st_Version + ' by '+st_Author, 'background: grey; color: white; display: block;', st_Namespace);
    var verContent = st_Name + ': v'+st_Version + ' by '+st_Author + ' <a class="pagebtn" href="https://github.com/MalikAQayum/PCGameit/raw/master/PCGameit.user.js" class="button">UPDATE</a>';
    //
    if ($(".admin_content")[0]){
        $( ".admin_content" ).prepend( "<div class=\"titleframe version\"></div><br>" );
        $('.titleframe.version').html(verContent);
    } else {
        $( ".darkframe" ).prepend( "<div class=\"titleframe version\"></div><br>" );
        $('.titleframe.version').html(verContent);
    }
}