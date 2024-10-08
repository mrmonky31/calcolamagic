document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const hiddenMenu = document.getElementById('hiddenMenu');
    const closeMenuButton = document.getElementById('closeMenu');
    const percentButton = document.getElementById('percent');
    const plusMinusButton = document.getElementById('plus-minus');
    const slotButtons = document.querySelectorAll('.slot-button');
    const slotInputs = document.querySelectorAll('.slot-input');
    let percentPresses = [];
    let selectedSlotIndex = 1;
    let currentOperation = '';
    let firstOperand = '';
    let secondOperand = '';
    let operator = '';
    let shouldResetDisplay = false;
    const slots = {
        1: { name: '', phrase: '', value: '' },
        2: { name: '', phrase: '', value: '' },
        3: { name: '', phrase: '', value: '' }
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button));
    });

    closeMenuButton.addEventListener('click', () => {
        hiddenMenu.style.display = 'none';
    });

    slotButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedSlotIndex = parseInt(button.dataset.slot);
            updateSlotInputs();
        });
    });

    function handleButtonClick(button) {
        const buttonId = button.id;

        if (['clear', 'plus-minus', 'percent'].includes(buttonId)) {
            handleSpecialFunction(button);
        } else if (['divide', 'multiply', 'subtract', 'add'].includes(buttonId)) {
            handleOperator(button);
        } else if (buttonId === 'equals') {
            calculateResult();
        } else if (buttonId === 'decimal') {
            inputDecimal();
        } else {
            inputNumber(buttonId);
        }

        highlightButton(button);

        if (!['divide', 'multiply', 'subtract', 'add'].includes(buttonId)) {
            resetOperators();
        }
    }

    function handleSpecialFunction(button) {
        if (button.id === 'percent') {
            handlePercentButtonClick();
        } else if (button.id === 'plus-minus') {
            handlePlusMinusButtonClick();
        } else if (button.id === 'clear') {
            clearCalculator();
        }
    }

    function handlePercentButtonClick() {
        const now = Date.now();
        percentPresses.push(now);
        
        percentPresses = percentPresses.filter(time => now - time <= 1500);

        if (percentPresses.length === 3) {
            hiddenMenu.style.display = 'flex';
            percentPresses = [];
            updateSlotInputs();
        }
    }

    function handlePlusMinusButtonClick() {
        if (hiddenMenu.style.display !== 'flex') {
            selectedSlotIndex = selectedSlotIndex % 3 + 1;
            highlightSelectedSlot();
        }
    }

    function updateSlotInputs() {
        slotInputs[0].value = slots[selectedSlotIndex].name;
        slotInputs[1].value = slots[selectedSlotIndex].phrase;
        slotInputs[2].value = slots[selectedSlotIndex].value;
    }

    function highlightSelectedSlot() {
        const numberButton = document.getElementById(selectedSlotIndex.toString());
        highlightButton(numberButton);
    }

    function highlightButton(button) {
        button.classList.add('highlight');
        setTimeout(() => {
            button.classList.remove('highlight');
        }, 300);
    }

    function handleOperator(button) {
        resetOperators();
        button.classList.add('active');
        operator = button.id;
        firstOperand = display.textContent.replace(/\./g, '').replace(',', '.');
        shouldResetDisplay = true;
    }

    function resetOperators() {
        document.querySelectorAll('.operator').forEach(op => op.classList.remove('active'));
    }

    function clearCalculator() {
        display.textContent = '0';
        firstOperand = '';
        secondOperand = '';
        operator = '';
        shouldResetDisplay = false;
        resetOperators();
        updateDisplay();
    }

    function calculateResult() {
        secondOperand = display.textContent.replace(/\./g, '').replace(',', '.');
        if (operator === 'multiply') {
            display.textContent = slots[selectedSlotIndex].value || '0';
        } else {
            let result = 0;
            switch (operator) {
                case 'add':
                    result = parseFloat(firstOperand) + parseFloat(secondOperand);
                    break;
                case 'subtract':
                    result = parseFloat(firstOperand) - parseFloat(secondOperand);
                    break;
                case 'divide':
                    result = parseFloat(firstOperand) / parseFloat(secondOperand);
                    break;
            }
            display.textContent = result.toString();
        }
        firstOperand = display.textContent;
        operator = '';
        secondOperand = '';
        resetOperators();
        updateDisplay();
    }

    function inputDecimal() {
        if (shouldResetDisplay) {
            display.textContent = '0,';
            shouldResetDisplay = false;
        } else if (!display.textContent.includes(',')) {
            display.textContent += ',';
        }
        updateDisplay();
    }

    function inputNumber(number) {
        if (display.textContent === '0' || shouldResetDisplay) {
            display.textContent = number;
            shouldResetDisplay = false;
        } else {
            display.textContent += number;
        }
        updateDisplay();
    }

    slotInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (index === 0) slots[selectedSlotIndex].name = input.value;
            else if (index === 1) slots[selectedSlotIndex].phrase = input.value;
            else if (index === 2) slots[selectedSlotIndex].value = input.value;
        });
    });

    function formatNumber(number) {
        let [integerPart, decimalPart] = number.split(',');
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return decimalPart ? `${integerPart},${decimalPart}` : integerPart;
    }

    function updateDisplay() {
        let content = display.textContent;
        if (content !== '0' && content !== '-0') {
            let formattedNumber = formatNumber(content);
            display.textContent = formattedNumber;
        }
        
        // Ridimensiona il testo se necessario
        let fontSize = 5.5;
        display.style.fontSize = `${fontSize}rem`;
        while (display.scrollWidth > display.offsetWidth && fontSize > 1) {
            fontSize -= 0.5;
            display.style.fontSize = `${fontSize}rem`;
        }
    }

    // Inizializza il display
    updateDisplay();
});
