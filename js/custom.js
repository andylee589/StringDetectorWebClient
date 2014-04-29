/**
 * Created by t_yuejial on 4/28/2014.
 */
// DO NOT REMOVE : GLOBAL FUNCTIONS!
// gloable varaiable
var  oTable;
var  jobsDto;
var  jobsMap={};
var  expandProjectInfoIcon='#expand-project-info-icon-';
var  collapseProjectInfoIcon='#collapse-project-info-icon-';
var  editProjectInfoIcon='#edit-project-info-icon-';
var  saveProjectInfoIcon='#save-project-info-icon-';
var expandProjectConfigIcon='#expand-project-config-icon-';
var collapseProjectConfigIcon='#collapse-project-config-icon-';
var editProjectConfigIcon='#edit-project-config-icon-';
var uploadProjectConfigIcon='#upload-project-config-icon-';
var expandProjectReportIcon='#expand-project-report-icon-';
var collapseProjectReportIcon='#collapse-project-report-icon-';
var downloadProjectIcon='#download-project-report-icon-';

var projectInfoForm= "#project-info-form-";
var editProjectInfo="#edit-project-info-";
var viewProjectInfo="#view-project-info-";

var projectConfigForm="#project-configuration-form-";
var projectReortForm="#project-report-form-";
var expandJobRow="#expand-job-row-";
var editProjectName="#editProjectName";
var editSourcePath="#editSourcePath";
var viewProjectInfo="#view-project-info-";
var viewProjectName="#viewProjectName";
var viewSourcePath="#viewSourcePath";
var projectConfig="#project-config";
var projectReport="#project-report";

/*initialize the datatable*/
function loadJobs(jobs){
    // use the fake data
    var  jobRecords=[];
    var actionStr = '<div class="btn-group" data-toggle="buttons"><label class="btn btn-default btn-xs active"><input type="radio" name="style-a1" id="style-a1"> <i class="fa fa-play"></i></label><label class="btn btn-default btn-xs"><input type="radio" name="style-a2" id="style-a2"> <i class="fa fa-pause"></i></label><label class="btn btn-default btn-xs"><input type="radio" name="style-a2" id="style-a3"> <i class="fa fa-stop"></i></label></div>';

    $.each(jobs,function(i,job){
        var record = [];
        registJobFormListener(job.JobNumber);
        record.push(job.JobNumber);
        record.push(job.ProjectName);
        record.push(job.JobState.JobStatus);
        record.push(actionStr);
        jobRecords.push(record);
        jobsMap[job.JobNumber]=job;
    })

    oTable= $('#dt_basic').dataTable({
        "sPaginationType" : "bootstrap_full",
        "aaData": jobRecords
    });
}



// regist action listener
function registJobFormListener(jobNumber){
    // project info  
    $(document).delegate(expandProjectInfoIcon+jobNumber,'click',expandProjectInfoClick);
    $(document).delegate(collapseProjectInfoIcon+jobNumber,'click',collapseProjectInfoClick);
    $(document).delegate(editProjectInfoIcon+jobNumber,'click',editProjectInfoClick);
    $(document).delegate(saveProjectInfoIcon+jobNumber,'click',saveProjectInfoClick);

    // project config
    $(document).delegate(expandProjectConfigIcon+jobNumber,'click',expandProjectConfigClick);
    $(document).delegate(collapseProjectConfigIcon+jobNumber,'click',collapseProjectConfigClick);
    $(document).delegate(editProjectConfigIcon+jobNumber,'click',editProjectConfigClick);
    $(document).delegate(uploadProjectConfigIcon+jobNumber,'click',saveProjectConfigClick);

    // project report
    $(document).delegate(expandProjectReportIcon+jobNumber,'click',expandProjectReportClick);
    $(document).delegate(collapseProjectReportIcon+jobNumber,'click',collapseProjectReportClick);
    $(document).delegate(downloadProjectIcon+jobNumber,'click',downloadProjectReportClick);

}


// action listener of project info
function collapseProjectInfoClick(){
    var spiltArray = $(this).attr("id").split("-");
    var jobNumber = spiltArray[spiltArray.length-1];
    $(projectInfoForm+jobNumber+" fieldset").slideToggle(500);
    var expandSpan = $(expandProjectInfoIcon+jobNumber);
    $(this).hide();
    expandSpan.show();

}


