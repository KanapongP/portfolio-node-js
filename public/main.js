document.querySelector('#myForm').addEventListener('submit', saveProfile);

function saveProfile(e) {
  //prevent initailize default form 
  e.preventDefault();

 
  var sub = document.querySelector('#Sub').value;
  var message = document.querySelector('#Message').value;
  var name = document.querySelector('#Name').value;
  var gender = document.querySelector('#Gender').value;
  var phone = document.querySelector('#Phone').value;
  var email = document.querySelector('#Email').value;
  
  var Profile = {
    sub: sub,
    message: message,
    name: name,
    gender: gender,
    phone: phone,
    email: email
  }
  //check input data
  console.log(Profile);

  if (localStorage.getItem('Profiles') === null) { //initial
    var Profiles = [];
    Profiles.push(Profile);
    localStorage.setItem('Profiles', JSON.stringify(Profiles));
  } else {
    var Profiles = JSON.parse(localStorage.getItem('Profiles'));
    Profiles.push(Profile);
    localStorage.setItem('Profiles', JSON.stringify(Profiles));
  }
  
  // Clear fields
  document.querySelector('#Sub').value = '';
  document.querySelector('#Message').value = '';
  document.querySelector('#Name').value = '';
  document.querySelector('#gender').value = '';
  document.getElementById('Gender').checked = false;
  document.querySelector('#phone').value = '';
  document.querySelector('#email').value = '';

  fetchProfile();  
}

function deleteProfile(data) {
  var Profiles = JSON.parse(localStorage.getItem('Profiles'));

  for (var i=0; i<Profiles.length; i++) {
    if (Profiles[i].phone === data) {
      Profiles.splice(i,1);
    }
  }

  localStorage.setItem('Profiles', JSON.stringify(Profiles));

  fetchProfile();
}
function fetchProfile() {
    var Profiles = JSON.parse(localStorage.getItem('Profiles'));
  
    var profileResults = document.querySelector('#profileResults');
  
    profileResults.innerHTML = '';
  
    var str = '<div class="card-deck text-center">';
    
    for (var i=0; i<Profiles.length; i++) {
      var subject = Profiles[i].sub;
      var message = Profiles[i].message;
      var name = Profiles[i].name;
      var gender = Profiles[i].gender;
      var phone = Profiles[i].phone;
      var email = Profiles[i].email;
        
      str += '<div class="offset-1 col-3 ">' 
      + `<div class="card mb-5 ">`
      + `<div class="card-header"style="background-color:RebeccaPurple;" ><h5 class="my-0">${name}</h5></div>`
      + `<div class="card-body" style="background-color:RoyalBlue  ; ">`
      + `<p style="font-size:120%;">Subject:${subject}</p>`
      + `<p style="font-size:120%;">Message:${message}</p>`
      + `<p style="font-size:120%;">Gender:${gender}</p>`
      + `<p style="font-size:120%;">Phone:${phone}</p>`
      + `<p style="font-size:120%;">Email:${email}</p>`
      + ` <a onclick="deleteProfile('${phone}')" class="btn btn-danger" href="#">Delete</a>`
      + `</div></div></div>`;
}
str += '</div>'
  
    profileResults.innerHTML = str;
  }
  
