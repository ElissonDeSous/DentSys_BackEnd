import prismaclient from "../../prisma/prismaClient.js";
export default class appointments {
  async read(req, res) {
     
      const dados = await prismaclient.agendamentos.findMany({
          select:{
             data:true,
             paciente:{
                select:{
                  name:true,
                  email:true
                }
             }
          }
      })
       

      res.status(200).json({dados}) 
  }

  async create(req, res) {
    const { date,  pacienteId,funcionarioId} = req.body;

    await prismaclient.agendamentos.create({
      data: {
        data: date,
        paciente: {
          connect: { id:pacienteId },
        },
      },

      include: {
        paciente: true,
        funcionario:true
      },
    });

    console.log(pacienteId)

    res.status(201).json({ mensagem: "Criado com sucesso" });
  }
  async update(req, res) {}
  async delete(req, res) {}
}
