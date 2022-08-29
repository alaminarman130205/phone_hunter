const loadPhones = async(searchText,datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res=await fetch(url); 
    const data = await res.json(); 
    displayData(data.data, datalimit);
}


const displayData = (phones, datalimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 20 phone only 
    const showAll = document.getElementById('show_all');


    if( datalimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }


    // display no phone found
    const no_phone  = document.getElementById('phone_error');

    if(phones.length === 0){
        no_phone.classList.remove('d-none');
    }else{
        no_phone.classList.add('d-none');   
    }
    phones.forEach(phone => {
        const phoneDiv= document.createElement('div'); 
        phoneDiv.classList.add('col-md-4'); 
        phoneDiv.innerHTML = `
            <div class="card p-4 mb-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-toggle="modal" data-target="#phoneDetails"> show details </button>
                
            </div>
        </div>

        `
        phoneContainer.appendChild(phoneDiv);
        
    });
    toggleSpinner(false);
}

const processSearch = (datalimit) =>{

    toggleSpinner(true);
    const inputField= document.getElementById('search_field');
    const inputFieldSearch = inputField.value;
    loadPhones(inputFieldSearch, datalimit);


}

document.getElementById('btn-search').addEventListener('click',function(){
   processSearch(10);

})
// search input field enter key handler 
document.getElementById('search_field').addEventListener('keypress', function(e){
    console.log(e.key)
    if(e.key=== 'Enter'){
        processSearch(10);
    }
})

const toggleSpinner  =  isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none');
    }
}

loadPhones('apple');

// not the best way to show all product 
document.getElementById('show_all').addEventListener('click', function(){
processSearch();

})

const loadPhoneDetails = async id =>{

        const url = `https://openapi.programming-hero.com/api/phone/${id}`;
        const res  = await fetch(url);
        const data  = await res.json();
        displayPhoneDetails(data.data);
  
}
const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsTitle'); 
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phoneDetailss');
    phoneDetails.innerHTML = `
    <p> Release Date : ${phone.releaseDate ? phone.releaseDate : 'no release date found '}</p>
    <p> Other:${phone.others ? phone.others.Bluetooth : 'no bluetooth information found sir '}</p>
    ` 


}