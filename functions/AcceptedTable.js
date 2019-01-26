function AcceptedTable(pcgameitcsv){
    var appid_data = pcgameitcsv.split("\n");
    var table_data = '<table class="pcgameit">';
    for(var count = 0; count<appid_data.length; count++)
    {
        var cell_data = appid_data[count].split(",");
        table_data += '<tr>';
        for(var cell_count=0; cell_count<cell_data.length; cell_count++)
        {
            if(count === 0)
            {
                table_data += '<th>'+cell_data[cell_count]+'</th>';
            }
            else
            {
                table_data += '<td>'+cell_data[cell_count]+'</td>';
            }
        }
        table_data += '</tr>';
    }
    table_data += '</table>';

    if ($(".admin_content")[0]){
        //$( ".admin_content" ).append( "<div class=\"titleframe PCGameitChart\"></div><br>" );
        //$('.titleframe.PCGameitChart').html(table_data);
    } else {
        $( ".darkframe" ).prepend( "<div class=\"titleframe PCGameitChart\"></div><br>" );
        $('.titleframe.PCGameitChart').html(table_data);
    }
}