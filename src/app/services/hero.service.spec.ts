import { TestBed, inject } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HeroService } from './hero.service'
import { heroesData } from '../mock/heroes.mock'

describe('Hero service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    })
  })

  it('should retrieve heroes', inject(
    [HttpTestingController, HeroService], (httpMock: HttpTestingController, heroService: HeroService) => {
      heroService.getHeroes().subscribe(heroes => {
        expect(heroes).toEqual(heroesData)
      })

      const req = httpMock.expectOne('http://example.com/api/heroes')
      expect(req.request.method).toBe('GET')

      req.flush(heroesData)
      httpMock.verify()
    }
  ))

  it('should retrieve a hero by id', inject(
    [HttpTestingController, HeroService], (httpMock: HttpTestingController, heroService: HeroService) => {  
      heroService.getHero(1).subscribe(hero => {
        expect(hero).toEqual(heroesData[0])
      })

      const req = httpMock.expectOne('http://example.com/api/heroes/1')
      expect(req.request.method).toBe('GET')

      req.flush(heroesData[0])
      httpMock.verify()
    }
  ))

  it('should add a hero', inject(
    [HttpTestingController, HeroService], (httpMock: HttpTestingController, heroService: HeroService) => {
      const newHero = {
        id: 1,
        name: 'Flash',
        realName: 'Barry Allen',
        description: 'Flash hero',
        image: 'data'
      }
  
      heroService.addHero(newHero).subscribe(hero => {
        expect(hero).toEqual(newHero);
      })

      const req = httpMock.expectOne('http://example.com/api/heroes')
      expect(req.request.method).toBe('POST')

      req.flush(newHero)
      httpMock.verify()
    }
  ))

  it('should update a hero', inject(
    [HttpTestingController, HeroService], (httpMock: HttpTestingController, heroService: HeroService) => {
      const updatedHero = {
        id: 1,
        name: 'Superman 2',
        realName: 'Clark Kent 2',
        description: 'Superman hero 2',
        image: 'https://m.media-amazon.com/images/M/MV5BZGRhOGQ4YTEtNjNiYy00YjQxLWFiOTItYzRlYzg5ZGQ5MDNmXkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg'
      }
  
      heroService.updateHero(updatedHero).subscribe(response => {
        expect(response).toBeTruthy()
      })

      const req = httpMock.expectOne('http://example.com/api/heroes/1')
      expect(req.request.method).toBe('PUT')

      req.flush({})
      httpMock.verify()
    }
  ))

  it('should delete a hero', inject(
    [HttpTestingController, HeroService], (httpMock: HttpTestingController, heroService: HeroService) => {
      const heroId = 1;
  
      heroService.deleteHero(heroId).subscribe(response => {
        expect(response).toBeTruthy()
      })

      const req = httpMock.expectOne(`http://example.com/api/heroes/${heroId}`)
      expect(req.request.method).toBe('DELETE')
  
      req.flush({})
      httpMock.verify()
    }
  ))
})
