class CalculatorController {
  constructor() {
    this._locale = "pt-BR";
    this._operation = [];
    this._displayCalcEl = document.getElementById("display-calculator");
    this._displayDateEl = document.getElementById("display-date");
    this._displayTimeEl = document.getElementById("display-time");
    this._currentDate;

    this.initializeDisplay();
    this.initializeButtons();
  }

  initializeDisplay() {
    this.setDisplayValues();
    setInterval(() => {
      this.setDisplayValues();
    }, 1000);
  }

  initializeButtons() {
    this.buttonsEl = document.querySelectorAll("#buttons > g, #parts > g");

    this.buttonsEl.forEach((button, index) => {
      this.addEventListenerAll(button, "click drag", (e) => {
        let textButton = button.className.baseVal.replace("btn-", "");
        this.buttonExecution(textButton);
      });

      this.addEventListenerAll(button, "mouserover mouseup mousedown", (e) => {
        button.style.cursor = "pointer";
      });
    });
  }

  isOperator(value) {
    console.log(["+", "-", "/", "*", "%"].indexOf(value) > -1);
    if (["+", "-", "/", "*", "%"].indexOf(value) > -1) {
      return true;
    } else {
      return false;
    }
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        this.setLastOperation(value);
      } else if (isNaN(value)) {

      } else {
        this._operation.push(value);
      }
    } else {
      let newValue = this.getLastOperation().toString() + value.toString();
      this.setLastOperation(parseInt(newValue));
    }
  }

  clearAll() {
    this._operation = [];
  }

  setError() {
    this.displayCalculator = "Error";
  }

  clearEntry() {
    this._operation.pop();
  }

  buttonExecution(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;

      case "ce":
        this.clearEntry();
        break;

      case "soma":
        this.addOperation("+");
        break;

      case "divisao":
        this.addOperation("/");
        break;

      case "multiplicacao":
        this.addOperation("*");
        break;

      case "subtracao":
        this.addOperation("-");
        break;

      case "porcento":
        this.addOperation("%");
        break;

      case "igual":
        break;

      case "ponto":
        this.addOperation(".");
        break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;

      default:
        this.setError();
        break;
    }
  }

  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  setDisplayValues() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._currentDate = value;
  }

  get displayCalculator() {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalculator(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get displayDate() {
    return this._displayDateEl.innerHTML;
  }

  set displayDate(value) {
    this._displayDateEl.innerHTML = value;
  }

  get displayTime() {
    return this._displayTimeEl.innerHTML;
  }

  set displayTime(value) {
    this._displayTimeEl.innerHTML = value;
  }
}
