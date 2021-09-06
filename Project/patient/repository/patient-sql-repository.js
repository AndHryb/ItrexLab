export default class PatientSqlRepository {
  constructor(model) {
    this.model = model;
  }

  async add(name, gender, birthday, userId) {
    const patient = await this.model.create({
      name,
      gender,
      birthday,
      userId,
    });

    return patient;
  }

  async getByName(name) {
    const patientlist = await this.model.findAll({
      where: {
        name,
      },
    });

    const resultList = [];
    for (const patient of patientlist) {
      resultList.push({
        patientId: patient.dataValues.id,
        name: patient.dataValues.name,
        regTime: (new Date(patient.dataValues.createdAt)).getTime(),
      });
    }

    return resultList;
  }

  async getById(patientId) {
    const patient = await this.model.findOne({
      where: {
        id: patientId,
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
        id: patientID,
      },
    });
    return deleteValue;
  }

  async getByUserId(userId) {
    const patient = await this.model.findOne({
      where: {
        userId,
      },
    });

    if (!patient) {
      return false;
    }
    console.log('Patient repo get byuser id>>>>>');
    console.log(patient);
    return patient;
  }
}
