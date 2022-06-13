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

    try {

      if (!req.body.nome) {
        return res.status(400).json({ err: 'Você deve fornecer um nome!' })
      }
      if (!req.body.usuario) {
        return res.status(400).json({ err: 'Você deve fornecer um usuario!' })
      }
      if (!req.body.password) {
        return res.status(400).json({ err: 'Você deve fornecer uma senha!' })
      }


      const hasUser = await Users.findOne({ where: { usuario: req.body.usuario } });

      if (hasUser) {
        return res.status(400).json({ err: 'O usuário fornecido já existe!' })
      }

      var password_hash = await bcrypt.hash(req.body.password, 8);

      var package = { nome: req.body.nome, usuario: req.body.usuario, password_hash: password_hash };

      var newUser = await Users.create(package);

      await delete newUser.dataValues['password_hash'];

      res.status(200).json({ msg: 'Cadastrado com sucesso!', user: newUser })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ err: 'Erro interno!' })
    }

  },

  async recupera(req, res){
    try {
      const users = await Users.findAll({attributes: ['id', 'nome', 'usuario', 'ativo' ]});
      res.status(200).json(users);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ err: 'Erro interno!' })
    }
  },

  async edita(req, res){
    try {

      if (!req.params.id) {
        return res.status(400).json({ err: 'Você deve fornecer um id!' })
      }

      const user = await Users.findOne({ where: { id: req.params.id } });

      
      if (!user) {
        return res.status(400).send({ err: "Usuário não encontrado!" });
      }

      var data = {...req.body};

      if(req.body.password){
        var password_hash = await bcrypt.hash(req.body.password, 8);
        data = {...{password_hash: password_hash}};
      }

      var newUser = await user.update(data)

      await delete newUser.dataValues['password_hash'];

      res.status(200).json({ msg: 'Editado com sucesso!', user: newUser })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ err: 'Erro interno!' })
    }
  },

  async delete(req, res){
    try {

      if (!req.params.id) {
        return res.status(400).json({ err: 'Você deve fornecer um id!' })
      }

      const user = await Users.findOne({ where: { id: req.params.id } });

      
      if (!user) {
        return res.status(400).send({ err: "Usuário não encontrado!" });
      }

      user.destroy()

      res.status(200).json({ msg: 'Deletado com sucesso!' })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ err: 'Erro interno!' })
    }
  },

  async login(req, res) {

    try {
      if (!req.body.usuario || !req.body.senha)
        return res.status(400).send({ err: "Usuário ou senha inválidos" });

      var user = await Users.findOne({ where: { usuario: req.body.usuario } });

      if (!user) {
        return res.status(400).send({ err: "Usuário ou senha inválidos" });
      }

      const passwordExist = await bcrypt.compare(req.body.senha, user.dataValues.password_hash);
      if (!passwordExist)
        return res.status(400).send({ err: "Usuário ou senha inválidos" });

      await delete user.dataValues['password_hash'];

      res.status(200).json({ token: generateToken({ id: user.dataValues.id }), user: user })


    } catch (error) {
      console.log(error)
      return res.status(500).json({ err: 'Erro interno!' })
    }


  },
}