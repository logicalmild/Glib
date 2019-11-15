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
    Workflow:null,
    FormStep:null,
    TempData:null,
    Attachment:{
        Default:function(){
            $('#MainModal').modal();
            $(".modal-dialog").css("max-width", "800px");
            AddLoading();
            $('#TitleModal').text('Attachfile');
        
            // Init modal attachfile
            var Dom = '';
            Dom+='';
            Dom+='<center>';
            Dom+='<div id="area_attachfile" class="form-group form-inline">';
            Dom+='    <input type="file" class="form-control-file col-md-9" style="border-color:gray; border-width:1px; border-style:solid;" id="getFile" aria-describedby="fileHelp">';
            Dom+='    <button onclick="uploadFile();" style="margin-left:10px;" type="button" class="btn btn btn-primary btn-sm col-md-2">Upload</button>';
            Dom+='<div style="display: none;" id="attachloading" class="lds-ring"><div></div><div></div><div></div><div></div></div>';
            Dom+='</div>';
            Dom+='</center>';
            $('#ModalBody').empty();
            $('#ModalBody').append(Dom);
            Loadfile();
            
            function Loadfile(){
        
            var query = '?$select=*,Author/Title&$expand=Author&$top=100&$filter=FormID eq \''+FormID+'\'';
            var data = GetItemByRestAPI(Attachment,query);
            var Result = '';
            if(data){
                for(i=0;i<data.length;i++){
                    Result+='<tr style="border-style:solid; border-width:1px; border-color:lightgray;">  ';
                    Result+='    <td style="text-align:left;" colspan="1">'+(i+1)+'</td>  ';
                    Result+='    <td style="text-align:left;" colspan="1"><a target="_blank" href="https://scgchemicals.scg.com/lotusnotes/TPE_Roto/Attachment/'+data[i].Title+'">'+data[i].Title+'</a></td>  ';
                    Result+='    <td style="text-align:left;" colspan="1">'+ConvertDate(data[i].Created)+'</td>  ';
                    Result+='    <td style="text-align:left;" colspan="1">'+data[i].Author.Title+'</td>';
                    if(Form.FormStatus == 'Complete' || Form.FormStatus == 'Reject'){
                        Result+='    <td style="text-align:left;" colspan="1"></td>';
                        $('#area_attachfile').hide();
                        
                    }
                    else{
                        Result+='    <td style="text-align:left;" colspan="1"><a onclick="Removefile(\''+data[i].ID+'\');" type="button" class="btn btn btn-primary btn-md" style="background-color:rgb(138, 28, 28); border-color:rgb(138, 28, 28); color:white; font-weight:bold;"><i class="fa fa-remove"></i></a></td>';
                    }
                    Result+='</tr>';
                }
                
            }
        
        
            var Table = '';
                Table+='';
                Table+='    <table class="table shadow ">';
                Table+='        <thead style="background-color:lightgray; color:black; border-color:lightgray;">';
                Table+='            <tr>';
                Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">No</p></th>';
                Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">File name</p></th>';
                Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">Upload</p></th>';
                Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">Upload by</p></th>';
                Table+='                <th scope="col"><p style="font-weight:normal; margin-bottom:0px;">Remove</p></th>';
                Table+='            </tr>';
                Table+='        </thead>';
                Table+='        <tbody id="ResultFile">';
                Table+= Result;
                Table+='        </tbody>';
                Table+='    </table>';
        
                $('#ModalBody').prepend(Table);
        
        
            }
        },

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
    Init:{
    
        css:function(){
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
            
          
    },
    Refresh:function(){

        var body = '';
        body+='<center><div style="margin-top:15%; margin-bottom:15%;" class="loader"></div></center>';
        body+='<div id="Navbar"></div>';
        body+='<div id="Content"></div>';
        body+='<div id="Approval"></div>';
        body+='<div id="HistoryLog"></div>';
        $('#PageBody').empty();
        $('#PageBody').append(body);
             

        var delayInMilliseconds = 1; //1 second

        setTimeout(function() {
            FormStart();
        }, delayInMilliseconds);
       
    },
    Close:function(){
     
        window.location.href = Form.LinkUrl.AfterCloseForm;
       
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
                    Form.HistoryLog('get'); 
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
        },
    },
    Add:{
        ToGroupMember:function(){
            var InGroupMember = CheckUserInGroupID(GroupMember);  
            if(InGroupMember == false){
                
                AddCurrentUserToGroup(GroupMember);
            }
        },
    },
    Set:{
        Initial:function(){

        },
        MasterData:function(){

        },
        RequireField:function(){
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
        InputData:function(){
            try{
                switch(item.TypeDom){
                                
                    case 'text':
                                $('#'+item.ID).val(TempData);
                                break;
                    case 'date':
                                if(TempData){
                                    $('#'+item.ID).val(ConvertDateOnly(TempData));
                                }
                                
                                break;
                    case 'label':
                                if(TempData){
                                    $('#'+item.ID).text(TempData);
                                }
                                
                                break;
                    case 'textarea':
                                $('#'+item.ID).val(TempData);
                                break;
                    case 'select':
                                if(item.TypeCol == 'people'){
                                    
                                    $('#'+item.ID).val(TempData.Id);
                                }
                                else{
            
                                    $('#'+item.ID).val(TempData);   
                                }
                                break;
            
                    case 'summernote':
                                $('#'+item.ID).summernote('code', TempData);
            
                                break;
                    case 'people':
                                //
                                item.Data;
                                if(TempData){
                                  
                                    $('#'+item.ID).attr("title",TempData.Id);
                                    $('#'+item.ID).val(TempData.Title);
                                    
                                }
                                break;
                    case 'people_multiple':
                                break;
            
                    case 'radio':
                                if(TempData){
            
                                    $('input[name='+item.ID+'][value="'+TempData+'"]').prop("checked",true);
            
                                }
                                //
                                break;
                    case 'checkbox':
                                if(TempData == true){
                                    $('#'+item.ID).prop('checked', true);
                                    var Str_Part = item.ID;
                                    Str_Part = Str_Part.substring(1,Str_Part.length);
                                    var Section = 'Part' + Str_Part;
                                    
                                    TriggerBar(Section);
                                }
                                break;
                    case 'object':
                        
                                if(TempData){
                                    var TempData = TempData;
                                    var arr_data =  TempData.split(';');
                                    var arr_data_length = arr_data.length;
                                    if(arr_data_length > 1){
                                        arr_data_length = arr_data_length - 1 ;
                                    }
                                    for(l=0;l<arr_data_length;l++){
                                    
                                        var TempArr = arr_data[l];
                                        var str_arr = TempArr.substring(1,TempArr.length-1);
                                        var obitem = str_arr.split('|');
                                        var ID = obitem[0];
                                        var value = obitem[1];
                                        if(value == 'true'){
                                            
                                            $('#'+ID).prop("checked", true );
                                        }
                                        else if(value == 'false'){
                                        
                                            $('#'+ID).prop("checked", false );
                                        }
                                        else{
                                            $('#'+ID).val(value);
                                        }
                                        
                                    }
            
                                }
                                break;
                }
            }
            catch(err){
                console.log(err);
            }
        },
        DocNo:function(Type){
            var DocNo = '';
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var hour = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();
        
            if(dd<10) {
                dd = '0'+dd;
            } 
        
            if(mm<10) {
                mm = '0'+mm;
            } 
            if(min<10){
                min = '0'+min;
        
            }
        
            //today = mm + '/' + dd + '/' + yyyy + '; ' + hour + ":" + min + ":" + sec;
            //DocNo = yyyy;// + '; ' + hour + ":" + min;
            var length = 0;
            var value;
            //var query = '?$select=DocNo,ID&$top=5000&$filter=Year eq \''+yyyy+'\'';
            var query = '?$select=RunningNO,ID&$top=1&$filter=Year eq \''+yyyy+'\' and RunningNO ne \'Draft\'&$orderby=ID desc';
            var data = GetItemByRestAPI(ListData,query);
          
            if(data){
                if(data.length>0){
                    var Temp_DocNo = data[0].RunningNO;
                    var arr_t1 = Temp_DocNo.split('/');
                    var t1 = arr_t1[1];
                    length = parseInt(t1);
                }
            }
            
            switch(Type){
                case 'DocNo': 
                                if(IsRunningNOEnabled == true){
                                    length = length + 1;
                                    value = FormatRunningNO + yyyy+'/'+length;
                                }else{
                                    value = '';
                                }
                                break;
        
                case 'Year':    value = yyyy;
                                break;
                case 'Month':
                                var ArrMonth = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                                value = ArrMonth[mm-1];
                                break;
        
            }
            return value;
        },
        People:{
            
            modal:function(FieldIndex){
        
                var str='';
                str+='<div class="form-inline col-md-12" style="margin-bottom:30px; margin-left:auto; margin-right:auto;">';
                str+='    <div id="peoplePickerDiv"></div>';
                str+='    <button onclick="Form.Set.People(\''+FieldIndex+'\');" style="margin-left:10px;" type="button" class="btn btn btn-primary btn-sm">Select</button>';
                str+='</div>';
                $('#ModalBody').empty();
                $('#ModalBody').append(str);
                
                initializePeoplePicker('peoplePickerDiv');
                registerPPOnChangeEvent($('#peoplePickerDiv'));
                $('#TitleModal').text('Search people..');
                $('#MainModal').modal('show');
                $('#ModalBody').css('max-height','500px');
                $('.modal-dialog').css('max-width','500px');
                $('.modal-dialog').css('max-height','500px');
            },
            add:function(FieldIndex) {
            
                var ObjField = Form.FormMaster.FieldData[FieldIndex].Data;
        
                var EmpID;
                var EmpName;
                var SetData_Approver = $('#peoplePickerDiv_TopSpan_HiddenInput').val();
                if(SetData_Approver){
                    var appset = JSON.parse(SetData_Approver);
                   
                    var arr = appset[0].Key;
                        EmpName = appset[0].DisplayText;
                    var LoginName = arr.split('|');
                    var LoginName = LoginName[1];
                    var clientContext = SP.ClientContext.get_current();
                    var website = clientContext.get_web();
                    currentUser = website.ensureUser(LoginName);
                    clientContext.load(website);
                    clientContext.load(currentUser);
                    clientContext.executeQueryAsync(onRequestSucceeded, onRequestFailed);
            
                    function onRequestSucceeded() {
            
                        EmpID = currentUser.get_id();
                        var length;
                      
                        if(typeof ObjField === 'undefined'){
                            Form.FormMaster.FieldData[FieldIndex].Data = {};
                            ObjField = Form.FormMaster.FieldData[FieldIndex].Data;
        
                    
                            length = 0;
                        }else{
                            length = Object.keys(ObjField).length;
                        }
                         
                       
                        var Temp = {
                  
                            [length]: {
                              Title: EmpName,
                              Id: EmpID
                            }
                      
                        };
                        
                        
                        ObjField = Object.assign(ObjField,Temp);
        
                       
                        Form.Set.People.show(FieldIndex);
                        
                    }
            
                    function onRequestFailed(sender, args) {
                
                        alert('Error: ' + args.get_message());
                    }
                }
                
                $('#MainModal').modal('hide');
        
        
        
        
        
            } ,
            del:function(FieldIndex,Key){
           
                var ObjField = Form.FormMaster.FieldData[FieldIndex].Data;
                delete ObjField[Key];
                Form.Set.People.show(FieldIndex);
            } ,
            show:function(FieldIndex){
        
                var ObjField = Form.FormMaster.FieldData[FieldIndex].Data;
                var DomID = Form.FormMaster.FieldData[FieldIndex].ID;
                var str= '';
                for(i in ObjField){
                    str+='';
                    str+='<li>';
                    str+='  <div class="form-inline">';
                    str+='    <p style="margin-bottom:0px;">'+ObjField[i].Title+'</p>';
                    str+='    <a style="cursor: pointer;" onclick="Form.Set.People.del(\''+FieldIndex+'\',\''+i+'\');" type="button">x</a>';
                    str+='  </div>';
                    str+='</li>';
                }
                
                $('#'+DomID).empty();
                $('#'+DomID).append(str);
            },
            data:function(ObjField){
                var str;
                if(ObjField){
                    str='';
                    for(i in ObjField){
        
                        str += ObjField[i].Id + ';#' + ObjField[i].Title +';#';
                    } 
                }else{
                    str = {};
                }
                       
        
                return str;
            }
        },
        Approval:function(arr){
            var str='<option value="0">Please select...</option>';
            for(i=0;i<arr.length;i++){
                var index = arr[i];
                str+='<option value="'+Approval_Option[index].value+'">'+Approval_Option[index].title+'</option>';
        
            }
            $('#Approval_Select').empty();
            $('#Approval_Select').append(str);
        },
        FormatData:function(dataset,oListItem){
            for(var i in dataset){
                var item = dataset[i];
                var Column = item.Col;
                var Value = item.Data;
                switch(item.TypeCol){
                    case 'singleline':
                                        Value = Value;
                                        break;
                    case 'multipleline':
                                        
                                    
                                        Value = Value;
                                        
                                        
                                        break;
                    case 'date':
                                        if(Value){
                                            Value = Value;
                                        }
                                        else{
                                            Value = null; 
                                        }
                                        
                                        
                                        break;
                    case 'people':
                                        if(Value){
                                            
                                            Value = Value.ID;
                                        }
                                        
                                        break;
                    case 'people_multiple':
                                        if(Value){
                                            
                                            Value = Value;
                                        }
                                        
                                        break;
                    case 'radio':
                                        if(Value){
                                            Value = Value;
                                        }
                                        break;
                    case 'checkbox':
                                        if(Value){
                                            Value = Value;
                                        }else{
                                            Value = false;
                                        }
                                        
                                        break;
                    
                
                }
                oListItem.set_item(Column,Value);      
            }
        },
    },
    Get:{
        ConfigData:function(){
            if(Form.FormMaster){
            
                // var FormMaster = FormMaster[Form.FormMaster];
    
                Form.Code = FormMaster[Form.FormMaster].Code;
                Form.FormName = FormMaster[Form.FormMaster].FormName;
                Form.FileName = FormMaster[Form.FormMaster].FileName;
                Form.List = FormMaster[Form.FormMaster].List;
                Form.Attachment = FormMaster[Form.FormMaster].Attachment;
                Form.LinkUrl = FormMaster[Form.FormMaster].LinkUrl;
                Form.RunningNO = FormMaster[Form.FormMaster].RunningNO;
                Form.FieldData = FormMaster[Form.FormMaster].FieldData;
                Form.Workflow = FormMaster[Form.FormMaster].Workflow;
                Form.FormStep = FormMaster[Form.FormMaster].FormStep;
            }else{
                Form.RoutingPage('PageNotFound.html'); // FormMethodTemplate
                return 0;
            }
        },
        FormData:function(query){
            //var query = '?$select=*&$filter=FormID eq \''+FormID+'\'';
            var data = GetItemByRestAPI(Form.List.Name,query);
            if(data){
                if(data.length > 0){
                    data = data[0];
                    if(data[workflow.name]){
                        var name = data[workflow.name];
                    
                        if(name.Description != 'Complete'){
                            var version =  FormMaster[MasterFormID].Workflow;
                            Workflow.CheckStatus(name , version); 
                    
                        }
                        for(var i in Form.FieldData){
                                var item = Form.FieldData[i];
                                var TempData = data[item.Col];
                                // Get and set data in element by item data
                                Form.FillData(item,TempData);   
                        }
                    }
                }
                else{

                    RoutingPage('PageItemNotFound.html');
                    return;
                }
                return data;
            }
        },
        Parameter:function(){
            Form.FormMaster = GetParameterByName('FormMaster');
            Form.FormID = GetParameterByName('FormID');
        },
        CurrentUser:function(){
            var userid = _spPageContextInfo.userId;
            var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
            var requestHeaders = { "accept" : "application/json;odata=verbose" };
            $.ajax({
                url : requestUri,
                contentType : "application/json;odata=verbose",
                headers : requestHeaders,
                async:false,
                success : function(data){
                    data = data.d;
                    CurrentUser.ID = data.Id;
                    CurrentUser.Name = data.Title;
                    CurrentUser.Email = data.Email;
                    CurrentUser.LoginName = data.LoginName;
                },
                error : function(err){
                    alert("error");
                }
            });
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
    HistoryLog:function(Status){
        if(Status == 'add'){
        
            var data = [{
                    ColumnName:null,
                    value:null,
                }];
    
            var comment = $('#CommentApproval').val();
            if(comment.length == 0){
                comment = '-';
            }
    
                data[0] = { ColumnName:'Role',          Value:$('#Permission').text()};
                data[1] = { ColumnName:'Action',        Value:$('#Approval_Select option:selected').text()};
                data[2] = { ColumnName:'Action_by',     Value:CurrentUser.Name};
                data[3] = { ColumnName:'DateTime',      Value:GetCurrentTime()};
                data[4] = { ColumnName:'Comment',       Value:comment};
                data[5] = { ColumnName:'FormID',        Value:FormID};
                
                var clientContext = new SP.ClientContext(SiteUrl);
                var oList = clientContext.get_web().get_lists().getByTitle(Disp_HistoryLog);
                var itemCreateInfo = new SP.ListItemCreationInformation();
                this.oListItem = oList.addItem(itemCreateInfo);
                var length = data.length;
                for(i=0;i<length;i++){
            
                    oListItem.set_item(data[i].ColumnName,data[i].Value);
                }            
                oListItem.update();	
                clientContext.executeQueryAsync(
                function(){
                    
                    console.log('Add log completed..');
                    
                },
                function(){
    
                    alert('add log error..');
                });
        }
        else if('get'){
            var query = '?$select=Action,Action_by,DateTime,Comment,FormID,Role&$top=100&$filter=FormID eq \''+Form.FormID+'\'&$orderby=Created asc';
            var data = GetItemByRestAPI(Disp_HistoryLog,query);
            if(data){
                $('#HistoryRow').empty();
                var str='';
                for(i=0;i<data.length;i++){
                    str+='<tr style="border-style:solid; border-width:1px; border-color:lightgray;">';
                    str+='  <td style="text-align:left; color:black;" colspan="1">'+data[i].Role+'</td>';
                    str+='  <td style="text-align:left; color:black;" colspan="1">'+data[i].Action+'</td>';
                    str+='  <td style="text-align:left; color:black;" colspan="1">'+data[i].Action_by+'</td>';
                    str+='  <td style="text-align:left; color:black;" colspan="1">'+data[i].DateTime+'</td>';
                    str+='  <td style="text-align:left; color:black;" colspan="1">'+data[i].Comment+'</td>';
                    str+='</tr>';
    
                }
                $('#HistoryRow').append(str);
            }
        }   
        else{
    
            console.log('History log status error...');
        }
    },
    Control:{
        Input:{
            PeoplePicker:function(ID){
                $('.modal-dialog').css('max-width','350px');
                var str='';
                str+='';
                str+='<div class="col-md-12" style="margin-bottom:30px; margin-left:auto; margin-right:auto;">';
                str+='    <div id="peoplePickerDiv"></div><br>';
                str+='<div class="row">';
                str+='    <div class="col-md-4 offset-md-2">';
                str+='    <button onclick="RetreiveInfoPerson(\''+ID+'\');" type="button" class="btn btn btn-primary btn-sm">Select</button>';
                str+='    </div>';
                str+='    <div class="col-md-4">';
                str+='    <button onclick="$(\''+ID+'\').val(\'\');$(\'#MainModal\').modal(\'hide\');" style="margin-left:0px;" type="button" class="btn btn btn-danger btn-sm">Remove</button>';
                str+='    </div>';
                str+='</div>';
                
               
                str+='</div>';
                $('#ModalBody').empty();
                $('#ModalBody').append(str);
                          
                initializePeoplePicker('peoplePickerDiv');
                registerPPOnChangeEvent($('#peoplePickerDiv'));
            
                
                $('#TitleModal').text('Search people..');
                $('#MainModal').modal('show');
            },
        },
        Button:{
            Init:function(){
                var Button = {
                    1:{
                        id:'#NavBarRefresh',
                        title:'Refresh',
                        onclick:'Form.Refresh();',
                    },
                    2:{
                        id:'#NavBarClose',
                        title:'Refresh',
                        onclick:'Form.Button.CloseForm();',
                    },
                    3:{
                        id:'#NavBarSave',
                        title:'Refresh',
                        onclick:'Form.SaveDraft();',
                    },
                    4:{
                        id:'#NavBarAttachment',
                        title:'Refresh',
                        onclick:'Form.Attachment();',
                    },
                    5:{
                        id:'#RightNavGoToTop',
                        title:'Go to top',
                        onclick:'Form.Button.GoToTop();',
                    },
                    6:{
                        id:'#RightNavGoToBottom',
                        title:'Go to bottom',
                        onclick:'Form.Button.GoToBottom();',
                    },
                    7:{
                        id:'#RightNavRefresh',
                        title:'Refresh',
                        onclick:'Form.Refresh();',
                    },
    
                };
        
                for(i in Button){
                    $(Button[i].id).attr('onclick',Button[i].onclick);
                }
            },
            CloseForm:function(){
                var flag = confirm('Do you want to exit this form ?');
                if(flag == true){
                    Form.Close();
                } 
             
            },
            GoToTop:function(){
                $('html, body').animate({scrollTop:0}, 1000);
            
            },
            GoToBottom:function(){
                // $('html').animate({scrollBottom:0}, 'slow');
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            },
        },
        Textarea:{

        },
        Checkbox:{

        },
        Radio:{

        },
        Select:{

        },
    },
    FormSubmit:{
        SubmitAction:function(){
                // disable submit button
                $('#SubmitAction').prop('disabled',true);


                var ActionTitle = $("#Approval_Select option:selected").text();
                Form.StatusAction = $('#Approval_Select').val();
                Form.FlagSubmit = true;
                if(Form.StatusAction != 0){
                    // $('#MainModal').modal('show');
                    // AddLoading();
                    // $('#TitleModal').text(ActionTitle);

                    TriggerTempData();

                    // Validate 
                    var FlagValidatePass = ValidateData(); // FormMethodTemplate
                    
                    if(FlagValidatePass == false){
                        return;
                    }
                
                    var StatusCreate = CheckUpdateOrCreate(ListData); // FormMethodTemplate
                    // $('#MainModal').modal('hide');
                    try{

                        switch(StatusCreate){   // FormMethodTemplate
                            case 'Create':
                                
                                
                                        CreateListItem(ListData,Form.FieldData); // FormMethodTemplate
                                    
                                        
                                    
                                    break;
                            case 'Update':
                                    
                                        UpdateListItem(ListData,Form.FieldData); // FormMethodTemplate
                                    
                                    break;
                        }

                    }catch(err){
                        
                        

                        Swal.fire({
                            type: 'error',
                            title: 'Oops... <br> Something went wrong!',
                            footer: 'Please contact your site admin for support.<br> error: \''+err+'\'',
                            
                            
                        });

                        $('#SubmitAction').prop('disabled',false);
                    }
                    
                }
                else{
                    alert('Please select any action..');
                    
                    // enable submit button
                    $('#SubmitAction').prop('disabled',false);
                }


                function CheckUpdateOrCreate(List){

                        var query ='?$select=FormID&$top=1&$filter=FormID eq \''+FormID+'\'';
                        var data = GetItemByRestAPI(List,query);
                        var status = '';
                        if(data){
                            if(data.length>0){
                                status = 'Update';
                            }
                            else{
                                status = 'Create';
                            }
                        }
                        else{
                            status = 'Create';
                        }
                    
                        return status;
                }
        },
        SubmitActionFinalFlag:function(Flag){
            if(Flag == true){

                UpdateFlagAttachment(); // FormMethodTemplate
                HistoryLog('add'); // FormMethodTemplate
                CloseForm(1); // FormMethodTemplate
        
            }else if(Flag == 'SaveDraft'){
                UpdateFlagAttachment(); // FormMethodTemplate
                // enable submit button
                $('#SubmitAction').prop('disabled',false);
            }else{
        
                // enable submit button
                $('#SubmitAction').prop('disabled',false);
        
            }
        },
        Validate:function(){
            var FormIndex = GetParameterByName('FormMaster');
            var FormConfig = FormMaster[FormIndex];
            var Setting = FormConfig['FormStep'];

            var texterror = '';
            var FlagPass = true;
            for(var i in Setting){
                if(Setting[i].FormStatus == Form.FormStatus){
                    for(var j in Setting[i].Validate){
                            var FieldValidate = Setting[i].Validate[j];
                            var require;
                            if(FieldValidate.Type == 'radio'){
                                if(!$("input[name='"+FieldValidate.ID+"']").is(':checked')) { 
                                    // checked an item
                                    texterror += FieldValidate.Title + '<br>';
                                    FlagPass = false;
                                    $("input[name="+FieldValidate.ID+"]:radio").parent().attr('style','color:red; margin-left:10px;');
                                    // $("input[name='"+FieldValidate.ID+"']").attr('style','border-color:red;');
                                }
                            }else{
                                require = $('#'+FieldValidate.ID).attr('require');
                            }
                            
                            if(require == 'true'){
                                switch(FieldValidate.Type){
                                    case 'text':
                                            var data = $('#'+FieldValidate.ID).val();
                                            if(!data){
                                                texterror += FieldValidate.Title + '<br>';
                                                FlagPass = false;
                                                $('#'+FieldValidate.ID).attr('style','border-color:red;');
                                                
                                            }
                                            
                                            break;
                                    case 'textarea':
                                            var data = $('#'+FieldValidate.ID).val();
                                            if(!data){
                                                texterror += FieldValidate.Title + '<br>';
                                                FlagPass = false;
                                                $('#'+FieldValidate.ID).attr('style','border-color:red;');
                                                
                                            }
                                            
                                            break;
                                    case 'date':
                                            var data = $('#'+FieldValidate.ID).val();
                                            if(!data){
                                                texterror += FieldValidate.Title + '<br>';
                                                FlagPass = false;
                                            
                                    
                                                $('#'+FieldValidate.ID).attr('style','border-color:red;text-align:center;');
                                            }
                                            break;
                                    case 'people':
                                            var data = $('#'+FieldValidate.ID).attr('title');
                                            if(!data){
                                                texterror += FieldValidate.Title + '<br>';
                                                FlagPass = false;
                                    
                                                $('#'+FieldValidate.ID).attr('style','border-color:red;text-align:center;');
                                            }
                                            break;
                                    case 'select':
                                            var data = $('#'+FieldValidate.ID).val();
                                            if(data == '-' || data == 'Please select...' || data == 'Please Select...'){
                                                texterror += FieldValidate.Title + '<br>';
                                                FlagPass = false;
                                                $('#'+FieldValidate.ID).attr('style','border-color:red;');
                                                
                                            }
                                            break;

                                }
            
                            }        
                    }
                    
                }
                
            }


            if(FlagPass == false){
                var str='';
                str = '<div style="color:red;">' + texterror + '</div>';
                $('#MainModal').modal('show');
                $('#TitleModal').text('Please insert data to require field.');
                $('#ModalBody').empty();
                $('#ModalBody').append(str);
                $('#SubmitAction').prop('disabled',false);
            }
            return FlagPass;
        },
    },
    TriggerTempData:function(){
        for(var i in Form.FieldData){

            var field = Form.FieldData[i];
        
                switch(field.TypeDom){
                    case 'text':
                                    field.Data = $('#'+field.ID).val();
                                    break;
                    case 'textarea':
                                    field.Data = $('#'+field.ID).val();
                                    break;
                    case 'date':
                                    var tempdata = $('#'+field.ID).val();

                                    if(tempdata){
                                        field.Data = $('#'+field.ID).val();
                                    }
                                    else{
                                        field.Data = '';
                                    }
                                    
                                
                                    break;

                    case 'label':
                                    field.Data = $('#'+field.ID).text();
                                
                                
                                    break;
                    case 'select':
                                    
                                    if(field.TypeCol == 'people'){  // in case select query from people 
                                        if($('#'+field.ID).val() != '-'){
                                            field.Data = {
                                                //ID: $('#'+field.ID).val(),
                                                ID: $('#'+field.ID + ' option').eq($('#'+field.ID).prop("selectedIndex")).val(),
                                                Title: $('#'+field.ID+' option:selected').text()
                                            }
                                        }
                                    
                                    }
                                    else{ // in case select query from normal text
                                        field.Data = $('#'+field.ID).val();
                                    }
                                    break;
                    case 'people':  
                                
                                    field.Data = {
                                        ID: $('#'+field.ID).attr('title'),
                                        Title: $('#'+field.ID).val()
                                    }
                                    

                                    break;
                    case 'people_multiple':  
                                
                                    if(field.Data){
                                        field.Data = Form.Set.People.data(field.Data);
                                    }
                    
                                    
                                    break;

                                    
                    case 'checkbox':
                                    if ($('#'+field.ID).is(":checked"))
                                    {
                                        field.Data = true;
                                    }
                                    else{
                                        field.Data = false;
                                    }
                                    break;
                    case 'var':
                                    field.Data = field.Data;
                    
                                    break;
                    case 'radio':
                                    field.Data = $('input[name='+field.ID+']:checked').val();
                                    if(!field.Data){
                                        field.Data = '';
                                    }
                    
                                    break;
                    case 'array':
                                    var tempdata = field.Data;
                                    field.Data = tempdata.toString();
                    
                                    break;

                    case 'summernote':

                                    field.Data = $('#'+field.ID).summernote('code');

                                    break;

                    case 'object':  
                                    var index = field.ID;
                                    var sum_str = '';
                                    if(index == 'T41' || index == 'T42' || index == 'T43' || index == 'T44' || index == 'T45'){
                                        for(loop=1;loop<=10 ;loop++){
                                            var TempID = index + '_Col' + loop;
                                            var type = $("#"+TempID).attr("type");
                                            var TempCheck;
                                            switch(type){
                                                case 'checkbox':

                                                                if ($('#'+TempID).is(":checked"))
                                                                {
                                                                    TempCheck = 'true';
                                                                }
                                                                else{
                                                                    TempCheck = 'false';
                                                                }
                                                                
                                                                sum_str += '['+TempID+'|'+TempCheck+'];';
                                                                
                                                                break;
                                                case 'text':
                                                                var TempData = $('#'+TempID).val();
                                                                sum_str += '['+TempID+'|'+TempData+'];';
                                                                

                                                                break;

                                            }
                                            
                                        }
                                        field.Data = sum_str;
                                    }
                                    else{
                                        for(loop=1;loop<=100;loop++){
                                            var TempID = index + '_Col' + loop;
                                            var TempData = $('#'+TempID).val();
                                            if(!TempData){
                                            
                                            }
                                            else{
                                                sum_str += '['+TempID+'|'+TempData+'];';
                                            }     
                                        }
                                        
                                        field.Data = sum_str;
                                    }
                                    
                                    break;
                
                } 
        }      
    },
    SaveDraft:function(){
        Form.TriggerTempData();
        var StatusCreate = CheckUpdateOrCreate(ListData);
        switch(StatusCreate){   
            case 'Create':

                        Form.SaveDraft.SaveByCreateListItem();
                        SaveByCreateListItem(ListData,TempCurrentData);
                        UpdateFlagAttachment(); 
                    break;
            case 'Update':

                        Form.SaveDraft.SaveByUpdateListItem();
                        SaveByUpdateListItem(ListData,TempCurrentData);
                        UpdateFlagAttachment(); 
                    break;
        }

        function SaveByCreateListItem(ListName,Object){

            var dataset = {};
            dataset = Object;
            var clientContext = new SP.ClientContext(SiteUrl);
            var oList = clientContext.get_web().get_lists().getByTitle(ListName);
            var itemCreateInfo = new SP.ListItemCreationInformation();
            this.oListItem = oList.addItem(itemCreateInfo);
            SetPropertiesForm(oListItem,'Create');
            oListItem.set_item('FormStatus','Save Draft');
            oListItem.set_item('RunningNO','Draft');
            oListItem.set_item('FlagSubmit',false);
            SetFormatData(dataset,oListItem); // set item all object by this action
            oListItem.update();	
            clientContext.executeQueryAsync(
            function(){
        
                $('#MainModal').modal('hide');
        
                Swal.fire(
                    'Save as draft completely',
                    'Click for continue',
                    'success',
                    {
                        timer: 1500
                    }
                ).then((result) => {
        
                    if(result.value){
                        SubmitActionFinalFlag('SaveDraft');
                    }
        
                });
                
                
        
                // $('#ModalBody').empty();
                // $('#ModalBody').append('<p style="text-align:center;">Successfully...<p>');
                
            },
            function(sender, args){
        
                $('#MainModal').modal('hide');
        
                Swal.fire({
                    type: 'error',
                    title: 'Oops... <br>Something went wrong! can not save as draft',
                    footer: 'Please contact your site admin for support.',
                   
                    
                });
        
                SubmitActionFinalFlag(false);
                // $('#ModalBody').empty();
                // $('#ModalBody').append('<p style="text-align:center; color:red;">Create list item error...<p>');
                // alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
               
            }
        
            );
        
        }

        function SaveByUpdateListItem(ListName,Object){

            var dataset = Object ;
            var ItemID;
            var query = '?$select=ID&$filter=FormID eq \''+FormID+'\'';
            var data = GetItemByRestAPI(ListName,query);
            if(data){
                ItemID = data[0].ID;
            }
        
            var clientContext = new SP.ClientContext(SiteUrl);
            var oList = clientContext.get_web().get_lists().getByTitle(ListName);
            this.oListItem = oList.getItemById(ItemID);
            SetPropertiesForm(oListItem,'Update');
            oListItem.set_item('FormStatus','Save Draft');
            oListItem.set_item('RunningNO','Draft');
            oListItem.set_item('FlagSubmit',false);
            SetFormatData(dataset,oListItem); // set item all object by this action
        
            oListItem.update();	
            clientContext.executeQueryAsync(function(){
        
                
                // $('#ModalBody').empty();
                // $('#ModalBody').append('<p style="text-align:center;">Save Successfully...<p>');
                // $('#MainModal').modal('hide');
                Swal.fire(
                    'Save as draft completely',
                    'Click for continue',
                    'success',
                    {
                        timer: 1500
                    }
                ).then((result) => {
        
                    if(result.value){
                        SubmitActionFinalFlag('SaveDraft');
                    }
        
                });
        
            }, function(){
        
                $('#MainModal').modal('hide');
        
                Swal.fire({
                    type: 'error',
                    title: 'Oops... <br>Something went wrong! can not save as draft',
                    footer: 'Please contact your site admin for support.',
                    
                    
                });
        
                SubmitActionFinalFlag(false);
        
            });
        
        }

        
    },
    Create:function(ListName,Object){
        var dataset = {};
        dataset = Object;
        var clientContext = new SP.ClientContext(SiteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(ListName);
        var itemCreateInfo = new SP.ListItemCreationInformation();
        this.oListItem = oList.addItem(itemCreateInfo);
        SetPropertiesForm(oListItem,'Create');
        SetFormatData(dataset,oListItem); // set item all object by this action
        oListItem.update();	
        clientContext.executeQueryAsync(
        function(){
    
            $('#MainModal').modal('hide');
    
            Swal.fire(
                'Submit Successfully',
                'Click for continue',
                'success',
                {
                    timer: 1500
                }
            ).then((result) => {
    
                if(result.value){
                    SubmitActionFinalFlag(true);
                }
    
            });
            
            
    
            // $('#ModalBody').empty();
            // $('#ModalBody').append('<p style="text-align:center;">Successfully...<p>');
            
        },
        function(sender, args){
    
            $('#MainModal').modal('hide');
    
            Swal.fire({
                type: 'error',
                title: 'Oops... <br> Something went wrong!',
                footer: 'Please contact your site admin for support.',
               
                
            });
    
            SubmitActionFinalFlag(false);
            // $('#ModalBody').empty();
            // $('#ModalBody').append('<p style="text-align:center; color:red;">Create list item error...<p>');
            // alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
           
        }
    
        );
    },
    Update:function(ListName,Object){
        var dataset = Object ;
        var ItemID;
        var query = '?$select=ID&$filter=FormID eq \''+FormID+'\'';
        var data = GetItemByRestAPI(ListName,query);
        if(data){
            ItemID = data[0].ID;
        }
    
        var clientContext = new SP.ClientContext(SiteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(ListName);
        this.oListItem = oList.getItemById(ItemID);
        SetPropertiesForm(oListItem,'Update');
        SetFormatData(dataset,oListItem); // set item all object by this action
        oListItem.update();	
        clientContext.executeQueryAsync(function(){
    
            
            // $('#ModalBody').empty();
            // $('#ModalBody').append('<p style="text-align:center;">Save Successfully...<p>');
            $('#MainModal').modal('hide');
            Swal.fire(
                'Submit Successfully',
                'Click for continue',
                'success',
                {
                    timer: 1500
                }
            ).then((result) => {
    
                if(result.value){
                    SubmitActionFinalFlag(true);
                }
    
            });
    
        }, function(){
    
            $('#MainModal').modal('hide');
    
            Swal.fire({
                type: 'error',
                title: 'Oops... <br> Something went wrong!',
                footer: 'Please contact your site admin for support.',
                
                
            });
    
            Form.FormSubmit.SubmitActionFinalFlag(false);
    
        });
    },
    Delete:function(){
        // Get ID Form by FormID
        var query = '?$select=ID&$top=1&$filter=FormID eq \''+FormID+'\'';
        var data = GetItemByRestAPI(ListData, query);
        if(data){
            Form.Query.Delete(Form.List.Name,data[0].ID);
        }
    },
    Query:{
        Create:function(){

        },
        Update:function(){
            
        },
        Delete:function(ListName,ItemID){
            var status = false;
            var flag = confirm('Do you want to delete this item ?');
            if(flag == true){
                    var clientContext = new SP.ClientContext(SiteUrl);
                    var oList = clientContext.get_web().get_lists().getByTitle(ListName);
                    this.oListItem = oList.getItemById(ItemID);
                    oListItem.deleteObject();
                    clientContext.executeQueryAsync(function(){
                    alert('Remove complete');
                        status = true;
                        window.location.href = SiteUrl;
                    
                    
                    },function(){
                        console.log('Remove Item Error');
                
                    });
                
            }
        },

    },
    
    
}




function FormStart(){
    
    Form.Get.Parameter();
    Form.Get.CurrentUser();
    Form.Add.ToGroupMember();
    Form.Get.ConfigData();
    Form.Map();
    Form.Routing();
    Form.Render.Navbar();
    Form.Render.RightNavbar();
    Form.Render.Approval();
    Form.Render.HistoryLog();
    Form.Render.Modal();
    Form.Render.View();
    Form.Init.css();
    Form.Button.Init();
    Form.Set.Initial();
    Form.Set,RequireField();
    // $('#Title_ActionBy').text(CurrentUser.Name);
}

