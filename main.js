// Toggle Btn
const donationBtn = document.getElementById('donation');
const historyBtn = document.getElementById('history');
const historyMenu = document.getElementById('history-menu');
const donationSection = document.getElementById('donation-section');

historyBtn.addEventListener('click', function() {
    donationSection.classList.add('hidden');
    historyMenu.classList.remove('hidden');
    historyBtn.classList.add('bg-primari');
    donationBtn.classList.remove('bg-primari');
    donationBtn.classList.add('border-2','hover:bg-gray-200')
})

donationBtn.addEventListener('click', function(){
    historyMenu.classList.add('hidden');
    donationSection.classList.remove('hidden')
    historyBtn.classList.remove('bg-primari');
    donationBtn.classList.add('bg-primari',);
    donationBtn.classList.remove('border-2')
})


function convertValue(id){
    return parseFloat(document.getElementById(id).value);
}

//calculate funtion
function calculatePrice(balance, donationAmount, donationText, postTitle){
    const AccountBalance = parseFloat(document.getElementById(balance).innerText);
    const donationPriceValid = document.getElementById(donationAmount).value.trim();
    const donationPrice = convertValue(donationAmount);
    
    const validNumber = /^\d+(\.\d+)?$/.test(donationPriceValid);
    if(!validNumber || donationPrice <= 0 || isNaN(donationPrice)){
        return alert('Invalid Donation');
    }
    if(AccountBalance < donationPrice){
        return alert('insufficient balance')
    }
    const totalDonation = AccountBalance - donationPrice;
    document.getElementById(balance).innerText = totalDonation.toFixed(2)

    const donationValueEl = document.getElementById(donationText);
    const donationValue = parseFloat(donationValueEl.innerText)

    const newDonation = donationPrice + donationValue;
    donationValueEl.innerText = newDonation.toFixed(2);
    document.getElementById(donationAmount).value = '';
    
    //history
    const donationTitel = document.getElementById(postTitle).innerText;
    const historyDiv = document.getElementById('history-menu')
    const history = document.createElement('div');
    history.innerHTML += `
        <div class="border-2 p-5 rounded-xl mt-4 space-y-4">
            <h1>${donationPrice.toFixed(2)} ${donationTitel}</h1>
            <p>${new Date()}</p>
        </div>
    `
    historyDiv.insertBefore(history, historyDiv.firstChild)

    //show modal
    document.getElementById('my_modal_1').showModal();
}

// Close the modal
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('my_modal_1').close();
});



// first card
document.getElementById('first-btn').addEventListener('click', function (){
    calculatePrice('balance','donation-ammount', 'donation-price', 'first-title')
})
// second card
document.getElementById('second-btn').addEventListener('click', function (){
    calculatePrice('balance','donation-ammount2', 'donation-price1', 'second-title')
})
// third card
document.getElementById('third-btn').addEventListener('click', function (){
    calculatePrice('balance','donation-ammount3', 'donation-price2', 'third-title')
})

