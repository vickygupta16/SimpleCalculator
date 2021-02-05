function calcButtonClick() {
  switch (this.id) {
    case "button_C":
      setToZero();
      break;
    case "button_backSpace":
      backSpace();
      break;
    case "button_1":
    case "button_2":
    case "button_3":
    case "button_4":
    case "button_5":
    case "button_6":
    case "button_7":
    case "button_8":
    case "button_9":
      appendNumber(this.value);
      break;
    case "button_0":
      appendZero(this.value);
      break;
    case "button_divide":
    case "button_multiply":
    case "button_plus":
    case "button_minus":
      buttonOperator(this.value);
      break;
    case "button_equals":
      if (document.getElementById("evalBuiltIn").checked) {
        evalEquation();
      } else if (document.getElementById("evalProgrammed").checked) {
        evaluateEquation();
      } else {
        errorToastr("Please select a method first", "Calculation Method");
      }
      break;
    default:
      break;
  }
}

var warningToastr = (warningMessage, warningTitle) => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-center",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "3000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr["warning"](warningMessage, warningTitle);
};

var errorToastr = (errorMessage = "", errorTitle = "") => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-center",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "500",
    timeOut: "3000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr["error"](errorMessage, errorTitle);
};

var infoToastr = (infoMessage = "", infoTitle = "") => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-center",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "3000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr["info"](infoMessage, infoTitle);
};

var evalEquation = () => {
  var io_field = document.getElementById("calc-io");
  var recs = document.getElementById("recs");
  try {
    if (validEquation()) {
      recs.innerHTML += io_field.value + "<br/>";
      io_field.value = eval(io_field.value);
      recs.innerHTML +=
        "<b class='result'>" + io_field.value + "</b><br/><br/>";
    } else {
      errorToastr("Incomplete Equation", "OOPS!");
    }
  } catch (err) {
    errorToastr(err.message, err.name);
  }
};

