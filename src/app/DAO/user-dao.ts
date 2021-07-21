import {User} from '../../database/models/user'
class UserRepository{
    static async getUserbyEmail(email:string):Promise<User|null>{
        try{
            return User.findOne({
                where:{email:email}
            })
        }catch(err){
            throw err
        }
    }
    static async create(user:any):Promise<any>{
        const {password,email,username} = user;
        const newuser = await User.create({
            email : email,
            password: password,
            username: username
        });     
        return newuser
    }

    static async getUserbyId(id:string):Promise<any>{
         try{
            return User.findOne({
                where:{userId:id}
            })
        }catch(err){
            throw err
        }
    }
}

export default UserRepository