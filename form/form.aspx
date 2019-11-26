<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ Page Language="C#" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" x-undefined="" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SP Form Setup</title>
<SharePoint:CssRegistration Name="default" runat="server" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=10; IE=9; IE=8; IE=7" />

<!-- <script src="/_layouts/1033/init.js"></script> -->

<!-- <script src="/_layouts/sp.core.js"></script> -->



<script type="text/javascript" src="js/MicrosoftAjax.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>
<!-- <script type="text/javascript" src="/_layouts/15/sp.core.js"></script> -->
<!-- <script type="text/javascript" src="/_layouts/15/clienttemplates.js"></script>
<script type="text/javascript" src="/_layouts/15/clientforms.js"></script>
<script type="text/javascript" src="/_layouts/15/clientpeoplepicker.js"></script>
<script type="text/javascript" src="/_layouts/15/autofill.js"></script>
<script type="text/javascript" src="/_layouts/15/1033/sts_strings.js"></script> -->

<!-- SharePoint -->
<script src="js/PeoplePickerData.js"></script>

<!-- Library -->
<link rel="stylesheet" href="../lib/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="../lib/jquery/css/jquery-ui.css">
<link rel="stylesheet" href="../lib/summernote/dist/summernote.css">
<script src="../lib/jquery/js/jquery.min.js"></script>
<script src="../lib/GlibFunc/GlibFunc.js"></script>
<script src="../lib/bootstrap/js/popper.min.js"></script>
<script src="../lib/bootstrap/js/bootstrap.min.js"></script>
<script src="../lib/summernote/dist/summernote.js"></script>
<script src="../lib/jquery/js/jquery-ui.js"></script>


<!-- Config.js -->
<script src="../config/site.config.js"></script>
<script src="../config/user.config.js"></script>
<script src="../config/connection.config.js"></script>
<script src="../config/form.config.js"></script>
<script src="../config/app.config.js"></script>

<!-- Local -->
<link rel="stylesheet" href="css/form.css">
<script src="../lib/GlibFunc/GlibFunc.js"></script>
<script src="js/workflow.js"></script>
<script src="js/Form.js"></script>
<script src="js/attachment.js"></script>
<script src="js/main-form.js"></script>
 <!-- <script src="../app/js/Log.js"></script> -->



<!-- CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.js"></script> <!-- Optional: include a polyfill for ES6 Promises for IE11 and Android browser -->



<!-- Data Table -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>

</head>

<body>
    <form id="form1" runat="server">
        <SharePoint:FormDigest runat="server"></SharePoint:FormDigest>
    </form>
    
    <div id="PageBody" class="container border-shadow">
            <center><div style="margin-top:15%; margin-bottom:15%;" class="loader"></div></center>
            <div id="Navbar"></div>
            <div id="Content"></div>
            <div id="Approval"></div>
            <div id="HistoryLog"></div>
    </div>
        
</body>

   

</html>
