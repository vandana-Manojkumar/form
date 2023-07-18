let inputname = document.getElementById("entername");
let inputemail = document.getElementById("enteremail");
let form = document.getElementById("formid");
let pname = document.getElementById("pname");
let pemail = document.getElementById("pemail");
let selectel = document.getElementById("select");
let gendermaleEl = document.getElementById("gendermale");
let genderfemaleEl = document.getElementById("genderfemale");

let formData = {
  name : "",
  email: "",
  status : "Active",
  gender : "Male" 
};

selectel.addEventListener("change",function(event){
  formData.status = event.target.value;
});

gendermaleEl.addEventListener("change",function(event){
  formData.gender = event.target.value;
});

genderfemaleEl.addEventListener("change",function(event){
  formData.gender = event.target.value;
});

inputname.addEventListener("change", function(event){
  if(event.target.value === ""){
      pname.textContent = "Required *";
  }
  else{
    pname.textContent = "";
  }
  formData.name = event.target.value;
});

inputemail.addEventListener("change",function(event){
if(event.target.value === ""){
  pemail.textContent = "Required *"
}
else{
  pemail.textContent = "";
}
formData.email = event.target.value;
});


function validateFormData(formData) {
  let {name, email} = formData;
  if (name === "") {
    pname.textContent = "Required *";
  }
  if (email === ""){
    pemail.textContent = "Required *";
  }
}

function submitFormData(formData) {
  let options = {
    method : "POST",
    headers : {
      'Content-Type' : "application/json",
       Accept : "application/json",
       Authorization : "Bearer 3ec0e84772bac8789b29ebd43a2b9980c67d4c55bf72f0762cceb8e07a20bc54",
    },
    body : JSON.stringify(formData)
  };

  let url = "https://gorest.co.in/public-api/users";

  fetch(url,options)
  .then(function(response){
    return response.json();
  })
  
  .then(function(jsonData){
    console.log(jsonData);
    if(jsonData.code === 422){
      if(jsonData.data[0].message === "has already been taken"){
        pemail.textContent = "Email already exists";
      }
    }
  });
}

form.addEventListener("submit",function(event){
  event.preventDefault();
  console.log(formData);
  validateFormData(formData);
  submitFormData(formData);
});