function expandProjectInfoClick(){
    var spiltArray = $(this).attr("id").split("-");
    var jobNumber = spiltArray[spiltArray.length-1];
    $(projectInfoForm+jobNumber+" fieldset").slideToggle(500);
    var expandSpan = $(collapseProjectInfoIcon+jobNumber);
    $(this).hide();
    expandSpan.show();
}

function editProjectInfoClick(){
    var spiltArray = $(this).attr("id").split("-");
    var jobNumber = spiltArray[spiltArray.length-1];
    // check the collapse-expand state
    if( $(projectInfoForm+jobNumber+" fieldset").is(":hidden")){
        $(projectInfoForm+jobNumber+" fieldset").slideToggle(500);
        $(expandProjectInfoIcon+jobNumber).hide();
        $(collapseProjectInfoIcon+jobNumber).show();
    }
    // toggle the edit-view state
    $(editProjectInfo+jobNumber).show();
    $(viewProjectInfo+jobNumber).hide();

    // toggle the edit-save icon

    $( editProjectInfoIcon+jobNumber).hide();
    $(saveProjectInfoIcon+jobNumber).show();

    // paste the exsisting content into input filed
    var projectName = $(viewProjectName+jobNumber).html();
    var sourcePath = $(viewSourcePath+jobNumber).html();
    $(editProjectName+jobNumber).val(projectName);
    $(editSourcePath+jobNumber).val(sourcePath);


}

function saveProjectInfoClick(){
    var spiltArray = $(this).attr("id").split("-");
    var jobNumber = spiltArray[spiltArray.length-1];
    // toggle the edit-view state
    $(editProjectInfo+jobNumber).hide();
    $(viewProjectInfo+jobNumber).show();

    // toggle the edit-save icon
    $(editProjectInfoIcon+jobNumber).show();
    $(saveProjectInfoIcon+jobNumber).hide();

    // paste the exsisting content into input filed
     var projectName=$(editProjectName+jobNumber).val();
     var sourcePath =$(editSourcePath+jobNumber).val();
     $(viewProjectName+jobNumber).html(projectName);
     $(viewSourcePath+jobNumber).html(sourcePath);

    // use ajax to put the change and update the jobsmap and oTable Data in success callback


}

// action listener of project configuration
function collapseProjectConfigClick(){
    var spiltArray = $(this).attr("id").split("-");
    var jobNumber = spiltArray[spiltArray.length-1];
    $(projectConfigForm+jobNumber+" fieldset").slideToggle(500);
    var expandSpan = $(expandProjectConfigIcon+jobNumber);
    $(this).hide();
    expandSpan.show();
}


function expandProjectConfigClick(){
    var spiltArray = $(this).attr("id").split("-");
    var jobNumber = spiltArray[spiltArray.length-1];
    $(projectConfigForm+jobNumber+" fieldset").slideToggle(500);
    var expandSpan = $(collapseProjectConfigIcon+jobNumber);
    $(this).hide();
    expandSpan.show();
}

function editProjectConfigClick(){
    alert("it works");
}

function saveProjectConfigClick(){
    alert("it works");
}


// action listener of project report
function collapseProjectReportClick(){
    var spiltArray = $(this).attr("id").split("-");
    var jobNumber = spiltArray[spiltArray.length-1];
    $(projectReortForm+jobNumber+" fieldset").slideToggle(500);
    var expandSpan = $(expandProjectReportIcon+jobNumber);
    $(this).hide();
    expandSpan.show();
}


function expandProjectReportClick(){
    var spiltArray = $(this).attr("id").split("-");
    var jobNumber = spiltArray[spiltArray.length-1];
    $(projectReortForm+jobNumber+" fieldset").slideToggle(500);
    var expandSpan = $(collapseProjectReportIcon+jobNumber);
    $(this).hide();
    expandSpan.show();
}

function downloadProjectReportClick(){
    alert("it works");
}

