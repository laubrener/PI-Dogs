import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import * as data from "../api/src/db";
import Card from '../client/src/components/Card';

configure({ adapter: new Adapter() });

const session = require('supertest-session');
const route = require('../api/routes/index'); // Importo el archivo de entrada del server de express.
const model = require('../api/models/Temperament');
const front = require('../client/src/components/Card');
const routes = session(route);
const models = session(model);
const card = session(front);

describe('/dogs', function() {
    it('GET returns an array of all the breeds', function() {
        return supertest
          .get('/dogs')
          .expect(200)
          .expect('Content-Type', /json/)
      });
});

describe('`name`, `id`', function() {
    it('Model temperaments should have the properties name and ID', function(){
        expect(models).toEqual({name:{}, id:{}});
    })
})

let Card;
let [dog1, dog2, dog3] = data.dogs[0];

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  beforeEach(() => {
    Card = (el) =>
      shallow(
        <Card
          id={el.id}
          name={el.name}
          temperament={el.temperament}
          image={el.image}
          weightMin={el.weightMin}
          weightMax={el.weightMax}
        />
      );
    expect(isReact.classComponent(CharacterCard)).toBeFalsy();
  });
describe('<Card />',function() {
    it('Debería renderizar un tag "img" y utilizar como source la imagen del personaje', () => {
        expect(Card(dog1).find("img").at(0).prop("src")).toEqual(
          dog1.image
        );
        expect(Card(dog2).find("img").at(0).prop("src")).toEqual(
          dog2.image
        );
        expect(Card(dog3).find("img").at(0).prop("src")).toEqual(
          dog3.image
        );
      });
})