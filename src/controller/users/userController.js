import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcrypt";
export default class Usuarios {
  async buscarUsuarios(request, response) {
    const paciente = request.query.paciente;

    const usuarios = await prisma.users.findMany({
     
    });

    response.status(200).json(usuarios);
  }

  async criarUsuarios(request, response) {
    const { nome, email, senha}  = request.body
   

    const emailExiste = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    const SenhaCriptografada = await bcrypt.hash(senha, 10);

    if (emailExiste) {
      return response.status(400).json({ mensagem: " verifique se todos os campos estão corretos" });
    }

     if(nome === "" || email === "" ||  senha === ""){
       return response.status(400).json({mensagem:" verifique se todos os campos estão corretos"})
    }

    await prisma.users.create({
      data: {
        name: nome,
        email: email,
        password: SenhaCriptografada,
      },
    });


   return response.status(201).json({ mensagem: "criado com sucesso" });
  }
}
