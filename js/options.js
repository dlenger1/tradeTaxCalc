const selections = document.getElementById('gemeinde');
const checkedMunicipality = document.getElementById('gemeinde-check');
checkedMunicipality.addEventListener('click', () => {
  if (checkedMunicipality.checked) {
    selections.classList.add('tax-rate__active');
  } else {
    selections.classList.remove('tax-rate__active');
  }
});
