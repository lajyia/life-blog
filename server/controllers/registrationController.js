class RegistrationController {
    async addUser(req, res){
        res.send('REGISTARTION SUCCESSFULL');
    }
}


module.exports = new RegistrationController();