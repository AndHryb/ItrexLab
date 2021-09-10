export default class ResolutionSqlRepository {
  constructor(resolutions, patients) {
    this.resolutionsModel = resolutions;
    this.patientsModel = patients;
  }

  async add(patientId, resolution) {
    const createdResolution = await this.resolutionsModel.create({
      patientId,
      resolution,
    });
    return createdResolution.id;
  }

  async getById(resolutionId) {
    const resolution = await this.resolutionsModel.findOne({
      where: {
        id: resolutionId,
      },
    });
    return resolution;
  }

  async getByPatientId(patientId) {
    const reqResolution = await this.resolutionsModel.findOne({
      where: {
        patientId,
      },
    });
    if (!reqResolution) {
      return false;
    }

    return reqResolution;
  }

  async delete(resolutionId) {
    const deleteValue = await this.resolutionsModel.destroy({
      where: {
        id: resolutionId,
      },
    });
    return deleteValue;
  }

  async getByName(name) {
    const patientlist = await this.resolutionsModel.findAll({
      where: {
        name,
      },
      include: this.patientsModel,
    });
    return patientlist;
  }
}
