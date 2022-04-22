// const form = document.querySelector('.form');
const form = document.forms[0];
let code;
function buildJsonFormData() {
  // const numberInput = document.querySelector('.form-input-number').value;
  const formData = new FormData(form);
  // formData.append('number', `${code}${numberInput}`)
  const jsonFormData = {};
  for(const pair of formData) {
      jsonFormData[pair[0]] = pair[1]
  }
  
  return jsonFormData;
}

function resetForm() {
  const formInput = document.querySelectorAll('.form-input');
  formInput.forEach(input => {
    input.value = "";
  })
  setDialCode();
}


const modalBg = document.querySelector('.modal-bg')
function openModal() {
  modalBg.classList.add('bg-active');
}

const modalClose = document.querySelectorAll('.custom-modal-close');
 function closeModal() {
  modalBg.classList.remove('bg-active')
}

const submitBtn = document.querySelector('.form-submit-btn');
function disableBtn() {
  submitBtn.classList.add('disable-btn');
  submitBtn.disabled = true;
}

function enableBtn() {
  submitBtn.classList.remove('disable-btn');
  submitBtn.disabled = false;
}

function addResponseToModal(response) {
  const modalText = document.querySelector('.custom-modal-body-text');
  if(response.isSuccess) {
    modalText.innerHTML = 'Thank you for filling out the form.';
    enableBtn();
  } else {
    modalText.innerHTML = response.msg;
    enableBtn();
  }
}

// const inputName = document.querySelector('.input-name');
// const inputAddress = document.querySelector('.input-address');
// const inputMobile = document.querySelector('.input-mobile');
// const inputEmail = document.querySelector('.input-email');
// const inputLoanAmount = document.querySelector('.input-loan-amount');
// const inputBank = document.querySelector('.input-bank');

function checkInputs() {
  const jsonFormData = buildJsonFormData();
  // console.log(jsonFormData)
  const nameValue = jsonFormData.name.trim();
  const addressValue = jsonFormData.address.trim();
  const mobileValue = jsonFormData.mobile.trim();
  const emailValue = jsonFormData.email.trim();
  const loanAmountValue = jsonFormData.tlamount.trim();
  const bankValue = jsonFormData.nameofbank.trim();
  if(nameValue === '') {
    setError('Name field cannot be blanked');
    return false;
  } else if(addressValue === '') {
    setError('Address field cannot be blanked');
    return false;
  } else if(mobileValue === '') {
    setError('Mobile field cannot be blanked');
    return false;
  } else if(emailValue === '') {
    setError('Email field cannot be blanked');
    return false;
  } else if(loanAmountValue === '') {
    setError('Total Loan Amount field cannot be blanked');
    return false;
  } else if(loanAmountValue < 1) {
    setError('Total Loan Amount field cannot be negative');
  } else if(bankValue === '') {
    setError('Bank field cannot be blanked');
    return false;
  } else {
    return true;
  }

}

function setError(message) {
  swal(message);
}

function hideForm() {
  formSection.classList.add('form-slide-active');
  reviewSection.classList.add('after-active');
}

function populateReview() {
  // console.log(checkInputs())
  if(checkInputs()){
    const jsonFormData = buildJsonFormData();
    document.querySelector('.input-name').textContent = jsonFormData.name;
    document.querySelector('.input-address').textContent = jsonFormData.address;
    document.querySelector('.input-mobile').textContent = jsonFormData.mobile;
    document.querySelector('.input-email').textContent = jsonFormData.email;
    document.querySelector('.input-loan-amount').textContent = jsonFormData.tlamount;
    document.querySelector('.input-bank').textContent = jsonFormData.nameofbank; 
    let regex = /^[\d,\s,\+,\-]{5,20}/;
  const numberInput = document.querySelector('.form-input-number');
  console.log(numberInput.value.match(regex))
      if(!numberInput.value.match(regex)) {
      swal("Please write valid Phone Number");
      enableBtn();
  } else {
    hideForm();
  }
  }
}

// const formNextBtn = document.querySelector('form-next-btn');
formNextBtn.addEventListener('click', populateReview)

const submitBtns = document.querySelector('.form-submit-btn');
submitBtns.addEventListener('click', (e) => {
  e.preventDefault();
  // disableBtn();
  
    const jsonFormData = buildJsonFormData();
    // https://datapackage-1.herokuapp.com/
      fetch('https://datapackage-1.herokuapp.com/sfckhuserdata', {
        method: "post",
        // mode: 'cors',
        // credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonFormData)
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
   
          resetForm();
          openModal();
          addResponseToModal(data);
      })
 
})



async function setDialCode() {
    const apiKey = '9e561ac44bb67e58b5382b1ca6a9eb7cc51652aaca39f430509c2549';
    const request = await fetch(`https://api.ipdata.co?api-key=${apiKey}`, {
      method: "get",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await request.json();
    if(response) {
      const dialInput = document.querySelector('.form-input-number');
      dialInput.value = `+${response.calling_code}`;
    }

}
// setDialCode();

modalClose.forEach(each => {
  each.addEventListener('click', closeModal);
})






