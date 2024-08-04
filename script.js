document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const hiddenMenu = document.getElementById('hiddenMenu');
    const saveButton = document.getElementById('saveSlots');
    const percentButton = document.getElementById('percent');
    const plusMinusButton = document.getElementById('plus-minus');
    const slotContainers = document.querySelectorAll('.slot-container');
    let percentPressCount = 0;
    let selectedSlotIndex = -1;
    let currentOperation = '';
    let firstOperand = '';
    let secondOperand = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button);
        });
    });

    saveButton.addEventListener('click', () => {
        hiddenMenu.style.display = 'none';
        saveSlotValues();
    });

    function handleButtonClick(button) {
        button.classList.add('flash');
        setTimeout(() => button.classList.remove('flash'), 200);

        const buttonId = button.id;
        if (buttonId === 'percent') {
            handlePercentButtonClick();
        } else if (buttonId === 'plus-minus') {
            handlePlusMinusButtonClick();
        } else if (buttonId === 'clear') {
            clearCalculator();
        } else if (buttonId === 'equals') {
            calculateResult();
        } else if (buttonId === 'decimal') {
            inputDecimal();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(buttonId)) {
            handleOperator(buttonId);
        } else {
            inputNumber(buttonId);
        }
    }

    function handlePercentButtonClick() {
        percentPressCount++;
        if (percentPressCount === 3) {
            hiddenMenu.style.display = 'flex';
            percentPressCount = 0;
        }
    }

    function handlePlusMinusButtonClick() {
        selectedSlotIndex = (selectedSlotIndex + 1) % slotContainers.length;
        const selectedButton = document.getElementById(String(selectedSlotIndex + 1));
        if (selectedButton) {
            selectedButton.classList.add('flash');
            setTimeout(() => selectedButton.classList.remove('flash'), 200);
        }
    }

    function saveSlotValues() {
        slotContainers.forEach((container, index) => {
            const name = container.querySelector('.slot-name').value;
            const word = container.querySelector('.slot-word').value;
            const value = container.querySelector('.slot-value').value;
            // Salva questi valori dove necessario (es. localStorage)
            console.log(`Slot ${index + 1}: ${name}, ${word}, ${value}`);
        });
    }

    function clearCalculator() {
        display.textContent = '0';
        firstOperand = '';
        secondOperand = '';
        operator = '';
    }

    function calculateResult() {
        if (operator === 'multiply' && selectedSlotIndex !== -1) {
            const slotValue = document.querySelector(`[data-slot="${selectedSlotIndex + 1}"] .slot-value`).value;
            display.textContent = slotValue || '0';
        } else {
            secondOperand = display.textContent;
            let result = 0;
            switch (operator) {
                case 'add':
                    result = parseFloat(firstOperand) + parseFloat(secondOperand);
                    break;
                case 'subtract':
                    result = parseFloat(firstOperand) - parseFloat(secondOperand);
                    break;
                case 'multiply':
                    result = parseFloat(firstOperand) * parseFloat(secondOperand);
                    break;
                case 'divide':
                    result = parseFloat(firstOperand) / parseFloat(secondOperand);
                    break;
            }
            display.textContent = result;
        }
        firstOperand = display.textContent;
        operator = '';
        secondOperand = '';
    }

    function inputDecimal() {
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
    }

    function handleOperator(nextOperator) {
        firstOperand = display.textContent;
        operator = nextOperator;
        display.textContent = '0';
    }

    function inputNumber(number) {
        if (display.textContent === '0') {
            display.textContent = number;
        } else {
            display.textContent += number;
        }
    }
});
