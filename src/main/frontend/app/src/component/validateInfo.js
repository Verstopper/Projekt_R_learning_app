function validateInfo(username, password) {
    let errors = {}
    if (!password) {
        return "Obavezno je upisati lozinku!";
    }
}

function validateUsername(username) {
    let error;
    if (!username.trim()) {
        error = "Korisničko ime je obavezno";
    }
    return error;
}

function validatePassword(password) {
    if (!password) {
        return "Lozinka obavezna"
    } else if (password.length <= 5) {
        return "Lozinka prekratka. Lozinka mora imati najmanje 6 znakova.";
    }
}

function validateOib(oib) {
    if (!oib) {
        return "Obavezan OIB";
    } else if (oib.length !== 11) {
        return "OIB mora sadržavati 11 znamenki";
    }

}

export {validateUsername}
export {validatePassword}
export {validateOib}
export {validateInfo}