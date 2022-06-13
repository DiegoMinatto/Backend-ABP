const Reservas = require('../model/Reservas')
const Salar = require('../model/Salas')


module.exports = {
  async reserva(req, res) {

    if (!req.body.id_sala) {
        return res.status(400).json({ err: 'Você deve fornecer a sala!' })
    }

    if (!req.body.nome_reserva) {
        return res.status(400).json({ err: 'Você deve o nome de quem reservou!' })
    }

    const hasChave = await Salas.findOne({ where: { id: req.body.id_sala } });

    if (!hasChave) {
      return res.status(400).json({ err: 'Sala inexistente!' })
    }
  
    const reserva = await Reservas.create(req.body);

    res.status(200).json({ msg: 'Reserva criada com sucesso!', reserva: reserva })

  },

  async devolve(req, res) {

    if (!req.params.id) {
        return res.status(400).json({ err: 'Você deve fornecer um id!' })
    }

    const reserva = await Reservas.findOne({where: {id: req.params.id}});

    if (!reserva) {
        return res.status(400).json({ err: 'Reserva inexistente!'})
    }

    const newReserva = await reserva.update({data_entrega: new Date()})

    res.status(200).json({ msg: 'Sucesso na devolução!', reserva: newReserva })
  },

  async recupera(req, res){
    const reservas = await Reservas.findAll({where:{data_entrega: null}})
    res.status(200).json(reservas)
  }
}