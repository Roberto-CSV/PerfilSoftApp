export interface IService {
  create(dto);

  getAll();

  getById(id: number);

  update(id: number, dto);

  delete(id: number);

  existsById(id: number);
}
