document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const hiddenMenu = document.getElementById('hiddenMenu');
    const closeMenuButton = document.getElementById('closeMenu');
    const percentButton = document.getElementById('percent');
    const plusMinusButton = document.getElementById('plus-minus');
    const slotContainers = document.querySelectorAll('.slot-container');
    const slots = document.querySelectorAll('.slot-value');
    let percentPressCount = 0;
    let selectedSlotIndex = -1;
    let currentOperation = '';
    let firstOperand = '';
    let secondOperand = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button.id);
        });
    });

    closeMenuButton.addEventListener('click', () => {
        hiddenMenu.style.display = 'none';
        resetCalculator();
    });

    function handleButtonClick(buttonId) {
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
        if (selectedSlotIndex !== -1) {
            const currentButton = slotContainers[selectedSlotIndex];
            currentButton.classList.remove('highlighted');
        }
        selectedSlotIndex = (selectedSlotIndex + 1) % slotContainers.length;
        const selectedButton = slotContainers[selectedSlotIndex];
        selectedButton.classList.add('highlighted');
        setTimeout(() => {
            selectedButton.classList.remove('highlighted');
        }, 500);
    }

    function clearCalculator() {
        display.textContent = '0';
        firstOperand = '';
        secondOperand = '';
        operator = '';
    }

    function resetCalculator() {
        display.textContent = '0';
        firstOperand = '';
        secondOperand = '';
        operator = '';
        selectedSlotIndex = -1;
    }

    function calculateResult() {
        if (operator === 'multiply' && selectedSlotIndex !== -1) {
            display.textContent = slots[selectedSlotIndex].value || '0';
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
        addHighlight(document.getElementById('decimal'));
    }

    function handleOperator(nextOperator) {
        firstOperand = display.textContent;
        operator = nextOperator;
        display.textContent = '';
    }

    function inputNumber(number) {
        if (display.textContent === '0') {
            display.textContent = number;
        } else {
            display.textContent += number;
        }
    }

    function addHighlight(button) {
        button.classList.add('highlighted');
        setTimeout(() => {
            button.classList.remove('highlighted');
        }, 500);
    }
});
