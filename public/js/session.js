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
});
