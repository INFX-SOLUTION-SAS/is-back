import RoleService from "../services/general/RoleService.js";

class roleController {
 getRoles = async (req, res) => {
  try {
    const { withstatic  } = req.query;
    const roles = await RoleService.getAllRoles(withstatic);
    return res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

}

export default new roleController()