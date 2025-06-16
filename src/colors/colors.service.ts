import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { v_color } from './v_color.entity'

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(v_color) private readonly repository: Repository<v_color>
  ) {}

  // Метод для получения всех цветов
  async findAll(): Promise<v_color[]> {
    return await this.repository.find()
  }

  // Метод для пагинации
  async findPagination(limit: number, step: number): Promise<v_color[]> {
    return await this.repository.find({
      skip: step,
      take: limit,
    })
  }

  // Найти цвет по названию
  async findByName(name: string): Promise<v_color | null> {
    return await this.repository.findOne({ where: { c_name: name } })
  }

  // Добавить новый цвет
  async addNew(name: string, hex: string, rgb: string): Promise<v_color> {
    const newColor = this.repository.create({
      c_name: name,
      c_hex: hex,
      c_rgb: rgb,
    })
    return await this.repository.save(newColor)
  }

  // Редактировать цвет
  async editColor(id: number, name?: string, hex?: string, rgb?: string): Promise<v_color | null> {
    const legacyData = await this.repository.findOne({ where: { id } })
    if (!legacyData) {
      throw new Error('Такого цвета нет')
    }
    if (name) legacyData.c_name = name
    if (hex) legacyData.c_hex = hex
    if (rgb) legacyData.c_rgb = rgb
    return await this.repository.save(legacyData)
  }

  // Удалить цвет
  async deleteColor(id: number): Promise<void> {
    const colorToDelete = await this.repository.findOne({ where: { id } })
    if (!colorToDelete) {
      return
    }
    await this.repository.remove(colorToDelete)
  }
}