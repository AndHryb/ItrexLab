export default class ResolutionSqlRepository {
  constructor(model) {
    this.model = model;
  }

  async add(patientId, resolution) {
    const createdResolution = await this.model.create({
      patientId,
      resolution,
    });
    return createdResolution.id;
  }

  async getById(resolutionId) {
    const resolution = await this.model.findOne({
      where: {
        id: resolutionId,
      },
    });
    return resolution;
  }

  async getByPatientId(patientId) {
    const reqResolution = await this.model.findOne({
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
    const deleteValue = await this.model.destroy({
      where: {
        id: resolutionId,
      },
    });
    return deleteValue;
  }
}
