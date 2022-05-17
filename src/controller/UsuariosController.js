const jwt = require('jsonwebtoken');
const Users = require('../model/Users')
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 86400,
  });
}

module.exports = {
    async cadastra(req, res) {
    
      var password_hash = password_hash = await bcrypt.hash(password, 8);
    
      await delete user.dataValues['password_hash'];

    },
    
   
  async login(req, res) {
    const { usuario, senha } = req.body;
    if (!usuario || !senha)
      return res.status(400).send({ error: "Usuário ou senha inválidos" });

    if((usuario !== 'admin') || (senha !== 'root'))
      return res.status(400).send({ error: "Usuário ou senha inválidos" });

    res.status(200).json({token: generateToken({id: 1}) })
      
  
  },
}