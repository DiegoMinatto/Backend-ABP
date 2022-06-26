const Reservas = require('../model/Reservas')
const Salas = require('../model/Salas')


module.exports = {
  async reserva(req, res) {

    if (!req.body.sala_id) {
        return res.status(400).json({ err: 'Você deve fornecer a sala!' })
    }

    if (!req.body.nome_reserva) {
        return res.status(400).json({ err: 'Você deve o nome de quem reservou!' })
    }

    const hasChave = await Salas.findOne({ where: { id: req.body.sala_id } });

    if (!hasChave) {
      return res.status(400).json({ err: 'Sala inexistente!' })
    }

    const hasReserva = await Reservas.findOne({where: {sala_id: req.body.sala_id, data_entrega: null}})

    if (hasReserva) {
      return res.status(400).json({ err: 'Sala já reservada!' })
    }
  
    const reserva = await Reservas.create(req.body);

    res.status(200).json({ msg: 'Reserva criada com sucesso!', reserva: reserva })

  },

  async devolve(req, res) {

    if (!req.body.id) {
        return res.status(400).json({ err: 'Você deve fornecer um id!' })
    }

    const reserva = await Reservas.findOne({where: {id: req.body.id}, include: [{model: Salas}]});


    if (!reserva) {
        return res.status(400).json({ err: 'Reserva inexistente!'})
    }

    const newReserva = await reserva.update({data_entrega: new Date()})

    res.status(200).json({ msg: 'Sucesso na devolução!', reserva: newReserva, chave: {value: reserva.dataValues.Sala.dataValues.id, label: reserva.dataValues.Sala.dataValues.sala} })
  },

  async recupera(req, res){
    const reservas = await Reservas.findAll({attributes: ['id', 'nome_reserva', 'createdAt'], include:{model: Salas, as: 'Sala', attributes: ['sala']}, where:{data_entrega: null}})
    
    var temp = [];

    reservas.forEach(element => {

      temp.push({id: element.dataValues.id, nome_reserva: element.dataValues.nome_reserva, createdAt: element.dataValues.createdAt, sala: element.dataValues.Sala.sala})
      
    });
    
    res.status(200).json(temp)
  }
}