function  expandableRowClick(){
    var nTr = $(this)[0];
    if ( oTable.fnIsOpen(nTr) )
    {
        /* This row is already open - close it */
        // this.src = "../examples_support/details_open.png";
        oTable.fnClose( nTr );
    }
    else
    {
        /* Open this row */
        //this.src = "../examples_support/details_close.png";
        var aData = oTable.fnGetData( nTr );
        var jobNumber = aData[0];
        var jobDto=jobsMap[jobNumber];
        oTable.fnOpen( nTr, fnFormatDetails(jobDto), 'JobDetail' );

    }
}

/* Formating function for row details */
function fnFormatDetails ( job )
{
    var jobNumber = job.JobNumber;
    var expandRowObject= $(expandJobRow).clone();
    var expandRowNode = expandRowObject[0];
    expandRowObject.attr("id", expandRowObject.attr("id")+jobNumber);

    // projectInfo Form and some action source
    var projectInfoFormObject= expandRowObject.find(projectInfoForm);
    projectInfoFormObject.attr("id", projectInfoFormObject.attr("id")+jobNumber);
    var expandInfoSpanObject= expandRowObject.find(expandProjectInfoIcon);
    expandInfoSpanObject.attr("id", expandInfoSpanObject.attr("id")+jobNumber);
    var collapseInfoSpanObject= expandRowObject.find(collapseProjectInfoIcon);
    collapseInfoSpanObject.attr("id", collapseInfoSpanObject.attr("id")+jobNumber);
    var editInfoSpanObject= expandRowObject.find(editProjectInfoIcon);
    editInfoSpanObject.attr("id", editInfoSpanObject.attr("id")+jobNumber);
    var saveInfoSpanObject= expandRowObject.find(saveProjectInfoIcon);
    saveInfoSpanObject.attr("id", saveInfoSpanObject.attr("id")+jobNumber);
    var editInfoDivObject= expandRowObject.find(editProjectInfo);
    editInfoDivObject.attr("id", editInfoDivObject.attr("id")+jobNumber);
    var editProjectNameDiv= expandRowObject.find(editProjectName);
    editProjectNameDiv.attr("id", editProjectNameDiv.attr("id")+jobNumber);
    var editSourcePathDiv= expandRowObject.find(editSourcePath);
    editSourcePathDiv.attr("id", editSourcePathDiv.attr("id")+jobNumber);
    var viewInfoDivObject= expandRowObject.find(viewProjectInfo);
    viewInfoDivObject.attr("id", viewInfoDivObject.attr("id")+jobNumber);
    var viewProjectNameDiv= expandRowObject.find(viewProjectName);
    viewProjectNameDiv.attr("id", viewProjectNameDiv.attr("id")+jobNumber);
    var viewSourcePathDiv= expandRowObject.find(viewSourcePath);
    viewSourcePathDiv.attr("id", viewSourcePathDiv.attr("id")+jobNumber);

    // project Config Form and some action source
    var projectConfigFormObject= expandRowObject.find(projectConfigForm);
    projectConfigFormObject.attr("id", projectConfigFormObject.attr("id")+jobNumber);
    var expandConfigSpanObject= expandRowObject.find(expandProjectConfigIcon);
    expandConfigSpanObject.attr("id", expandConfigSpanObject.attr("id")+jobNumber);
    var collapseConfigSpanObject= expandRowObject.find(collapseProjectConfigIcon);
    collapseConfigSpanObject.attr("id", collapseConfigSpanObject.attr("id")+jobNumber);
    var editConfigSpanObject= expandRowObject.find(editProjectConfigIcon);
    editConfigSpanObject.attr("id", editConfigSpanObject.attr("id")+jobNumber);
    var uploadConfigSpanObject= expandRowObject.find(uploadProjectConfigIcon);
    uploadConfigSpanObject.attr("id", uploadConfigSpanObject.attr("id")+jobNumber);
    var projectConfigDiv= expandRowObject.find(projectConfig);
    projectConfigDiv.attr("id", projectConfigDiv.attr("id")+jobNumber);

    // project Report Form and some action source
    var projectReportFormObject= expandRowObject.find(projectReortForm);
    projectReportFormObject.attr("id", projectReportFormObject.attr("id")+jobNumber);
    var expandReportSpanObject= expandRowObject.find(expandProjectReportIcon);
    expandReportSpanObject.attr("id", expandReportSpanObject.attr("id")+jobNumber);
    var collapseReportSpanObject= expandRowObject.find(collapseProjectReportIcon);
    collapseReportSpanObject.attr("id", collapseReportSpanObject.attr("id")+jobNumber);
    var downloadReportSpanObject= expandRowObject.find(downloadProjectIcon);
    downloadReportSpanObject.attr("id", downloadReportSpanObject.attr("id")+jobNumber);
    var projectReportDiv= expandRowObject.find(projectReport);
    projectReportDiv.attr("id", projectReportDiv.attr("id")+jobNumber);


    // initial the input fileds
    viewProjectNameDiv.html(job.ProjectName);
    viewSourcePathDiv.html(job.SourcePath);

    projectConfigDiv.html(job.Configuration.Configuration);
    projectReportDiv.html(job.Report.ReportContent);



    return expandRowObject.html();
}


