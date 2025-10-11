import prismaclient from "../../prisma/prismaClient.js";
import bcrypt from "bcrypt";
class createEmployee {
  async Read(req, res) {}

  async create(req, res) {
    const { name, email, password } = req.body;

    const PasswordHash = await bcrypt.hash(password, 10);

    try {
      await prismaclient.funcionario.create({
        data: {
          name,
          email,
          password: PasswordHash,
        },
      });

      const emailExiste = await prismaclient.funcionario.findUnique({
        where: {
          email,
        },
      });

      if (emailExiste) {
        return res.status(400).json({ menssagem: "Email ja existe" });
      }

      return res.status(200).json({ menssagem: "Criado com sucesso" });
    } catch (error) {}
  }
}
