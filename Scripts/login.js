function validate(){
   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value
   if ( username == "jeff@jeffrey.com" && password == "jeff"){
   alert ("Login successfully");
   window.location = "profile.html"; // Redirecting to other page.
   return false;
   }
  else{
    return false;
  }
 }