document.addEventListener("DOMContentLoaded", function (event) {
    $(".delete").click(function () {
        var phonenum = $(this).val();
        console.log("hello");
        console.log(phonenum);
        var url = '/deleteMember?phonenum=' + phonenum;
        $.get(url, (data, status, xhr) => {
            // alert(status);            
            if (status == "success") {
                window.location.href = "/loadMembers";
            }
            else {
                var toastElList = [].slice.call(document.querySelectorAll('.toast'))
                var toastList = toastElList.map(function(toastEl) {
                    return new bootstrap.Toast(toastEl)
                });

                toastList.forEach(toast => toast.show());
            }
        });
    });

    $(".btn").click(function () { 
        console.log("SEARCH!");
        var phonenum = document.querySelector('.form-control');
        
        var url = `/searchPhone?phonenum=${phonenum.value}`;
        $.post(url, (data, status, xhr) => {
            if (status == "success") {
                if (!data) {
                    console.log("Does not Exist!");
                }
                else {
                    console.log("Exist!");
                    window.location.href =`/profile?phonenum=${phonenum.value}`;
                }
            }
        });
        
    });
});

