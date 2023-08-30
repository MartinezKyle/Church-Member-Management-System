document.addEventListener("DOMContentLoaded", function (event) {
    $('#apply_filter').click(function(){
        var property_id = [];
        var status_id = [];
        var qaqc_id = [];
        var ifaecategory_id = []
        $('#tickets').DataTable().destroy();
        $('#tickets').empty();
        $('#table_container').empty();
        $('#table_container').append("<table id=\"tickets\" aria-live=\"polite\" class=\"table table-responsive compact border rounded table-sm\" style=\"width: 100%;\" cellspacing=\"0\"><thead><tr><th>Control Number</th><th>Date Posted</th><th>email Address</th><th>Property</th><th>Concern</th><th>Status</th><th></th></tr></thead><tbody id=\"tbody\"></tbody></table>")
        
        $('input[name="property"]:checked').each(function() {
            property_id.push(this.value);
        });
        $('input[name="status"]:checked').each(function() {
            status_id.push(this.value);
        });
        $('input[name="qaqc"]:checked').each(function() {
            qaqc_id.push(this.value == '' ? null : this.value);
        });
        $('input[name="ifaecategory"]:checked').each(function() {
            ifaecategory_id.push(this.value == '' ? null : this.value);
        });
        //$("#start_date").prop('min').concat(" 16:00:00")
        //$("#end_date").prop('max').concat(" 15:59:59")
        var start_date = ($("#start_date").val()=="" || $("#start_date").val()==null) ? null : new Date(new Date($("#start_date").val())).toISOString().slice(0,10).concat(" 00:00:00");
        var end_date = ($("#end_date").val()=="" || $("#end_date").val()==null) ? null : new Date($("#end_date").val()).toISOString().slice(0,10).concat(" 23:59:59");

        $.get("table_filter", {property_id:property_id, status_id:status_id, ifaecategory_id:ifaecategory_id, qaqc_id:qaqc_id, start_date: start_date, end_date: end_date}, function(result){
            result.forEach(element => {$('#tbody').append("<tr class=\"table-" + element.color_class + "\"><td>" + element.control_number + "</td><td>" + element.timestamp + "</td><td style=\"overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 0\">" + element.email_address + "</td><td style=\"overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 0\">" + element.property + "</td><td>" + element.concern + "</td><td>" + element.status + "</td><td><button onclick=\"window.location.href='/ticket?control_number=" + element.control_number + "'\">View Ticket</button></td></tr>");});
            $('#tickets').DataTable({
                responsive: true,
                fixedHeader: true,
                scrollX: true,
                columnDefs: [
                    { "width": "10%", "targets": [0, 1] },
                    { "width": "17.5%", "targets": 2 },
                    { "width": "17.5%", "targets": 3 },
                    { "width": "34%", "targets": 4 },
                    { "width": "6%", "targets": 5 },
                    { "width": "5%", "targets": 6 },
                    { orderable: false, targets: [4, 5, 6] },
                ],
            })
        })
    });

    $("#start_date").change(function(){
        if ($("#start_date").val() != null && $("#start_date").val() != ""){
            $("#end_date").prop('min', $("#start_date").val());
            $("#end_date").prop('disabled', false);
        }
        else {
            $("#end_date").prop('min', $("#start_date").prop('min'));
        }
    });

    $("#end_date").change(function(){
        if ($("#end_date").val() != null && $("#end_date").val() != ''){
            $("#start_date").prop('max', $("#end_date").val());
            $("#apply_filter").prop('disabled', false);
        }
        else {
            $("#start_date").prop('max', $("#end_date").prop('max'));
        }
    });
});



$(document).ready(function () {
    //new DataTable('#tickets');
    $('#tickets').DataTable({
        responsive: true,
        fixedHeader: true,
        scrollX: true,
        columnDefs: [
            { "width": "10%", "targets": [0, 1] },
            { "width": "17.5%", "targets": 2 },
            { "width": "17.5%", "targets": 3 },
            { "width": "34%", "targets": 4 },
            { "width": "6%", "targets": 5 },
            { "width": "5%", "targets": 6 },
            { orderable: false, targets: [4, 5, 6] },
        ]
    })
    //$('.dataTables_length').addClass('bs-select');
});