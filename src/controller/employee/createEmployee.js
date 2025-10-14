import prismaclient from "../../prisma/prismaClient.js";
import bcrypt from "bcrypt";
export default class createEmployee {
  async Read(req, res) {}

  async create(req, res) {
    const { name, email, password } = req.body;

    

    const emailExiste = await prismaclient.funcionario.findUnique({
        where: {
          email,
        },
      });


    const PasswordHash = await bcrypt.hash(password, 10);

      if (emailExiste) {
        return res.status(400).json({ mensagem: "ocorreu um erro inesperado" });
      }
      if(name === "" || email === "" || password === ""){
         return res.status(400).json({mensagem:'ocorreu um erro inesperado'})
    }
   
      await prismaclient.funcionario.create({
        data: {
          name,
          email,
          password: PasswordHash,
        },
      });

      

      return res.status(201).json({ mensagem: "Criado com sucesso" });

  }
}
