
    $("#home").click(function () {
    $("#main1").css("display","inline")
    $("#main2").css("display","none")
    $("#main3").css("display","none")
    $("#main4").css("display","none")
});

    $("#customer").click(function () {
    $("#main1").css("display","none")
    $("#main2").css("display","flex")
    $("#main3").css("display","none")
    $("#main4").css("display","none")
});

    $("#items").click(function () {
    $("#main1").css("display","none")
    $("#main2").css("display","none")
    $("#main3").css("display","flex")
    $("#main4").css("display","none")
});

    $("#orders").click(function () {
    $("#main1").css("display","none")
    $("#main2").css("display","none")
    $("#main3").css("display","none")
    $("#main4").css("display","flex")
});
