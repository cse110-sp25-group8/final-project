// Bad Example

// Global variables using var (bad), mixed quotes, no semicolon, inconsistent indentation
var userName = "Admin"
function greetUser(username){
  if(username == "Admin"){
    console.log("Welcome, Admin")
    console.log("You have full access to the system")
  } else{
      console.log("Hello, " + username + "!")
  }
}

// Loose equality, no semicolon, mixed quotes, bad indentation
function checkAccess(role){
  if (role == "admin") 
  {
  console.log("Access granted")
  } 
  else 
  {
  console.log("Access denied")
  }
}

greetUser(userName)
checkAccess("admin")
