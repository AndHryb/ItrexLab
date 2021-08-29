export default class ResolutionSqlRepository {
  constructor(model) {
    this.model = model;
  }

  async add(patientId, resolution) {
    const createdResolution = await this.model.create({
      patientId,
      resolution,
    });
    return createdResolution.resolutionId;
  }

  async getById(resolutionId) {
    const resolution = await this.model.findOne({
      where: {
        resolutionId,
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

    const result = {
      resolutionId: reqResolution.resolutionId,
      patientId: reqResolution.patientId,
      resolution: reqResolution.resolution,
      regTime: (new Date(reqResolution.createdAt)).getTime(),
    };

    if (result.resolutionId === undefined
        || result.patientId === undefined
        || result.resolution === undefined
        || result.regTime === undefined) {
      return false;
    }

    return result;
  }

  async delete(resolutionId) {
    const deleteValue = await this.model.destroy({
      where: {
        resolutionId,
      },
    });
    return deleteValue;
  }
}
