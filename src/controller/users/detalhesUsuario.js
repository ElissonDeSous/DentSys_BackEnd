import prismaclient from "../../prisma/prismaClient.js";
export default class detalhesDoUsuario {
  async detalhesDoUsuario(request, response) {
    try {
      const idUsuarioAutenticado = request.usersId;
      

      const usuario = await prismaclient.users.findUnique({
        where: {
          id: idUsuarioAutenticado
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if(!usuario){
          return response.status(401).json({mensagem:"Usuario não encontrado"})
      }

      return response.status(200).json(usuario)
      
     
    } catch (error) {
     return response.status(500).json({ mensagem: error.message });
    }
  }
}
