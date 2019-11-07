

$(document).ready(function(){

    var response;
        $.ajax({ type: "GET",   
            url: 'https://scgchemicals.scg.com/lotusnotes/ROC_Store/SitePages/web/AppTemplate/ref.html',   
            async: false,
            success : function(text)
            {
                response= text;
              
            },
      
        });
      
    $('head').prepend(response);

});

