import prismaclient from "../../prisma/prismaClient.js";
export default class appointments {

  async read(req, res) {
     const IdCliente = req.usersId
      const dados = await prismaclient.agendamentos.findMany({
        where:{
            paciente: {
              id:IdCliente
            }
        },
          select:{
             data:true,
             servico:true,
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
    const IdCliente = req.usersId;
    
    const { date , servico} = req.body;
  const dataISO = new Date(date).toISOString();
    await prismaclient.agendamentos.create({
      data: {
        data: dataISO,
        servico:servico,
        
        paciente:{
          connect:{id: IdCliente}
        }
      }})
console.log(IdCliente)
      return res.status(200).json({mensagem:'Criado com Sucesso'})

  }
  async update(req, res) {}
  async delete(req, res) {}
}
