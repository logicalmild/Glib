$(document).ready(function(){
    

    // GetCurrentUser();
    // GetCurrentGroupUser();
    // SP.SOD.loadMultiple(['sp.js', 'clienttemplates.js','clientforms.js','clientpeoplepicker.js','autofill.js'], function () {
        FormStart();
    // });
    // SP.SOD.ExecuteOrDelayUntilScriptLoaded(FormStart(), "sp.js");
    // 
 

});




function DataConnection(ConnectionID){
    var SiteUrl = Connection_Obj[ConnectionID].SiteUrl;
    var ListName = Connection_Obj[ConnectionID].ListName;
    var Query = Connection_Obj[ConnectionID].Query;

    var requestUri = SiteUrl + "/_api/web/lists/getByTitle('"+ListName+"')/items" + Query;
    var requestHeaders = {
    "accept": "application/json;odata=verbose"
    }
    var extr_Data;

    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: requestHeaders,
        success: function (data) 
        {      
            data = data.d.results; 
            extr_Data = data;
            
        },
        error: function ajaxError(response) {
            console.log(response.status + ' ' + response.statusText);
        }
    });

    return extr_Data;
}

function LoadScript(Script){
    var Url = 'https://logicalmild.github.io/SP-Terminal/module/getlistinfo/getlistinfo.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function()
            {
               console.log('Load '+ Script +'success');
                
            },
            error:function(){
                console.log('Get script ' + Script + ' error.');
            },
          });
}


