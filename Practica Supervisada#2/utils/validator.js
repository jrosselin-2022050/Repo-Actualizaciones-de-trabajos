import { compare, hash } from "bcrypt";

export const encriptar = async (password) =>{
    try{
        return await hash (password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}

export const revisarPassword = async (password, hash)=>{
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err)
        return err
    }
}

