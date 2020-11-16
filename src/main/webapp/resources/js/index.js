let r_group = document.getElementsByClassName("form-radio");



function getRValue() {
    return getRField().value;
}

function getXValue() {
    return getXField().value;
}

function getYValue() {
    return getYField().value;
}

function getXField() {
    return document.getElementById("form:x");
}

function getYField() {
    return document.getElementById("form:y");
}

function getRField() {
    return document.getElementById("form:r_input");

}

function tryf() {
    const rect = document.getElementById("graphic").getBoundingClientRect();
    let r = getRValue();

    const x = ((event.clientX - rect.left - 125) / (18 * 5) * r);
    const y = (((-event.clientY) + rect.bottom - 125) / (18 * 5) * r);
    // let xt = (event.clientX - rect.left - 125) ;
    //  let yt = ((-event.clientY) + rect.bottom - 125) ;
   // console.log(" x " + x + " y " + y + " r = " + r);
  //  console.log(" x " + rect.left + " y " + rect.bottom + " r = " + r);

    document.getElementById("hiddenForm:pointX").value = x;
    document.getElementById("hiddenForm:pointY").value = y;
    document.getElementById("hiddenForm:pointR").value = r;
    document.getElementById("hiddenForm:checkButton2").click();
    drawEntries();

}

function drawEntries() {

    $('svg').find('circle').remove()


    let entries = getEntries();
    let color = "yellow"
    if (entries === null) {
        entries = [];
    }
    // if (checkXInput() && checkYInput()) {

    let drawEntry = function (entry) {

        let xot =entry.x/entry.r;
        let yot =entry.y/entry.r;
        let Rotn = entry.r/getRValue();

        let x = 125+90*(xot*Rotn);
        let y = 125+(90*(yot*Rotn))*(-1);


        let r = getRValue();
        let truex = ((x - 125) / (90) * getRValue());
        let truey = -(((y-125)/90) * getRValue());
   //    console.log(x+"  "+ y )

        if((truex >= 0) && (truey >= 0) && (truex <= (r/2) && (truey < r)) ||
            (((truex * truex + truey * truey) <= r * r) && (truey <= 0) && (truex <= 0)) || ((truey > (truex / 2 - r / 2)) && (truey <= 0) && (truex > 0) && truex <= r)){
            color = "green"
        }else {
            color = "red"
        }



        var canva = document.getElementById("graphic");
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x + "px");
        circle.setAttribute("cy", y + "px");
        circle.setAttribute("r", "1px");
        circle.setAttribute("stroke", color);
        canva.appendChild(circle);


    };
    drawEntry({
        x: getXValue(),
        y: getYValue(),
        r: getRValue(),
        result: null
    });

    entries.forEach(drawEntry);
}


function getEntries() {
    let res = [];
    let entriesNodes = document.getElementById("entries_table_data").childNodes;
    for (let i = 0; i < entriesNodes.length; i++) {
        let values = entriesNodes[i].childNodes;
        if (values.length === 1) {
            continue;
        }
        res.push({
            x: values[1].innerText,
            y: values[2].innerText,
            r: values[3].innerText,
            result: values[4].innerText
        })
    }
    return res;
}

function changeR(r) {
    drawEntries();
    $('.draw_r').text(r);
    $('.draw_-r').text(-r);
    $('.draw_half_r').text(r / 2);
    $('.draw_-half_r').text(-r / 2);
}
let timerId = setTimeout(function tick() {
    drawEntries();
    timerId = setTimeout(tick, 300); // (*)
}, 300);
