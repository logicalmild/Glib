

function AddLoading(){
    
    $('#ModalBody').empty();
    $('#TitleModal').text('Loading...');
    var loading ='<center><div class="loader" style="margin-top:15%; margin-bottom:15%;"></div></center>';
    $('#ModalBody').append(loading);
}

function RetreiveInfoPerson(ID){
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
        //ApproverID =  currentUser.get_id();
        EmpID = currentUser.get_id();;
        $(ID).attr('title',EmpID);
        $(ID).val(EmpName);
    
        }

        function onRequestFailed(sender, args) {
            //error handling
            alert('Error: ' + args.get_message());
        }
    }
    
    $('#MainModal').modal('hide');
}


function SetFormAction(){

    var index = GetParameterByName('FormMaster');
    for(var i in FormMaster[index]){
        switch(i){
            case 'FormStep':
                            var item = FormMaster[index][i];
                           
                            for(var j in item){
                                if(Form.FormStatus == item[j].FormStatus){
                                    
                                    var Record = item[j];
                                    
                                    var StatusAction = Record.StatusAction;
                                    
                                    var str='<option value="0">Please select...</option>';
                                    for(var k in StatusAction){
                                      
                                        str+='<option value="'+k+'">'+StatusAction[k]+'</option>';

                                    }
                                    $('#Approval_Select').empty();
                                    $('#Approval_Select').append(str);
                              
                                }
                            }
                            break;
        }
    }
}
function SetPropertiesForm(oListItem,Status){
    switch(Status){
        case 'Create':
                        var index = GetParameterByName('FormMaster');
                        // var LinkForm = SiteUrl + '/SitePages/'+FormMaster[index].FormName+'.aspx?FormMaster='+ index +'&FormID=' + FormID;
                        var LinkForm = SiteUrl + '/SitePages/index.aspx?Page='+FormMaster[index].FormName+'&FormMaster='+ index +'&FormID=' + FormID;
                        var TagLink = '<a target="_blank" href="'+LinkForm+'">View</a>';

                        oListItem.set_item('View',TagLink);
                        oListItem.set_item('FormID',FormID);
                        oListItem.set_item('RunningNO',GenDocNo('DocNo'));
                        oListItem.set_item('Year',GenDocNo('Year'));
                        oListItem.set_item('Month',GenDocNo('Month'));
                        
                        
                        break;
        case 'Update': 
                        
                        break;


    }
    oListItem.set_item('StatusAction',Form.StatusAction);
    oListItem.set_item('FormStatus',Form.FormStatus);
    oListItem.set_item('FlagSubmit',Form.FlagSubmit);
  
}
function SetRequireField(){
    
    $('.MarkRequired').remove();

    var FormIndex = GetParameterByName('FormMaster');
    var FormConfig = FormMaster[FormIndex];
    var Setting = FormConfig['FormStep'];
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
}
function SetRequireFieldByAction(ActionID,FieldID,TypeDom,Title,Condition){
    var data = $('#' + ActionID).val();
    if(data){
        if(data == Condition){
            var FormIndex = GetParameterByName('FormMaster');
            var FormConfig = FormMaster[FormIndex];
            var Setting = FormConfig['FormStep'];
            for(var i in Setting){
         
                if(Setting[i].FormStatus == Form.FormStatus){
                   var ObjField = Setting[i].Validate;
                        Objlength = Object.keys(ObjField).length;
                        ObjField['field' + (Objlength + 1)] = {
                            Title:Title,
                            ID:FieldID,
                            Type:TypeDom
                        };      
                }
            }    
            SetRequireField();
        }else{

            var FormIndex = GetParameterByName('FormMaster');
            var FormConfig = FormMaster[FormIndex];
            var Setting = FormConfig['FormStep'];
            for(var i in Setting){
         
                if(Setting[i].FormStatus == Form.FormStatus){
                    var ObjField = Setting[i].Validate;
                    for(var j in Setting[i].Validate){
                        var FieldValidate = Setting[i].Validate[j];

                        if(FieldValidate.ID == FieldID){
                            
                            delete ObjField[j];
                            
                        }
                    }
                }
            }    


            SetRequireField();
        }
    }

}
function RoutingPage(Page){

    $('title').text(Form.FormName);
    $('#PageBody').empty();
    var response;
        $.ajax({ type: "GET",   
            url: SiteUrl + "/SitePages/web/component/Page/"+Page,   
            async: false,
            success : function(text)
            {
                response= text;
            }
        });
      
    $('#PageBody').append(response);

    $('.loader').remove();
}
function CheckStatusWorkflow(value,version){

    if(version == '2013'){
        if(value.Description != 'Complete'){
            pagename = 'PageWorkflowInprogress.html';
            RoutingPage(pagename);
            
            
        }
    }
    else{
        if(value != '5'){
            var pagename = 'PageWorkflowInprogress.html';
            switch(value){
                case '1':
                            pagename = 'PageWorkflowFailedOnStart.html';
                            break;
                case '2':
                            pagename = 'PageWorkflowInprogress.html';
                            break;
                case '3':   
                            pagename = 'PageWorkflowErrorOccurred.html';
                            break;
                case '4':
                            pagename = 'PageWorkflowCancelled.html';
                            break;
                case '6':
                            pagename = 'PageWorkflowFailedOnStartRetry.html';
                            break;
                case '7':
                            pagename = 'PageWorkflowErrorOccurredRetry.html';
                            break;
                
                
            }
                RoutingPage(pagename);
    }
    
        
    }
    return;
}

