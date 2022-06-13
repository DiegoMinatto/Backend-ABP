const Salas = require('../model/Salas')


module.exports = {
  async cadastra(req, res) {

    try {

      if (!req.body.sala) {
        return res.status(400).json({ err: 'Você deve fornecer a sala!' })
      }

      const hasChave = await Salas.findOne({ where: { sala: req.body.sala } });

      if (hasChave) {
        return res.status(400).json({ err: 'Chave já cadastrada!' })
      }

      var newChave = await Salas.create(req.body);

      res.status(200).json({ msg: 'Cadastrado com sucesso!', chave: newChave })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ err: 'Erro interno!' })
    }

  },

  async recupera(req, res){
    try {
      const chaves = await Salas.findAll({attributes: ['id', 'sala', 'observacao' ]});
      res.status(200).json(chaves);
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

      const chave = await Salas.findOne({ where: { id: req.params.id } });

      if((req.body.sala) && (chave.dataValues.sala !== req.body.sala) ){
        const hasChave = await Salas.findOne({ where: { sala: req.body.sala } });
        if (hasChave) {
          return res.status(400).json({ err: 'Chave já cadastrada!' })
        }
      }

      
      if (!chave) {
        return res.status(400).send({ err: "Chave não encontrada!" });
      }

      chave.update(req.body)

      res.status(200).json({ msg: 'Editado com sucesso!', chave: chave })

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

      const chave = await Salas.findOne({ where: { id: req.params.id } });

      
      if (!chave) {
        return res.status(400).send({ err: "Chave não encontrada!" });
      }

      chave.destroy()

      res.status(200).json({ msg: 'Deletado com sucesso!' })

    } catch (error) {
      console.log(error)
      return res.status(500).json({ err: 'Erro interno!' })
    }
  },

}