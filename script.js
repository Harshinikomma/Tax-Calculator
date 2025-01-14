document.getElementById('tax-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const grossAnnualIncome = parseFloat(document.getElementById('gross-annual-income').value);
    const extraIncome = parseFloat(document.getElementById('extra-income').value);
    const age = document.getElementById('age').value;
    const deductions = parseFloat(document.getElementById('deductions').value);
  
    const errors = [];
  
    clearErrors();
  
    if (isNaN(grossAnnualIncome) || grossAnnualIncome < 0) {
      addError('gross-annual-income');
      errors.push('gross-annual-income');
    }
  
    if (isNaN(extraIncome) || extraIncome < 0) {
      addError('extra-income');
      errors.push('extra-income');
    }
  
    if (!age) {
      addError('age');
      errors.push('age');
    }
  
    if (isNaN(deductions) || deductions < 0) {
      addError('deductions');
      errors.push('deductions');
    }
  
    if (errors.length === 0) {
      const taxableIncome = grossAnnualIncome + extraIncome - deductions;
      let tax;
  
      if (taxableIncome <= 800000) {
        tax = 0;
      } else {
        const ageThreshold = age === 'greater-or-equal-60' ? 60 : 40;
        const taxableIncomeOverLimit = taxableIncome - 800000;
  
        if (ageThreshold < 60) {
          tax = 0.3 * taxableIncomeOverLimit;
        } else {
          tax = 0.1 * taxableIncomeOverLimit;
        }
      }
  
      document.getElementById('tax-result-title').innerText = 'Tax Result';
      document.getElementById('tax-result-value').innerText = `Tax: ${tax.toFixed(2)}`;
  
      const dialog = document.getElementById('dialog');
      const closeBtn = dialog.querySelector('.close');
  
      closeBtn.addEventListener('click', () => {
        dialog.style.display = 'none';
      });
  
      dialog.style.display = 'block';
    }
  });
  
  function addError(fieldId) {
    const errorIcon = document.getElementById(`${fieldId}-error`);
    errorIcon.style.visibility = 'visible';
  }
  
  function removeError(fieldId) {
    const errorIcon = document.getElementById(`${fieldId}-error`);
    errorIcon.style.visibility = 'hidden';
  }
  
  function clearErrors() {
    const errorIcons = document.querySelectorAll('.error-icon');
    errorIcons.forEach(errorIcon => {
      errorIcon.style.visibility = 'hidden';
    });
  }