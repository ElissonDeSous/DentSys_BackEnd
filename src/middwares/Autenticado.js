
import jwt from "jsonwebtoken";
export function Autenticado(req, res, next) {
  console.log(req.cookies)
  const token = req.cookies.token

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
