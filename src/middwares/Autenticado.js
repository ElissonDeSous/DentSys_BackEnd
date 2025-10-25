
import jwt from "jsonwebtoken";
export function AutenticadoCliente(req, res, next) {
  console.log(req.cookies)
  const token = req.cookies.tokenCliente

  console.log(token)
  

  if (!token) {
    console.log('token nao encontrado')
   return res.status(401).json({error:"Não Autorizado"});
  }


  try {
    const verificar = jwt.verify(token, process.env.PALAVRA_SECRETA);

   req.usersId = verificar.id

   console.log(req.usersId);
    next();
  } catch (error) {
   return res.status(401).end()
  }
}

 export function AutenticadoFuncionario(req,res,next){
     console.log(req.cookies)
      const  token = req.cookies.tokenFuncionario
      if(!token){
          res.status(400).json({error:'token não encontrado'})
      }

      const verificar = jwt.verify(token, process.env.PALAVRA_SECRETA)

      req.idFuncionario = verificar.id
      

      console.log(req.idFuncionario)

      next()
  }
