import React, { Component } from 'react';
import LandingPage from './LandingPage/LandingPage';
import { Route } from 'react-router-dom';
import UserContext from './ContextProvider';
import AdoptionPage from './AdoptionPage/AdoptionPage';
import { withRouter } from 'react-router-dom';
import faker from 'faker';
import config from '../src/config';

class App extends Component {

  state = {
    loading: true,
    pets: { cats: [], dogs: [] },
    people: [],
    currentUser: '',
    show: false,
    count: 0
  }

  componentDidMount() {
    this.getAllPets();
    this.getAllPeople();
  }

  firstPersonOut = () => {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        this.getAllPeople()
        if (this.state.pets.cats.length) {
          console.log('cats')
          this.adoptCats();
        }
        else {
          console.log('dogs')
          this.adoptDogs();
        }
      })
  }

  addName = (name) => {
    fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name
      })
    })
      .then(() => {
        this.setState({ people: [...this.state.people, name] })
      })
  }

  pushName = (ev) => {
    ev.preventDefault();
    const { name } = ev.target;
        this.addName(name.value)
        this.setState({currentUser: name.value})
        this.timer = setInterval(() => {
          if (this.state.people.length > 1) {
            this.firstPersonOut()
          } else {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
              if (this.state.count < 4) {
                this.addName(faker.name.findName())
                this.setState({count : this.state.count + 1})
              }
              else {
                clearInterval(this.timer)
              }
            }, 5000)
          }
        }, 5000);
  }

  adopt = () => {
    this.firstPersonOut()
    this.setState({ show: true })
  }


  componentWillUnmount() {
    clearInterval(this.timer);
  }


  getAllPets = () => {
    return fetch(`${config.API_ENDPOINT}/pets`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else {
          throw new Error('Bad response')
        }
      })
      .then((data) => {
        this.setState({ pets: data })
      })
  }

  getAllPeople = () => {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else {
          throw new Error('Bad response')
        }
      })
      .then((data) => {
        console.log(data)
        this.setState({ people: data })
      })
  }

  adoptCats = () => {
    return fetch(`${config.API_ENDPOINT}/pets/cats`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log('cat deleted')
        this.getAllPets()
      })
  }


  adoptDogs = () => {
    return fetch(`${config.API_ENDPOINT}/pets/dogs`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log('dog deleted')
        this.getAllPets()
      })
  }


  // Adoption page
  // Landing Page
  render() {
    let pets = this.state.pets;
    let people = this.state.people;
    let loading = this.state.loading;
    console.log(this.state.pets)
    return (
      <UserContext.Provider
        value={{
          loading: loading,
          people: people,
          pets: pets,
          getAllPets: this.getAllPets,
          adoptCats: this.adoptCats,
          adoptDogs: this.adoptDogs,
          getAllPeople: this.getAllPeople,
          pushName: this.pushName,
          adopt: this.adopt,
          show: this.state.show,
          currentUser: this.state.currentUser
        }}
      >
        <main className="App">
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/adoption" component={AdoptionPage}></Route>
        </main>
      </UserContext.Provider>
    );
  }

}

export default withRouter(App);