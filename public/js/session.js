document.addEventListener("DOMContentLoaded", function (event) {
    $(".delete").click(function () {
        var date = this.dataset.date;
        var session = this.dataset.session;
        var url = '/deleteSession?date='+date+'&session='+session;
        $.get(url, (data, status, xhr) => {
            alert(status);
            if (status == "success") {
                window.location.href = "/sessions";
            }
        });
    });

    $("#generate-report").click(function () {
        $.get('generateReport', {}, function (result) {
            console.log(result);

            var headers = {
                session: 'Sessions', 
                date: "Date"
            };
    
            var itemsFormatted = [];
    
            Array.prototype.forEach.call(result, item => {
                itemsFormatted.push({
                    session: item.session, 
                    date: item.date
                });
            });
    
            var fileTitle = 'Session'; 
    
            exportCSVFile(headers, itemsFormatted, fileTitle);
        });

        function convertToCSV(objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
        
            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','
        
                    line += array[i][index];
                }
        
                str += line + '\r\n';
            }
        
            return str;
        }
        
        function exportCSVFile(headers, items, fileTitle) {
            if (headers) {
                items.unshift(headers);
            }
        
            // Convert Object to JSON
            var jsonObject = JSON.stringify(items);
        
            var csv = convertToCSV(jsonObject);
        
            var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
        
            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, exportedFilenmae);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { 
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", exportedFilenmae);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    });
});
