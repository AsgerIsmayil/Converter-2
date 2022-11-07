let btnLeft = document.querySelector(".money_types_left");
let btnRight = document.querySelector(".money_types_right");
let money = document.querySelectorAll('.money');
let money2 = document.querySelectorAll('.money2');
let input = document.querySelector(".in");
let input2 = document.querySelector(".out");
let inValue = document.querySelector('.in_value');
let outValue = document.querySelector('.out_value');
let menuIcon = document.querySelector('.menu_icon');
let menuIcon1 = document.querySelector('.menu_icon1');
let newNavbarContainer = document.querySelector('.newNavbarContainer');
let container = document.querySelector('#container')
let newNavbar = document.querySelector('#newNavbar')

let base = "RUB";
let symbols = "USD";

eventListerners();

function eventListerners() {
    money.forEach(e => e.addEventListener("click", clickButtonListenner));
    money2.forEach(e => e.addEventListener("click", clickButtonListenner));
    menuIcon.addEventListener('click', navbarFunc);
    menuIcon1.addEventListener('click', navbarReverseFunc);
    input.addEventListener('input', () => {
        if (input.value[1] == ".") {} else if (input.value[0] == 0 && input.value.length > 1) {
            input.value = input.value[1];
        }
    })
    input2.addEventListener('input', () => {
        if (input2.value[1] == ".") {} else if (input2.value[0] == 0 && input2.value.length > 1) {
            input2.value = input2.value[1];
        }
    })
};

function navbarFunc() {
    newNavbarContainer.style.transform = "translateY(150px)";
    menuIcon1.style.display = "flex";
    menuIcon.style.display = "none";
    container.style.display = "none";
}

function navbarReverseFunc() {
    newNavbarContainer.style.transform = "translateY(-1000px)";
    container.style.opacity = "1";
    menuIcon.style.display = "flex";
    menuIcon1.style.display = "none";
    container.style.display = "block";
}


function clickButtonListenner(e) {
    if (e.target.parentElement == btnLeft) {
        money.forEach(element => {
            element.classList.remove("active");
        });
        base = e.target.innerHTML;
        e.target.classList.add("active");
        api2();
    } else {
        money2.forEach(element => {
            element.classList.remove("active");
        });
        symbols = e.target.innerHTML;
        e.target.classList.add("active");
        api1();
    }
}

function api1() {
    let url = fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
    url
        .then(res => {
            return res.json();
        })
        .then(data => {
            let a = data.rates;
            let val = Object.values(a)[0];
            inputInner(val);
            input.addEventListener("input", () => {
                inputInner(val);
            });
        });
}
api1();

function inputInner(val) {
    if (input.value == "") {
        input2.value = "";

    } else {
        input2.value = (+input.value.replaceAll(" ", "") * val).toPrecision().substring(0, 10);
        input2.value = commify(input2.value);

    }
    inValue.innerHTML = `1 ${base} = ${val.toPrecision()} ${symbols}`
    outValue.innerHTML = `1 ${symbols} = ${(1/val).toPrecision()} ${base}`
}

function inputInner2(val) {
    if (input2.value == "") {
        input.value = "";
    } else {
        input.value = (+input2.value.replaceAll(" ", "") * val).toPrecision().substring(0, 10);
        input.value = commify(input.value);
    }
    
    outValue.innerHTML = `1 ${symbols}=${val.toPrecision()} ${base}`
    inValue.innerHTML = `1 ${base} = ${(1/val).toPrecision()} ${symbols}`
}
api2()

function api2() {
    let url = fetch(`https://api.exchangerate.host/latest?base=${symbols}&symbols=${base}`)
    url
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data.rates)
            let a = data.rates;
            let val = Object.values(a)[0];
            inputInner2(val);
            input2.addEventListener("input", () => {
                inputInner2(val);
            });
        });
}


function commify(n) {
    var parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return (
        numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "")
    );
}

window.addEventListener("offline", (e) => {
    throw alert('no connection');
})

var numberMask = IMask(input, {
    mask: Number, // enable number mask

    // other options are optional with defaults below
    scale: 4, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ' ', // any single char
    padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
    normalizeZeros: true, // appends or removes zeros at ends
    radix: '.', // fractional delimiter
    mapToRadix: [','], // symbols to process as radix

});

var numberMask = IMask(input2, {
    mask: Number, // enable number mask

    // other options are optional with defaults below
    scale: 4, // digits after point, 0 for integers
    signed: false, // disallow negative
    thousandsSeparator: ' ', // any single char
    padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
    normalizeZeros: true, // appends or removes zeros at ends
    radix: '.', // fractional delimiter
    mapToRadix: [','], // symbols to process as radix

});
