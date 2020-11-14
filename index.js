let cont = "";

function get(ID) {
  return document.getElementById(ID).value / 1;
}

function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
  }
  return number + ""; // always return a string
}

function prettify(x) {
  if (typeof x === "string") {
    x = formatback(x);
  }
  x = Math.round(x);
  rett = [];
  while (x > 0) {
    rett.unshift(zeroFill(x % 1000, 3));
    x = parseInt(x / 1000);
  }
  rett[0] = parseInt(rett[0]);
  return rett.join(".");
}

function formatback(x) {
  if (x === "") {
    return "";
  }
  x = x.split(".");
  x = x.join("");
  return parseInt(x);
}

$("#ProcessButton").click(() => {
  let BP = formatback(document.getElementById("BP").value);
  let BB = get("BB") / get("BBS");
  let LP = get("LP") * get("LPS");
  let ress = ((LP + 1) / 2) * (BB / 100) * BP;
  console.log(ress / BP);
  if (ress != "NaN") {
    $("#answer").html("Rp " + prettify(ress));
    $("#TableBB").html("Rp " + prettify(ress));
    $("#TablePB").html((ress / BP) * 100 + " %");
    $("#TableTB").html("Rp " + prettify(ress + BP));
  } else {
    //show error message
    $("#answer").html("Rp " + prettify(ress));
  }
});

$("#BP").keyup(function (e) {
  let ncont = document.getElementById("BP").value;
  if (ncont === "") {
    cont = "";
    return;
  }
  let res = prettify(ncont);
  if (res != "NaN") {
    document.getElementById("BP").value = res;
    cont = res;
  } else {
    document.getElementById("BP").value = cont;
  }
});
