import { Test } from '@nestjs/testing'
import { ColorsResolver } from './colors.resolver'
import { ColorsService } from './colors.service'
describe('ColorsResolver', () => {
  let resolver: ColorsResolver
  let colorsServiceMock: Partial<ColorsService>

  beforeEach(async () => {
    colorsServiceMock = {
      findAll: jest.fn().mockResolvedValue([{ id: 1, c_name: 'Red', c_hex: '#FF0000' }]),
      addNew: jest.fn().mockResolvedValue({ id: 1, c_name: 'Green', c_hex: '#00FF00' }),
      deleteColor: jest.fn().mockResolvedValue(null),
    }

    const moduleRef = await Test.createTestingModule({
      providers: [
        ColorsResolver,
        {
          provide: ColorsService,
          useValue: colorsServiceMock,
        },
      ],
    }).compile()

    resolver = moduleRef.get<ColorsResolver>(ColorsResolver)
  })

  // Тестирование получения списка цветов
  describe('findAll', () => {
    it('all colors fetched', async () => {
      const result = await resolver.findAll()
      expect(result).toEqual([{ id: 1, c_name: 'Red', c_hex: '#FF0000' }])
      expect(colorsServiceMock.findAll).toHaveBeenCalledTimes(1)
    })
  })

  // Тестирование добавления нового цвета
  describe('addNew', () => {
    it('added new color', async () => {
      const result = await resolver.addNew('Green', '#00FF00', '')
      expect(result).toEqual({ id: 1, c_name: 'Green', c_hex: '#00FF00' })
      expect(colorsServiceMock.addNew).toHaveBeenCalledWith('Green', '#00FF00', '')
    })
  })

  // Тестирование удаления цвета
  describe('deleteColor', () => {
    it('deleted color', async () => {
      const result = await resolver.deleteColor(1)
      expect(result).toBeNull()
      expect(colorsServiceMock.deleteColor).toHaveBeenCalledWith(1)
    })
  })
})