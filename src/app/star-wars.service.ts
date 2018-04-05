import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: Http;

  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    // 要使用https
    this.http.get('https://swapi.co/api/people/')
      .map((response: Response) => {
        const data = response.json()
        const extractedChars = data.results
        const chars = extractedChars.map((char) => {
          return { name: char.name, side: '' }
        })
        return chars
      })
      .subscribe(
        (data) => {
          console.log(data)
          this.characters = data
          this.charactersChanged.next()
        }
      )
  }

  // 看哪一派，轉換陣營會render
  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice()
    }
    return this.characters.filter((char) => char.side === chosenList)
  }

  // 替角色選邊站
  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => char.name === charInfo.name)
    this.characters[pos].side = charInfo.side
    this.charactersChanged.next()
    this.logService.writeLog(`Changed side of ${charInfo.name}, new side: ${charInfo.side}`)
  }
  // 新增角色
  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => char.name === name)
    if (pos !== -1) {
      console.log('此角色已存在')
      return
    }
    const newChar = { name, side }
    this.characters.push(newChar)
  }
}
