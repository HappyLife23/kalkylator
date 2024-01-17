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

/**------------------------------------------
 * Skapar en funktion där jag gör:
 * 1- mina matteberäkningar
 * 2- string interpolation 
 * 3- if-saten om värdet på år är orimlig lång
 -------------------------------------------*/
function calculate() {
    
    const loanAmount = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value) / 1200; 
    const repaymentPeriod = parseInt(repaymentPeriodInput.value) * 12;
    
     /* kontrollerar att alla fält är ifyllda och 
     om återbetalningsperioden stiger över 60 år (60 * 12 = 720 månader) */
     if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(repaymentPeriod)) {
        alert('Du måste fylla i alla fält!')
        return;
    }if (repaymentPeriod > 720) {
        alert('Repayment period cant be more than 60 years!')
        return;        
    }

    // beräkning av nämnaren och täljaren
    const nominator = interestRate * (1 + interestRate) ** repaymentPeriod; 
    const denominator = (1 + interestRate) ** repaymentPeriod - 1;

    // Beräkning av M(den månatliga inbetalningen)
    let monthlyPayment = Math.round(loanAmount * (nominator / denominator))
     
    // Amorteringsplan
    let remainingBalance = loanAmount;
    const amortizationPlan = [];

    for (let i = 1; i <= repaymentPeriod; i++){
        const interestPayment = remainingBalance * interestRate; // räntebetalning = den aktuella summan * månadsinbetalningen

        const principalPayment = monthlyPayment - interestPayment; // beräkning av amortering på huvudlånet 

        remainingBalance -= principalPayment;
         
        amortizationPlan.push({
            month: i,
            principalPayment,
            interestPayment,
            remainingBalance,
        })
    };

    
    const result = document.createElement('div')
    result.className = 'list-element'
    result.innerHTML = `
        <p class='loan-amount'>Loan amount:${loanAmount} $</p>
        <p class='interest-rate'>Interest rate: ${parseFloat((interestRate * 1200).toFixed(2))} %</p>
        <p class='repayment'>Repayment period: ${repaymentPeriod} month</p>
        <p class='monthly-payment'>Monthly payment: ${monthlyPayment} $</p>
        
        `;    

    // Visar amorteringsplan
    const amortizationTable = document.createElement('table');
    amortizationTable.innerHTML = `
        <tr>
            <th>Month</th>
            <th>Principal Payment</th>
            <th>Interest Payment</th>
            <th>Ramining Balance</th>
        
        </tr>   
    `;

    amortizationPlan.forEach((payment) => {
        amortizationTable.innerHTML += `
         
        <tr>
            <td>${payment.month}</td>
            <td>${payment.principalPayment.toFixed(0)}</td>
            <td>${payment.interestPayment.toFixed(0)}</td>
            <td>${payment.remainingBalance.toFixed(0)}</td>
        </tr>

        `;
    });

    result.appendChild(amortizationTable);
    container.appendChild(result);
}
























