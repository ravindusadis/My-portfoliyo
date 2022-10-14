$(document).click(function () {
    loadAllOrderDetail();
});
function loadAllOrderDetail() {
    $("#tblOrderDetail").empty();

    for (var orderDetail of orderDetails){
        var all = `<tr><td>${orderDetail.orderId}</td><td>${orderDetail.date}</td><td>${orderDetail.id}</td><td>${orderDetail.code}</td><td>${orderDetail.unitPrice}</td><td>${orderDetail.qty}</td><td>${orderDetail.total}</td></tr>`;
        $("#tblOrderDetail").append(all);
    }

}