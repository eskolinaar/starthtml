
$(document).ready(init);

function init() {
    $("button.index").click(() => { document.location.href="../index.html"; });

    $("#feedback").on("click", () => {
        $("#feedback").hide();
        if ($("#feedback").hasClass("correct")) {
            next();
        }
    });

    $("#exercise_workspace textarea").on("keyup", updateResult);

    $(".test").click(() => {
        if ($(".test").hasClass("next")) next();
        window.test();
    });

    $(".back").click(() => {
        back();
    });

    updateResult();
}

function val() {
    return $("#exercise_workspace textarea").val().trim();
}

function res() {
    return $("#exercise_result");
}

function initTest() {
    $("#feedback").removeClass("failed").removeClass("correct");
}

function elseCorrect() {
    if ($("#feedback").hasClass("failed")) return;
    correct();
}

function correct() {
    $("#feedback").removeClass("failed").addClass("correct").text("Bravo! Du hast die Aufgabe gelöst!").show();
    $("button.test").addClass("next").text("Weiter");
}

function next() {
    let current=parseInt(document.location.pathname.split("/").pop().replace("stage", "").replace(".html", ""));
    current++;
    oldUrl=document.location.pathname.split("/").pop();
    newUrl="stage"+current+".html";
    fullUrl=document.location.pathname.replace(oldUrl, newUrl);
    console.log("next", oldUrl, newUrl);
    $.get(fullUrl, (data) => {
        if (data!=undefined && data!=null && data.length>0) document.location.pathname=fullUrl;
    });
}

function back() {
    let current=parseInt(document.location.pathname.split("/").pop().replace("stage", "").replace(".html", ""));
    current--;
    if (current<1) newUrl="../index.html"; else newUrl="stage"+current+".html";
    oldUrl=document.location.pathname.split("/").pop();
    fullUrl=document.location.pathname.replace(oldUrl, newUrl);
    console.log("next", oldUrl, newUrl);
    $.get(fullUrl, (data) => {
        if (data!=undefined && data!=null && data.length>0) document.location.pathname=fullUrl;
    });
}

function index() {
    oldUrl=document.location.pathname.split("/").pop();
    newUrl="../index.html";
    fullUrl=document.location.pathname.replace(oldUrl, newUrl);
    console.log("next", oldUrl, newUrl);
    $.get(fullUrl, (data) => {
        if (data!=undefined && data!=null && data.length>0) document.location.pathname=fullUrl;
    });
}

function fail(txt) {
    $("#feedback").removeClass("correct").addClass("failed").text(txt).show();
}

function updateResult() {
    $("#exercise_result").html($("#exercise_workspace textarea").val());
}