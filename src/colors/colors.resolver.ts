import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { v_color } from './v_color.entity'
import { ColorsService } from './colors.service'
@Resolver(of => v_color)
export class ColorsResolver {
  constructor(private readonly colorsService: ColorsService) {} // Dependency injection сервиса

  // Получить все цвета
  @Query(() => [v_color])
  async findAll(): Promise<v_color[]> {
    return await this.colorsService.findAll()
  }

  // Пагинация
  @Query(() => [v_color])
  async findPagination(@Args("limit") limit: number, @Args("offset") offset: number): Promise<v_color[]> {
    return await this.colorsService.findPagination(limit, offset)
  }

  // Найти цвет по имени
  @Query(() => v_color)
  async findByName(@Args("name") name: string): Promise<v_color | null> {
    return await this.colorsService.findByName(name)
  }

  // Добавить новый цвет
  @Mutation(() => v_color)
  async addNew(@Args("name") name: string, @Args("hex") hex: string, @Args("rgb") rgb: string): Promise<v_color> {
    return await this.colorsService.addNew(name, hex, rgb)
  }

  // Редактировать цвет
  @Mutation(() => v_color)
  async editColor(@Args("id") id: number, @Args("name", { nullable: true }) name?: string, @Args("hex", { nullable: true }) hex?: string, @Args("rgb", { nullable: true }) rgb?: string): Promise<v_color | null> {
    return await this.colorsService.editColor(id, name, hex, rgb)
  }

  // Удалить цвет
  @Mutation(() => v_color, { nullable: true })
  async deleteColor(@Args("id") id: number): Promise<v_color | null> {
    await this.colorsService.deleteColor(id)
    return null
  }
}