var validEquation = () => {
  var io_field = document.getElementById("calc-io");
  var finalEquation = [];
  var items = Array.from(io_field.value);
  if (items[0] === "-") {
    items[1] = items[0].concat(Number.parseInt(items[1])).toString();
    items.splice(0, 1);
  }
  if (!isNaN(Number.parseInt(items[items.length - 1]))) {
    for (var i = 0; i < items.length; ++i) {
      if (!isNaN(Number.parseInt(items[i]))) {
        if (!isNaN(Number.parseInt(finalEquation[finalEquation.length - 1]))) {
          stringToNumber = "";
          stringToNumber = finalEquation[finalEquation.length - 1]
            .toString()
            .concat(items[i]);
          finalEquation[finalEquation.length - 1] = Number.parseInt(
            stringToNumber
          );
        } else {
          finalEquation.push(Number.parseInt(items[i]));
        }
      } else {
        finalEquation.push(items[i]);
      }
    }
    var operands = 0;
    var operators = 0;
    for (var i = 0; i < finalEquation.length; ++i) {
      if (!isNaN(finalEquation[i])) {
        ++operands;
      } else {
        ++operators;
      }
    }
    if (operands >= operators && operands > 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

var evaluateEquation = () => {
  var io_field = document.getElementById("calc-io");
  var items = Array.from(io_field.value);
  if (validEquation()) {
    var finalEquation = [];
    var stringToNumber = "";
    if (items[0] === "-") {
      items[1] = items[0].concat(Number.parseInt(items[1])).toString();
      items.splice(0, 1);
    }
    for (var i = 0; i < items.length; ++i) {
      if (!isNaN(Number.parseInt(items[i]))) {
        if (!isNaN(Number.parseInt(finalEquation[finalEquation.length - 1]))) {
          stringToNumber = "";
          stringToNumber = finalEquation[finalEquation.length - 1]
            .toString()
            .concat(items[i]);
          finalEquation[finalEquation.length - 1] = Number.parseInt(
            stringToNumber
          );
        } else {
          finalEquation.push(Number.parseInt(items[i]));
        }
      } else {
        finalEquation.push(items[i]);
      }
    }
    calculateFinalEquation(finalEquation);
  } else {
    errorToastr("Incomplete Equation", "OOPS!");
  }
};

var calculateFinalEquation = (finalEquation) => {
  // var totalOperators = 0;
  // var totalOperands = 0;
  var recs_field = document.getElementById("recs");
  for (var i = 0; i < finalEquation.length; ++i) {
    // if (isNaN(finalEquation[i])) {
    //   ++totalOperators;
    // } else {
    //   ++totalOperands;
    // }
    recs_field.innerHTML += finalEquation[i] + " ";
  }
  var operatorIndex = {
    divide: 0,
    multiply: 0,
    addition: 0,
    subtraction: 0,
  };
  for (var i = 0; i < finalEquation.length; ++i) {
    if (finalEquation[i] == "/") {
      operatorIndex["divide"] += 1;
    } else if (finalEquation[i] == "*") {
      operatorIndex["multiply"] += 1;
    } else if (finalEquation[i] == "+") {
      operatorIndex["addition"] += 1;
    } else if (finalEquation[i] == "-") {
      operatorIndex["subtraction"] += 1;
    }
  }
  var res = 0;
  var index = -1;
  var n = 0;
  while (operatorIndex["divide"] > 0 || operatorIndex["multiply"] > 0) {
    if (n < finalEquation.length) {
      if (finalEquation[n] === "/") {
        res = finalEquation[n - 1] / finalEquation[n + 1];
        index = finalEquation.indexOf(finalEquation[n - 1]);
        if (index > -1) {
          finalEquation.splice(index, 1);
          finalEquation.splice(index, 1);
          finalEquation[index] = res;
          n = index + 1;
          operatorIndex["divide"] -= 1;
        }
      } else if (finalEquation[n] === "*") {
        res = finalEquation[n - 1] * finalEquation[n + 1];
        index = finalEquation.indexOf(finalEquation[n - 1]);
        if (index > -1) {
          finalEquation.splice(index, 1);
          finalEquation.splice(index, 1);
          finalEquation[index] = res;
          n = index + 1;
          operatorIndex["multiply"] -= 1;
        }
      } else {
        ++n;
      }
    }
  }
  res = 0;
  index = -1;
  n = 0;
  while (operatorIndex["addition"] > 0 || operatorIndex["subtraction"] > 0) {
    if (n < finalEquation.length) {
      if (finalEquation[n] === "+") {
        res = finalEquation[n - 1] + finalEquation[n + 1];
        index = finalEquation.indexOf(finalEquation[n - 1]);
        if (index > -1) {
          finalEquation.splice(index, 1);
          finalEquation.splice(index, 1);
          finalEquation[index] = res;
          n = index + 1;
          operatorIndex["addition"] -= 1;
        }
      } else if (finalEquation[n] === "-") {
        res = finalEquation[n - 1] - finalEquation[n + 1];
        index = finalEquation.indexOf(finalEquation[n - 1]);
        if (index > -1) {
          finalEquation.splice(index, 1);
          finalEquation.splice(index, 1);
          finalEquation[index] = res;
          n = index + 1;
          operatorIndex["subtraction"] -= 1;
        }
      } else {
        ++n;
      }
    }
  }
  var io_field = document.getElementById("calc-io");
  io_field.value = finalEquation[0];
  recs_field.innerHTML += "<br/><b class='result'>" + finalEquation[0] + "</b>";
  recs_field.innerHTML += "<br/><br/>";
};

function setToZero() {
  var io_field = document.getElementById("calc-io");
  io_field.value = "0";
}

var backSpace = () => {
  var io_field = document.getElementById("calc-io");
  if (io_field.value.length > 1) {
    var items = Array.from(io_field.value);
    items.pop();
    io_field.value = "";
    for (var i = 0; i < items.length; ++i) {
      io_field.value += items[i];
    }
  } else {
    io_field.value = "0";
  }
};

var buttonOperator = (operatorValue) => {
  var io_field = document.getElementById("calc-io");
  var items = Array.from(io_field.value);
  const lastIndex = items.length - 1;
  if (io_field.value !== "0") {
    if (isLastItemNumber(items[lastIndex])) {
      io_field.value += operatorValue;
    } else {
      items[lastIndex] = operatorValue;
      io_field.value = "";
      for (var i = 0; i < items.length; ++i) {
        io_field.value += items[i];
      }
    }
  }
};

var isLastItemNumber = (itemAtLastIndex) => {
  if (
    itemAtLastIndex === "/" ||
    itemAtLastIndex === "*" ||
    itemAtLastIndex === "-" ||
    itemAtLastIndex === "+"
  ) {
    return false;
  }
  return true;
};

var appendNumber = (numberValue) => {
  var io_field = document.getElementById("calc-io");
  if (io_field.value.length < 16) {
    if (io_field.value === "0") {
      io_field.value = numberValue;
    } else {
      io_field.value += numberValue;
    }
  } else {
    warningToastr("Reached Maximum Input Size", "Size Warning");
  }
};

var appendZero = (zeroValue) => {
  var io_field = document.getElementById("calc-io");
  if (io_field.value.length < 16) {
    var items = Array.from(io_field.value);
    var lastIndex = items.length - 1;
    if (isLastItemNumber(items[lastIndex]) && io_field.value !== "0") {
      io_field.value += zeroValue;
    } else {
      infoToastr("Before 0, please enter a number between 1-9", "Wrong Input");
    }
  }
};

var clearHistory = () => {
  if (document.getElementById("recs").innerHTML.length > 0) {
    document.getElementById("recs").innerHTML = "";
    infoToastr("Success : Calculation History Cleared", "Clear History");
  } else {
    infoToastr("Calculation History doesn't exist");
  }
};

window.onload = function () {
  var all_buttons = document.getElementsByClassName("btn");
  for (var i = 0; i < all_buttons.length; ++i) {
    all_buttons[i].onclick = calcButtonClick;
  }
  document.getElementById("calc-io").value = "0";
  document.getElementById("deleteHistory").onclick = clearHistory;
  document.addEventListener("contextmenu", (event) => event.preventDefault());
};
