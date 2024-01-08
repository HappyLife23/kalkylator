const contaiiner = document.querySelector('.container') as HTMLDivElement;
const loanAmountInput = document.getElementById('loan-amount') as HTMLInputElement;
const interestRateInput = document.getElementById('interest-rate') as HTMLInputElement;
const repaymentPeriodInput = document.getElementById('repayment-period') as HTMLInputElement;
const resultBtn = document.getElementById('result-btn') as HTMLButtonElement;


function calculate() {
    const p = parseInt(loanAmountInput.value);
    const r = parseInt(interestRateInput.value) / 1200;
    const n = parseInt(repaymentPeriodInput.value) * 12;


    const nominator = r * (1 + r) ** n
    const denominator = (1 + r) ** n -1
    const M = Math.round( p * (nominator / denominator))
    
    
    const result = document.createElement('div')
    result.innerHTML = `
        <p>Loan amount:$${p}</p>
        <p>Interest rate: ${r}%</p>
        <p>Repayment period:${n} month</p>
        <p>Monthly payment: ${M}$</p>

    `
    


    contaiiner.appendChild(result)
}

resultBtn.addEventListener('click', calculate);





















