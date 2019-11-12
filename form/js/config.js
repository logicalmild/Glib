//Form Master////////////////////////////////////////////////////////////////////
var FormMaster = {};

FormMaster[0] = {
    FormID :'0',
    FormName :'FormDataChemicals',
    FileName :'FormDataChemicals',
    Listname :'Data Chemicals',
    ListInternalName:'DataChemicals',
    LinkAfterCloseForm: SiteUrl+'/SitePages/index.aspx?Page=DataChemicals',
    RunningNO:{
        Enable:true,
        FormatRunningNO:'DC-',
    },
    FieldData:{
        'field1':{
            ID:'summernote1',
            Title:'Comment',
            TypeDom:'summernote',
            TypeCol:'multipleline',
            Data:'',
            Col:'Comment'
        },              
        'field2':{
            ID:'Title',
            Title:'Title',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Title'
        },              
    },
    Workflow:{
        name:'-',
        version:'2013'
    },
    FormStep:{
        'Create':{
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
            Validate:{
                // field1:{
                //     Title:'',
                //     ID:'',
                //     Type:''
                // },                     
            },

        },
        'Save Draft':{
            FormStatus:'Save Draft',
            FormView:'Save Draft',
            StatusAction:{
                Submit:'Submit',
            },
            Nav:{
                TopNav:{
                    CloseForm:true,
                    Refresh:true,
                    Attachfile:false,
                    SaveDraft:true,
                },
                RightNav:{
                    CloseForm:true,
                    Attachfile:false,
                    SaveDraft:true,
                    RemoveItem:false,
                    Refresh:true
                },
            },
            Validate:{
                // field1:{
                //     Title:'',
                //     ID:'',
                //     Type:''
                // },           
                          
            },

        },
        'Close':{
            FormStatus:'Close',
            FormView:'Close',
            StatusAction:{

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
            Validate:{         
            },

        },
   
    }
};
FormMaster[1] = {
    FormID :'1',
    FormName :'FormUsageChemicals',
    FileName :'UsageChemicals',
    Listname :'Usage Chemicals',
    ListInternalName:'UsageChemicals',
    LinkAfterCloseForm: SiteUrl+'/SitePages/index.aspx?Page=UsageChemicals',
    RunningNO:{
        Enable:true,
        FormatRunningNO:'DC-',
    },
    FieldData:{
        'field1':{
            ID:'summernote1',
            Title:'Comment',
            TypeDom:'summernote',
            TypeCol:'multipleline',
            Data:'',
            Col:'Comment'
        },              
        'field2':{
            ID:'Title',
            Title:'Title',
            TypeDom:'text',
            TypeCol:'singleline',
            Data:'',
            Col:'Title'
        },              
    },
    Workflow:{
        name:'-',
        version:'2013'
    },
    FormStep:{
        'Create':{
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
            Validate:{
                // field1:{
                //     Title:'',
                //     ID:'',
                //     Type:''
                // },                     
            },

        },
        'Save Draft':{
            FormStatus:'Save Draft',
            FormView:'Save Draft',
            StatusAction:{
                Submit:'Submit',
            },
            Nav:{
                TopNav:{
                    CloseForm:true,
                    Refresh:true,
                    Attachfile:false,
                    SaveDraft:true,
                },
                RightNav:{
                    CloseForm:true,
                    Attachfile:false,
                    SaveDraft:true,
                    RemoveItem:false,
                    Refresh:true
                },
            },
            Validate:{
                // field1:{
                //     Title:'',
                //     ID:'',
                //     Type:''
                // },           
                          
            },

        },
        'Close':{
            FormStatus:'Close',
            FormView:'Close',
            StatusAction:{

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
            Validate:{         
            },

        },
   
    }
};



var Config = {
    Site:{
        Url:'',
        Name:'',
    },
    List:{
        1:{
            DisplayName:'',
            InternalName:'',
            Description:'',
        }
    },
    Attachment:{
        List:'',
        FileSupport:{
            'All':true,
            
        }
    },
    Library:{},
    Group:{},
    Log:{},
    CurrentUser:{},
    Connection:{},
    Form:{
        ID:'',
        Name:'',
        Filename:'',
        Listname:'',
        ListInternalName:'',
        RunningNO:{
            Enable:false,
            FormatRunningNO:'-',
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
            Name:'',
            Version:'2013',
        },
        FormStep:{
            1:{
                FormStatus:'',
                FormView:'',
                StatusAction:{
                    Submit:'Submit',
                },
                Nav:{
                    Enable:true,
                    TopNav:{
                        CloseForm:true,
                        Refresh:true,
                        Attachfile:false,
                        SaveDraft:false,
                    },
                    RightNav:{
                        CloseForm:true,
                        Attachfile:false,
                        SaveDraft:true,
                        RemoveItem:false,
                        Refresh:true,
                    }
                }
            },
            RequireField:{
                1:{
                    Title:'',
                    Elem:'',
                    Type:'',
                }
            }
        }
    }
}