$(document).ready(function() {

    pageSetUp();

    /*
     * BASIC
     */

    $.ajax({
        type : "get",
        url : "http://localhost:59503/api/jobs",
        data : "",
        cache :false,
        success : function(data) {

        },
        error : function(XMLHttpRequest,
                         textStatus, errorThrown) {
        },
        complete: function(data){
            jobsDto ={
                "PageIndex" : 1,
                "PageSize" : 2,
                "TotalCount" : 2,
                "TotalPageCount" : 1,
                "HasNextPage" : false,
                "HasPreviousPage" : false,
                "Items" : [ {
                    "Key" : "628b9071-d851-4778-8d22-c6dfcd7ecfb1",
                    "ProjectName" : "BugTracker",
                    "JobNumber" : "000001",
                    "SourcePath" : "C:\\Dev\\String_Detector\\test_data\\src",
                    "Configuration" : {
                        "Key" : "628b9071-d851-4778-8d22-c6dfcd7ecfb1",
                        "Configuration" : " SOURCE_DIRECTORIES = ['{here}']"
                    },
                    "Report" : {
                        "Key" : "628b9071-d851-4778-8d22-c6dfcd7ecfb1",
                        "ReportUrl" : "c:\\testReport.txt",
                        "ReportContent" : "the job is success no hard code found"
                    },
                    "JobState" : {
                        "Key" : "412b930c-d89a-40ca-a9b2-421d805935ee",
                        "JobKey" : "628b9071-d851-4778-8d22-c6dfcd7ecfb1",
                        "JobStatus" : "RUNNING",
                        "CreatedOn" : "2014-04-25T15:31:13.797"
                    }
                }, {
                    "Key" : "e9a2479f-a527-4336-a9ed-5e72bbde5a4f",
                    "ProjectName" : "BugTrackerAdmin",
                    "JobNumber" : "000002",
                    "SourcePath" : "C:\\Dev\\String_Detector\\test_data\\src",
                    "Configuration" : {
                        "Key" : "e9a2479f-a527-4336-a9ed-5e72bbde5a4f",
                        "Configuration" : " SOURCE_DIRECTORIES = ['{here}']"
                    },
                    "Report" : {
                        "Key" : "e9a2479f-a527-4336-a9ed-5e72bbde5a4f",
                        "ReportUrl" : "basepath\\Report\\BugTrackerAdmin\\",
                        "ReportContent" : "the job is success no hard code found"
                    },
                    "JobState" : {
                        "Key" : "cadb5b31-7d56-4a0a-a790-9d60f574ab28",
                        "JobKey" : "e9a2479f-a527-4336-a9ed-5e72bbde5a4f",
                        "JobStatus" : "BEGIN_LAUNCH",
                        "CreatedOn" : "2014-04-11T18:08:59.79"
                    }
                } ]
            }

            loadJobs(jobsDto.Items);
        }
    });
    // fake the data
//    loadJobs(null);
    /*the expand and collapse row */
    $(document).delegate('#dt_basic tbody tr.odd','click',expandableRowClick);
    $(document).delegate('#dt_basic tbody tr.even','click',expandableRowClick);

    /* END BASIC */



})
