var Workflow = {
    CheckStatus:function(value,version){
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
    },
};