const container = document.querySelector('.container') as HTMLDivElement;
const loanAmountInput = document.getElementById('loan-amount') as HTMLInputElement;
const interestRateInput = document.getElementById('interest-rate') as HTMLInputElement;
const repaymentPeriodInput = document.getElementById('repayment-period') as HTMLInputElement;
const resultBtn = document.getElementById('result-btn') as HTMLButtonElement;


resultBtn.addEventListener('click', () => {
    calculate();
    loanAmountInput.value = '';
    interestRateInput.value = '';
    repaymentPeriodInput.value = '';
    
});

repaymentPeriodInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculate()
        loanAmountInput.value = '';
        interestRateInput.value = '';
        repaymentPeriodInput.value = '';
    }
});

/**
 * Skapar en funktion där jag gör:
 * 1- mina matteberäkningar
 * 2- string interpolation 
 * 3- if-saten om värdet på år är orimlig lång
 */
function calculate() {
    
    const p = parseInt(loanAmountInput.value);
    const r = (parseInt(interestRateInput.value) / 1200).toFixed(3); // Begränsa till 5 decimaler
    const n = parseInt(repaymentPeriodInput.value) * 12;
    
    const nominator = parseFloat(r) * (1 + parseFloat(r)) ** n; // Använd parseFloat för att konvertera till en flyttalsrepresentation
    const denominator = (1 + parseFloat(r)) ** n - 1;

    let M = Math.round(p * (nominator / denominator))
     
    const totalInterest = p - M;

    const result = document.createElement('div')
    result.className = 'list-element'
    result.innerHTML = `
        <p class='loan-amount'>Loan amount:${p} $</p>
        <p class='interest-rate'>Interest rate: ${r} %</p>
        <p class='repayment'>Repayment period: ${n} month</p>
        <p class='monthly-payment'>Monthly payment: ${M} $</p>
        <p class='total-remain'>Total amount loan reamin: ${totalInterest} $</p>

    `  

    // kontrollerar att alla fält är ifyllda
    if (isNaN(p) ||
        isNaN(parseFloat(r)) || isNaN(n)) {
        alert('Du måste fylla i alla fält!')
        return;        
    }else if (n > 60) {
        alert('Repayment period must be under 60 years!')
        return;        
    }
    
    container.appendChild(result);
}
























