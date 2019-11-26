
// Data Connection /////////////////////////////////////////////////////////////
var Connection_Obj = [];
    Connection_Obj[0] = {
        Title:'Get area form master_Area',
        'SiteUrl' : Site.Url,
        ListName: 'Master_Area',
        Query: '?$select=Area&$top=1000&$orderby=Area asc'
    };
////////////////////////////////////////////////////////////////////////////////