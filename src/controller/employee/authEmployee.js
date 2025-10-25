import prismaclient from "../../prisma/prismaClient.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export default class authEmployee{
    async auth(req,res){
        const {email, password} = req.body

        const usuario = await prismaclient.funcionario.findUnique({
            where:{email}
        })

        if(!usuario){
           return res.status(400).json({mensagem: 'Usuario não existe verifique email ou senha'})
        }

        const verificarSenha = await bcrypt.compare(password,usuario.password)

        if(!verificarSenha){
            return res.status(400).json({mensagem:'Usuario não existe verifique email ou senha'})
        }

        const tokenFuncionario = await jwt.sign({id:usuario.id},process.env.PALAVRA_SECRETA, {expiresIn: "1h"})

        res.cookie('tokenFuncionario', tokenFuncionario, {
              httpOnly:true,
              secure:true,
              sameSite:'none',
              path:'/detalhesFuncionario',
              maxAge: 100 * 60 * 60
        })

       return res.status(200).json({mensagem:'login feito com sucesso', tokenFuncionario})
    }
}
