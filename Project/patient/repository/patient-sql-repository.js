export default class PatientSqlRepository {
  constructor(model) {
    this.model = model;
  }

  async add(name) {
    const patient = await this.model.create({
      name,
    });

    return patient.patientId;
  }

  async getByName(name) {
    const patientlist = await this.model.findAll({
      where: {
        name,
      },
    });

    const resultList = [];
    for (const patient of patientlist) {
      console.log('patient>>>>');
      console.log(this.model);
      console.log(patient.dataValues);

      resultList.push({
        patientId: patient.dataValues.patientId,
        name: patient.dataValues.name,
        regTime: (new Date(patient.dataValues.createdAt)).getTime(),
      });
    }

    return resultList;
  }

  async getById(patientId) {
    const patient = await this.model.findOne({
      where: {
        patientId,
      },
    });
    const result = {
      name: patient.name,
      regTime: (new Date(patient.createdAt)).getTime(),
    };
    if (result.name === undefined || result.regTime === undefined) {
      return false;
    }
    return result;
  }

  async delete(patientID) {
    const deleteValue = await this.model.destroy({
      where: {
        patientID,
      },
    });
    return deleteValue;
  }
}
