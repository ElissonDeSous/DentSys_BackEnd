import prisma from "../../prisma/prismaClient.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'


dotenv.config()

export default class AuthUsuarios {
  async auth(request, response) {
    const { email, password } = request.body;

    const usuario = await prisma.users.findFirst({
      where: {
        email,
      },
      
    });

    if (!usuario) {
      return response
        .status(400)
        .json({ mensagem: "ocorreu um erro email ou senha estão incorretos" });
    }
    const verificarSenha = await compare(password, usuario.password);

    if (!verificarSenha) {
      return response
        .status(400)
        .json({ mensagem: "ocorreu um erro email ou senha estão incorretos" });
    }

    const token = jwt.sign(
      {
        id:Number(usuario.id),
        username: usuario.name,
      },
      process.env.PALAVRA_SECRETA,
      { expiresIn: "1h" }
    );

 response.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path:"/",
  maxAge: 1000 * 60 * 15

});

    return response.status(200).json({mensagem:"Login relizado com sucesso"});
  }

}
