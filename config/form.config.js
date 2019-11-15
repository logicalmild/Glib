//Form Master////////////////////////////////////////////////////////////////////
var FormMaster = {};

FormMaster[0] = {
    Code :'',
    FormName :'FormDataChemicals',
    FileName :'FormDataChemicals',
    List:{
        Name:'Data Chemicals',
        Internal:'DataChemicals',
    },
    Attachment:{

    },
    LinkUrl:{
        AfterCloseForm: SiteUrl,
    },
    RunningNO:{
        Enable:true,
        FormatRunningNO:'DC-',
    },
    FieldData:{
        1:{
            Element:'',
            Title:'',
            TypeDom:'',
            TypeCol:'',
            Data:'',
            Column:'',
        }             
    },
    Workflow:{
        SPDesigner:{
            Enable:true,
            name:'-',
            version:'2013',
        },
        FormIntegrate:{
            Enable:false,
            name:'-',
            version:'2013',
            Step:{
                1:{
                    StepCode:'',
                    Title:'',
                    FormStatus:'',
                    Submitter:'',
                    Approver:'',
                    Condition:null,
                    Mail:{
                        Enable:false,
                        MailID:null,
                        MailTo:null,
                        MailCC:null,
                        Subject:null,
                        Body:null,
                    },
                    NextStep:2,
                    NextStepTitle:'',
                },
            }
        },
        
    },
    FormStep:{
        1:{
            FormStatus:'Create',
            FormView:'Create',
            StatusAction:{
                Submit:'Submit',
            },
            Nav:{
                TopNav:{
                    CloseForm:true,
                    Refresh:true,
                    Attachfile:false,
                    SaveDraft:false,
                },
                RightNav:{
                    CloseForm:true,
                    Attachfile:false,
                    SaveDraft:false,
                    RemoveItem:false,
                    Refresh:true
                },
            },
            RequireField:{
                // 1:{
                //     Title:'',
                //     Elem:'',
                //     Type:'',
                // }                    
            },

        },
    }
};

