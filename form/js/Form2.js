// Prepare parameter

var Form = {
    Code:null,
    View:null,
    FormID:null,
    FormName:null,
    FileName:null,
    FormNew:null,
    FormView:null,
    FormEdit:null,
    FormStatus:null,
    StatusAction:null,
    FlagSubmit:false,
    FormMaster:null,
    RunningNO:null,
    LinkUrl:null,
    List:null,
    FieldData:null,
    Attachment:null,
    Workflow:null,
    FormStep:null,
    TempData:null,
    GetParameter:function(){

        Form.FormMaster = GetParameterByName('FormMaster');
        Form.FormID = GetParameterByName('FormID');

    },
    Map:function(){
        var query = '?$select=ID,FormStatus&$filter=FormID eq \''+Form.FormID+'\'';
        var data = GetItemByRestAPI(Form.List.Name,query);
        if(data){
            if(data.length > 0){
                Form.FormStatus = data[0].FormStatus;
            }else{
                Form.FormStatus = 'Create';
            }
        }else{
            Form.RoutingPage('PageMapError.html');
            
        }
    },
    CssInit:function(){
    
            $('input').keypress(function(event){
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13'){
                    event.preventDefault();
                    return false;
                }
            });
  

            $( "input" ).change(function() {
            
                var str = $(this).val();
                if (str.indexOf(';') > -1 || str.indexOf('[') > -1 || str.indexOf(']') > -1 || str.indexOf('|') > -1)
                {
                    $(this).css("background-color","red");
                    $(this).css("color","white");
                    alert('Don\'t input "; [ ] |" ');  
                }
                else{
                    $(this).css("color","black");
                    $(this).css("background-color","white");
                    
                }
            
            });


            $( ".DatePicker" ).datepicker({
                dateFormat: "mm/dd/yy"
            });

            $('[data-toggle="tooltip"]').tooltip(); 
          
    },
    Refresh:function(){

    },
    Routing:function(){
        if(Form.FormID){

            Form.View = 'View';

        }else{
        
            Form.View = 'Create';
            Form.FormStatus = 'Create';
            Form.FormID = generateUID();
        }
    },
    RoutingPage:function(Page){
        
        $('#PageBody').empty();
        var response;
            $.ajax({ type: "GET",   
                url: SiteUrl + "/SitePages/web/form/component/Page/" + Page,   
                async: false,
                success : function(text)
                {
                    response= text;
                }
            });
        
        $('#PageBody').append(response);
        $('.loader').remove();
    },
    GetConfigData:function(){

        if(Form.FormMaster){
            
            // var FormMaster = FormMaster[Form.FormMaster];

            Form.Code = FormMaster[Form.FormMaster].Code;
            Form.FormName = FormMaster[Form.FormMaster].FormName;
            Form.FileName = FormMaster[Form.FormMaster].FileName;
            Form.List = FormMaster[Form.FormMaster].List;
            Form.Attachment = FormMaster[Form.FormMaster].Attachment;
            Form.RunningNO = FormMaster[Form.FormMaster].RunningNO;
            Form.FieldData = FormMaster[Form.FormMaster].FieldData;
            Form.Workflow = FormMaster[Form.FormMaster].Workflow;
            Form.FormStep = FormMaster[Form.FormMaster].FormStep;
        }else{
            Form.RoutingPage('PageNotFound.html'); // FormMethodTemplate
            return 0;
        }
         
    },
    Render:{
        Template:function(){
      
            $('title').text(Form.FormName);
            var response;
                $.ajax({ type: "GET",   
                    url: SiteUrl + "/SitePages/web/form/template/"+Form.FileName+"/"+Form.FileName+".html",   
                    async: false,
                    success : function(text)
                    {
                        response= text;
                    
                    },
            
                });
            
                $('#Content').append(response);
                $('.loader').remove();
        },
        Navbar:function(){
            var response;
            $.ajax({ type: "GET",   
                url: SiteUrl + "/SitePages/web/form/component/Navbar/Navbar.html",   
                async: false,
                success : function(text)
                {
                    response = text;
                    $('#Navbar').append(response);
                },
        
            }); 
        },
        RightNavbar:function(){
            var response;
            $.ajax({ type: "GET",   
                url: SiteUrl + "/SitePages/web/form/component/RightNavMenu/RightNavMenu.html",   
                async: false,
                success : function(text)
                {
                    response = text;
                    $('body').append(response);
                },
        
            }); 
        },
        Modal:function(){
            var response;
            $.ajax({ type: "GET",   
                url: SiteUrl + "/SitePages/web/form/component/ModalTemplate/ModalTemplate.html",   
                async: false,
                success : function(text)
                {
                    response= text;
                }
            });

            $('body').prepend(response);
        },
        Approval:function(){
            var response;
            $.ajax({ type: "GET",   
                url: SiteUrl + "/SitePages/web/form/component/Approval/Approval.html",   
                async: false,
                success : function(text)
                {
                    response= text;
                }
            });
    
            $('#Approval').prepend(response);
        },
        HistoryLog:function(){
            var response;
            $.ajax({ type: "GET",   
                url: SiteUrl + "/SitePages/web/form/component/HistoryLog/HistoryLog.html",   
                async: false,
                success : function(text)
                {
                    response= text;
                    $('#HistoryLog').append(response);
                    HistoryLog('get'); 
                }
            });
        },
        View:function(){
            for(i in Form.FormStep){
                if(Form.FormStep[i].FormStatus == Form.FormStatus){
                    Form.FormView = Form.FormStep[i].FormView;

                        $('title').text(Form.FormName);
                        var response;
                        $.ajax({ type: "GET",   
                            url: SiteUrl + "/SitePages/web/form/template/"+Form.FileName+"/view/"+Form.View+".html",   
                            async: false,
                            success : function(text)
                            {
                                response= text;
                            
                            },
                    
                        });
                    
                        $('#Content').append(response);
                        $('.loader').remove();

                }else{
                    RoutingPage('PageNotFound.html');
                    return 0;
                }
            }
        }
    },
    SetInitialForm:function(){
        SetInitialForm(); // in form template
    },
    SetRequireField:function(){
        
        $('.MarkRequired').remove();
        var Setting = Form.FormStep;
        for(var i in Setting){
            if(Setting[i].FormStatus == Form.FormStatus){
                for(var j in Setting[i].Validate){
                        var FieldValidate = Setting[i].Validate[j];
                        var str = '<p class="MarkRequired">*</p>';
                        $('#' + FieldValidate.ID).before(str);
                        $('#' + FieldValidate.ID).attr('require', true);   
                        
                } 
            } 
        }
    },
    Module:{
        Summernote:function(selector){
            $(selector).summernote({
    
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['picture'],
                    ['para', ['paragraph']],
                    ['table', ['table']],
        
                ],
                popover: {
                            image: [
                                ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                                ['float', ['floatLeft', 'floatRight', 'floatNone']],
                                ['remove', ['removeMedia']]
                            ],
                            link: [
                                ['link', ['linkDialogShow', 'unlink']]
                            ],
                            air: [
                                ['color', ['color']],
                                ['font', ['bold', 'underline', 'clear']],
                                ['para', ['ul', 'paragraph']],
                                ['table', ['table']],
                                ['insert', ['link', 'picture']]
                            ]
                        }
        
        
                });   
    
            $('.note-popover , .popover').hide();
        },
    },
    GetData:function(query){
        var data = GetItemByRestAPI(ListData,query);
    }
}

var Workflow = {
};


function FormStart(){
    
    Form.GetParameter();
    Form.GetConfigData();
    Form.Map();
    Form.Routing();
    Form.Render.Navbar();
    Form.Render.RightNavbar();
    Form.Render.Approval();
    Form.Render.HistoryLog();
    Form.Render.Modal();
    Form.Render.View();
    Form.CssInit();
    Form.SetInitialForm();
    Form.SetRequireField();
    // $('#Title_ActionBy').text(CurrentUser.Name);
}

