
import UserRole from "../models/userRoles.js"
const UserRoleSeeder = async() => {

      let userrole = await UserRole.findOne()

      if(userrole == null)
      {
            UserRole.create({
                userId : '16b7cbff-3d0b-4dff-bc9c-5f96efa51e90',
                roleId:'16b7cbff-3d0b-4dff-bc9c-5f96efa51e91'
            })
      }

}

export default UserRoleSeeder