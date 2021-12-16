function validateInfo(username, password, password2){
    let errors = {}


    if(!password2){
        errors.password2 ="Obavezno je ponovno upisati lozinku"
    }else if(password !== password2){
        errors.password2 = "Lozinke se ne podudaraju";
    }

    return errors;
}


function validateUsername(username){
    let error;
    if(!username.trim()){
        error = "Korisničko ime je obavezno";
    }
    return error;
}

function validatePassword(password){
    if(!password){
        return "Lozinka obavezna"
    }else if(password.length <= 6){
        return "Lozinka prekratka. Lozinka mora imati najmanje 7 znakova.";
    }
}

function validatePasswordMatch(password, password2){

    if(!password2)
        return "Obavezno je ponovno upisati lozinku"
    else if(password !== password2)
        return "Lozinke se ne podudaraju";
}


export default validateInfo
export  {validateUsername}
export {validatePasswordMatch}
export {validatePassword}