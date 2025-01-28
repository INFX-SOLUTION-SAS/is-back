import UnitOfMeasure from "../models/inventory/unitOfmesuare.js";

const UnitOfMeasureSeed = async () => {
  const units = [
    { name: 'kg' },
    { name: 'g' },
    { name: 'lb' },
    { name: 'oz' },
    { name: 'piece' },
    { name: 'L' },
    { name: 'mL' },
    { name: 'm' },
    { name: 'cm' },
    { name: 'box' },
    { name: 'pack' },
    { name: 'Tetra Pak' },
    { name: 'carton' },
    { name: 'lot' },
    { name: 'ud' }
  ];

  for (const unit of units) {
    await UnitOfMeasure.findOrCreate({ where: { name: unit.name } });
  }

  console.log('Unidades de medida cargadas correctamente.');
};

export default UnitOfMeasureSeed;
