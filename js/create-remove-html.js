function populateSelectElement(selectElementId, data) {
  const selectElement = document.getElementById(selectElementId);
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const option = document.createElement('option');
      option.value = key;
      option.text = data[key];
      selectElement.appendChild(option);
    }
  }
}

function populateSelectElementArray(selectElementId, data) {
  const selectElement = document.getElementById(selectElementId);
  for (let element of data) {
    const option = document.createElement('option');
    option.value = element['Gewerbesteuerhebesatz'];
    option.text = element['Gemeinde'];
    selectElement.appendChild(option);
  }
}

function removeSelectElement(selectElementId) {
  const { options } = document.querySelector('#' + selectElementId);
  while (options.length > 1) {
    options[1].remove();
  }
}

export {
  populateSelectElement,
  populateSelectElementArray,
  removeSelectElement,
};
