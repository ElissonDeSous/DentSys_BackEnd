import prismaclient from "../../prisma/prismaClient.js";
export default class detalhesFuncionario{
    async detalhess(req,res){
           const funcionarioId = req.idFuncionario

           const dados = await prismaclient.funcionario.findUnique({
            where:{id:funcionarioId},
            select:{id:true,name:true,email:true}

           })

           res.status(200).json(dados)
    }
}