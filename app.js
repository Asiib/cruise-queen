const increaseFirstClass= document.getElementById('first-class-increase');
const decreaseFirstClass= document.getElementById('first-class-decrease');
const increaseEconomy= document.getElementById('economy-increase');
const decreaseEconomy= document.getElementById('economy-decrease');

const subtotal= document.getElementById('subtotal-amount');
const tax= document.getElementById('tax-amount');
const total= document.getElementById('total-amount');
const bookNowButton= document.getElementById('book-now-btn');

// This function parsed the input value to integer
function getParsedInputValue(plan){
    const Input= document.getElementById(`${plan}-count`);
    const inputCount = parseInt(Input.value);
    return inputCount;
}
// This function calculate total and tax amount
function calculateAmount(){
    const firstClassCount = getParsedInputValue('first-class');
    const economyCount = getParsedInputValue('economy');
    //calculate subtotal
    const subtotalAmount = (firstClassCount * 150) + (economyCount * 100);
    subtotal.innerText = `$ ${subtotalAmount}`;
    //calculate Tax Amount
    const taxAmount = subtotalAmount * 0.1; // 10% is equal to 0.1
    tax.innerText = `$ ${taxAmount}`;
    //calculate Grand Total
    const grandTotalAmount = subtotalAmount + taxAmount;
    total.innerText = `$ ${grandTotalAmount}`;
}
// This function handle different Plan
function ticketPlanHandler(ticketPlan,isIncrease){
    // validate argument type
    if ('string' === typeof(ticketPlan) && 'boolean' === typeof(isIncrease)) {
        const Input= document.getElementById(`${ticketPlan}-count`);
        const inputCount = parseInt(Input.value);
        let newCount = inputCount;
        if( true === isIncrease ){
            newCount = inputCount + 1
        }else if( false === isIncrease && 0 < newCount ){
            newCount = inputCount - 1;
        }
        Input.value = newCount;
        calculateAmount();
    }
    else{
        console.log(`Type Error! please pass a 'string' value as 'ticketPlan' and "boolean" value as "isIncrease" argument into ""ticketPlanHandler" function`);
    }
}
// Add Event Listeners
increaseFirstClass.addEventListener('click',function(){
    ticketPlanHandler('first-class',true)
})
decreaseFirstClass.addEventListener('click',function(){
    ticketPlanHandler('first-class',false)
})
increaseEconomy.addEventListener('click',function(){
    ticketPlanHandler('economy',true)
})
decreaseEconomy.addEventListener('click',function(){
    ticketPlanHandler('economy',false)
})
//confirmation message
bookNowButton.addEventListener('click',function(){
    const firstClassTickets = getParsedInputValue('first-class');
    const economyTickets = getParsedInputValue('economy');
    console.log(firstClassTickets);
    console.log(economyTickets);
    let message =``;
    if( 0 < firstClassTickets && 0 < economyTickets){
        message = `You have successfully booked ${firstClassTickets} first class and ${economyTickets} economy class tickets`;
    }else if(0 < firstClassTickets){
        // check for single ticket
        if(1 === firstClassTickets){
            message = `You have successfully booked one first class  ticket`;
        }else{
            message = `You have successfully booked ${firstClassTickets} first class tickets`;
        }
    }
    else if(0 < economyTickets){
        // check for single ticket
        if(1 === economyTickets){
            message = `You have successfully booked one economy class ticket`;
        }else{
            message = `You have successfully booked ${economyTickets} economy class tickets`;
        }
    }
    document.getElementById('confirmation-message').innerText = message;
    document.getElementById('confirmation-message').style.display = 'block';
})