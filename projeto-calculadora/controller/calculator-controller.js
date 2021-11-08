class CalculatorController {
  constructor() {
    this._locale = "pt-BR";
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
        console.log(button.className.baseVal.replace("btn-", ""));
      });

      this.addEventListenerAll(button, "mouserover mouseup mousedown", (e) => {
        button.style.cursor = "pointer";
      });
    });
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
