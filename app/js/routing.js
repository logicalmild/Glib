var MappingPage = {
    1:{
        Title:'home',
        Url:SiteUrl + '/SitePages/web/app/page/home.html',
    },
    2:{
        Title:'DataChemicals',
        Url:SiteUrl + '/SitePages/web/app/page/DataChemicals.html',
    },
    3:{
        Title:'UsageChemicals',
        Url:SiteUrl + '/SitePages/web/app/page/UsageChemicals.html',
    },
    4:{
        Title:'AppSettings',
        Url:SiteUrl + '/SitePages/web/app/page/AppSettings.html',
    },
    5:{
        Title:'FormDataChemicals',
        Url:SiteUrl + '/SitePages/web/app/page/Form.html',
    },
    6:{
        Title:'FormUsageChemicals',
        Url:SiteUrl + '/SitePages/web/app/page/Form.html',
    },
    7:{
        Title:'Not Found',
        Url:SiteUrl + '/SitePages/web/app/page/PageNotFound.html',
    },
};

function Routing(){
    // render AppZone
    var Page = GetParameterByName('Page');
    var CurrentUrl = '';
    if(Page){
        for(i in MappingPage){
            if(MappingPage[i].Title == Page){
                CurrentUrl = MappingPage[i].Url;
                break;
            }else if(MappingPage[i].Title == 'Not Found'){
                CurrentUrl = MappingPage[i].Url;
            }
        }
        Load('#AppZone' ,CurrentUrl); // Routing by parameter
           
    }else{
        Load('#AppZone' ,MappingPage[1].Url); // Home
    }

}