function CheckMemberGroup(GroupID){

    var clientContext = new SP.ClientContext(SiteUrl);
    var collGroup = clientContext.get_web().get_siteGroups();
    var oGroup = collGroup.getById(GroupID);
    this.collUser = oGroup.get_users();
    clientContext.load(collUser);


    clientContext.executeQueryAsync(function(){

        var userInfo = '';
        var userEnumerator = collUser.getEnumerator();
        var CountUser = collUser.get_count();
    
        var TempUserIDArr = [];
        while (userEnumerator.moveNext()) {
            var oUser = userEnumerator.get_current();
            userInfo += '\nUser: ' + oUser.get_title() + 
                '\nID: ' + oUser.get_id() + 
                '\nEmail: ' + oUser.get_email() + 
                '\nLogin Name: ' + oUser.get_loginName();
                
                TempUserIDArr.push(oUser.get_id());

        }

        if(TempUserIDArr.indexOf(CurrentUser.ID) == -1){
            AddCurrentUserToGroup(GroupMember);
        }else{
           // alert('User is in group');
        }

    

    }, function(){


        alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());

    });
    
}


function CurrentRole(Role,TitleRole){
                   
               
    if(TitleRole == 'Visitor'){
        
        Disable_Panel('All');
        $('#Permission').text('Visitor');
        //hide button remove right nav
        $('#RemoveCurrentForm , #btnSaveDraft').hide();
        
    }
    else{

        $('#Permission').text(TitleRole);
    }
}

function Disable_Panel(PartID){
    
    if(PartID == 'All'){

        $('#Permission').text('Visitor');
        $('body *').attr('readonly', true);
        $('body *').css('cursor', 'no-drop');
        $('body *').on('mousedown', function(e) {
                e.preventDefault();
                this.blur();
                window.focus();
        });
        $('body').removeAttr('onclick');
        $('#Approval').hide();

    }else{
        
        $('#'+PartID+' *').attr('readonly', true);
        $('#'+PartID+' *').css('cursor', 'no-drop');
        $('#'+PartID+' *').on('mousedown', function(e) {
                e.preventDefault();
                this.blur();
                window.focus();
        });
        $('#'+PartID+' *').removeAttr('onclick');

    }    
}

function RenderView(data){
    if(data){

        if(CurrentUser.Permission == 'Admin'){

        }else{
            $('.ms-cui-tts,#RibbonContainer-TabRowRight,#O365_MainLink_Settings,#O365_MainLink_Help,#Sites_BrandBar').slideUp(2000);
        }

        
        
        
       
        SetFormAction(); // FormMethodTemplate
            
        // Set top right info
        $('#DocNO').text(data.RunningNO);
        $('#CreateDate').text(ConvertDate(data.Created)); 
        $('#FormStatus').text(data.FormStatus);
        $('#CreatedBy').text(data.Author.Title);

        // Map Current view according to FormView in config.js
        // Form.FormView = FormMaster[MasterFormID].FormStep[Form.FormStatus].FormView;
        Form.FormStatus = data.FormStatus;
        Form.FormView = FormMaster[MasterFormID].FormStep[Form.FormStatus].FormView;
  
        if(Form.FormView){
            SwitchViewTo(Form.FormView,data);
        }
        else{
            Disable_Panel('All');
        }

    }
}

function RenderFormNew(){
    // set panel status 
    if(CurrentUser.Permission == 'Admin'){

    }else{
        
        $('.ms-cui-tts,#RibbonContainer-TabRowRight,#O365_MainLink_Settings,#O365_MainLink_Help,#Sites_BrandBar').slideUp(2000);
    
    }
    
    $('#DocNO').text('-');
    $('#CreateDate , #RequestDate').text(SetDateTime()); 
    $('#FormStatus').text('Create');
    $('#CreatedBy').text(CurrentUser.Name);
    
    SetFormAction(); // FormMethodTemplate

    // Set Panel People end of section 1
    $('#Requestor').val(CurrentUser.Name);
    $('#Requestor').attr('title',CurrentUser.ID);
    // End Set Panel People end of section 1

    // Disable part 2 exclude admin 
    if(CurrentUser.Permission == 'Admin'){
        $('#Permission').text('Admin'); 
    }
    else{ // not admin
        $('#Permission').text('Requestor');
      
    }  
}



function SetFieldFormMaster(ConnectionID,DomID,TypeDom){
    switch(TypeDom){
        case 'select':
                        var data = DataConnection(ConnectionID);
                        var str='';
                        if(data){

                            var value = data[0].Value;
                            value = value.split(',');
                            if(value){
                                str+='<option value="-">Please Select...</option>';
                                for(i=0;i<value.length;i++){
                                    str+='<option value="'+value[i]+'">'+value[i]+'</option>';
                                } 
                                $('#' + DomID).empty();
                                $('#' + DomID).append(str);  
                            }
                            
                        }
                        break;
    }
    
}