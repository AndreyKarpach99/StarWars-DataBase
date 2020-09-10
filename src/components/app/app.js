import React, { Component } from 'react';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';

import SwapiService from '../../services/swapi-service';

import PeoplePage from '../people-page/people-page'

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';

import ErrorIndicator from '../../components/error-indicator/error-indicator'

import './app.css';


export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <div className="stardb-app">
        <Header />
        {planet}

        <PeoplePage />

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={(item) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={(item) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>


      </div>
    );
  }
}