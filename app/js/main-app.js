$(document).ready(function(){
    $('#ctl00_PlaceHolderMain_WikiField').hide();
    Load('#s4-bodyContainer','https://scgchemicals.scg.com/lotusnotes/ROC_Store/SitePages/web/AppTemplate/loading/loading.html');
    Load('.sidenav','https://scgchemicals.scg.com/lotusnotes/ROC_Store/SitePages/web/AppTemplate/leftmenu/leftmenu.html');
    Routing();
    setTimeout(function(){ 
        $('.sidenav,.body-zone,#ctl00_PlaceHolderMain_WikiField').fadeIn(1000);
        $('.lds-roller').hide();
    }, 200);
    

});

function Load(Elem,Url){
    var response;
        $.ajax({ type: "GET",   
            url: Url,
            async: false,
            success : function(text)
            {
                response= text;
              
            },
            error: function(err){
                Load('#AppZone' ,MappingPage[1].Url); // Home
            },
      
        });
      
    // $(Elem).empty();
    $(Elem).append(response);
}

