class Calculator {
  // 1. describe and initiate our object
  constructor() {
    this.digitPeriodRegExp = new RegExp('\\d|\\.|\\,');
    // this.openButton = document.getElementById('start-calc');
    this.closeButton = document.getElementsByClassName(
      'calculator-overlay__close'
    );
    this.calcOverlay = document.getElementsByClassName('calculator-overlay');
    // the calc inputs fields
    this.businessIncome = document.getElementById('Business-income');
    this.taxRat = document.getElementById('tax-rate');
    this.additionalAmount = document.getElementById('additional-amount');
    this.reductionAmount = document.getElementById('reduction-amount');
    this.soleProprietorship = document.getElementById('rad1');
    this.corporation = document.getElementById('rad2');
    this.legalEntity = document.getElementById('rad3');
    // the calc output fields
    this.result = document.getElementById('result');
    this.businessIncomeOut = document.getElementById('business-income__out');
    this.rounded = document.getElementById('rounded');
    this.additionalAmountOut = document.getElementById(
      'additional-amount__out'
    );
    this.reductionAmountOut = document.getElementById('reduction-amount__out');
    this.allowance = document.getElementById('allowance');
    this.taxAssessmentNumber = document.getElementById(
      'tax-assessment__number'
    );
    this.taxAssessmentAmount = document.getElementById(
      'tax-assessment__amount'
    );
    this.municipalTaxRate = document.getElementById('municipal-tax__rate');
    this.tradeTax = document.getElementById('trade-tax');
    // the calc Div
    this.cCalc = document.getElementById('entries-holder');
    this.calcForm = document.getElementById('calc-form__id');
    this.events();
  }
  // 2.events
  events() {
    // this.openButton.addEventListener('click', this.openCalcOverlay.bind(this));
    this.closeButton[0].addEventListener(
      'click',
      this.closeCalcOverlay.bind(this)
    );
    this.cCalc.addEventListener(
      'keypress',
      (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type == 'text') {
          if (
            e.ctrlKey ||
            e.altKey ||
            typeof e.key !== 'string' ||
            e.key.length !== 1
          ) {
            return;
          }
          if (!this.digitPeriodRegExp.test(e.key)) {
            e.preventDefault();
          }
        }
      },
      false
    );
    this.cCalc.addEventListener(
      'keyup',
      (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type == 'text') {
          this.calculateTheTax();
        }
      },
      false
    );
    this.cCalc.addEventListener('click', (e) => {
      if (e.target.tagName === 'INPUT' && e.target.type == 'radio') {
        this.calculateTheTax();
      }
    });
  }

  //3. Methods
  openCalcOverlay() {
    this.calcOverlay[0].classList.add('calculator-overlay--active');
    // document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
  }
  closeCalcOverlay() {
    console.log('hallo');

    this.calcOverlay[0].classList.remove('calculator-overlay--active');
    // document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');
  }

  convertNumberToLocal(val, styleObj) {
    // new Intl.NumberFormat('de-DE').format(val);
    if (!styleObj) {
      return Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(val);
    } else if (styleObj.style === 'percent') {
      return Intl.NumberFormat('de-DE', styleObj).format(val / 100);
    } else {
      return Intl.NumberFormat('de-DE', styleObj).format(val);
    }
  }

  addErrAlert(errObj) {
    console.log('I am error alert func');
    if (!errObj.errMsg) {
      errMsg = 'there is am error';
    }
    errObj.outErrElement.innerText = errObj.errMsg;
    errObj.inErrElement.setCustomValidity(errObj.errMsg);
    errObj.outErrElement.classList.add('span-err');
  }
  removeErrAlert(errItemsObj) {
    errItemsObj.inputElement.setCustomValidity('');
    errItemsObj.outputElement.classList.remove('span-err');
  }

  checkEnteredValues(inputElement, outputElement, elementType) {
    if (
      inputElement.value.includes('..') ||
      inputElement.value.includes(',,')
    ) {
      this.addErrAlert({
        outErrElement: outputElement,
        inErrElement: inputElement,
        errMsg: 'Bitte geben Sie einen richtigen Wert ein',
      });
    } else {
      const N1 = inputElement.value.replaceAll('.', '');
      const N2 = N1.replace(',', '.');
      const N3 = this.convertNumberToLocal(N2, elementType);
      if (isNaN(parseFloat(N3))) {
        this.addErrAlert({
          outErrElement: outputElement,
          inErrElement: inputElement,
          errMsg: 'Bitte geben Sie einen richtigen Wert ein',
        });
      } else {
        outputElement.innerText = N3;
        this.removeErrAlert({
          inputElement: inputElement,
          outputElement: outputElement,
        });
      }
    }
  }

  watchTheEntriesFields() {
    this.checkEnteredValues(this.businessIncome, this.businessIncomeOut, {
      style: 'currency',
      currency: 'EUR',
    });

    this.checkEnteredValues(this.taxRat, this.municipalTaxRate, {
      style: 'percent',
      maximumFractionDigits: 2,
    });
    this.checkEnteredValues(this.additionalAmount, this.additionalAmountOut, {
      style: 'currency',
      currency: 'EUR',
    });
    this.checkEnteredValues(this.reductionAmount, this.reductionAmountOut, {
      style: 'currency',
      currency: 'EUR',
    });
  }

  convertToEnNum(val) {
    const N1 = val.replaceAll('.', '');
    const N2 = N1.replace(',', '.');
    return parseFloat(N2);
  }

  calculateTheTax() {
    console.log('I start calculation');
    this.watchTheEntriesFields();
    if (this.soleProprietorship.checked) {
      this.allowance.innerText = '24.500,00 €';
    } else if (this.corporation.checked) {
      this.allowance.innerText = '0,00 €';
    } else if (this.legalEntity.checked) {
      this.allowance.innerText = '5.000,00 €';
      console.log(
        'radio' + ' ' + this.convertNumberToLocal(this.allowance.innerText)
      );
    }
    const businessIncome = this.convertToEnNum(
      this.businessIncomeOut.innerText
    );
    const allowance = this.convertToEnNum(this.allowance.innerText);
    const additionalAmount = this.convertToEnNum(
      this.additionalAmountOut.innerText
    );
    const reductionAmount = this.convertToEnNum(
      this.reductionAmountOut.innerText
    );
    const municipalTaxRate = this.convertToEnNum(
      this.municipalTaxRate.innerText
    );
    let result = 0;
    const businessIncomePure =
      businessIncome + additionalAmount - reductionAmount;
    if (this.soleProprietorship.checked && businessIncomePure > 24500) {
      result = businessIncomePure - allowance;
    } else if (this.soleProprietorship.checked && businessIncomePure <= 24500) {
      result = 0;
    }
    if (this.corporation.checked && businessIncomePure > 0) {
      result = businessIncomePure;
    } else if (this.corporation.checked && businessIncomePure <= 0) {
      result = 0;
    }
    if (this.legalEntity.checked && businessIncomePure > 5000) {
      result = businessIncomePure - allowance;
    } else if (this.legalEntity.checked && businessIncomePure <= 5000) {
      result = 0;
    }
    const rounded = Math.floor(result / 100) * 100;
    const taxAssessmentAmount = rounded * (3.5 / 100);
    const tradeTax = taxAssessmentAmount * (municipalTaxRate / 100);
    this.result.innerText = this.convertNumberToLocal(result);
    this.rounded.innerText = this.convertNumberToLocal(rounded);
    this.taxAssessmentAmount.innerText =
      this.convertNumberToLocal(taxAssessmentAmount);
    this.tradeTax.innerText = this.convertNumberToLocal(tradeTax);
  }
}
const calc = new Calculator();

// Business-income = Gewerbeertrag
// tax-rate = Hebesatz der Gemeinde
// additional-amount = Hinzurechnungsbetrag
// reduction-amount = Kürzungsbetrag
// rad1 = Einzelunternehmen = sole proprietorship
// rad2 = Kapitalgesellschaft = corporation
// rad3 = Juristische Person = legal entity
// -----++++++++++++++++output fields ++++---
// result = Ergebnis
// business-income__out = Gewerbeertrag out
// rounded = Abgerundet
// additional-amount__out = Hinzurechnungsbetrag out
// reduction-amount__out = Kürzungsbetrag
// allowance = freibetrag
// tax-assessment__number = Gewerbesteuer-Messzahl 3.5%
// tax-assessment__amount = Steuermessbetrag
// municipal-tax__rate = Hebesatz der Gemeinde
// trade-tax = Gewerbesteuer
