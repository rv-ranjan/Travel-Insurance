var getImageData;
function upload_document(crn, document_id,document_type, insurer_id){
 return Android.Upload_document(crn, document_id,document_type, insurer_id);
}

function viewImageData(data){
    $('.AndroidReposnse').html(data);
    $('.alertAndroidReposnse').trigger('click');
}