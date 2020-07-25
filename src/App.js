import React, { Component } from 'react';
import LandingPage from './LandingPage/LandingPage';
import { Route } from 'react-router-dom';
import UserContext from './ContextProvider';
import AdoptionPage from './AdoptionPage/AdoptionPage';
import { withRouter } from 'react-router-dom';

class App extends Component {

  state = {
    loading: true,
    pets: { cats: [], dogs: [] },
    people: [],
    currentUser: ''
  }

  componentDidMount() {
    this.getAllPets();
    this.getAllPeople();
  }

  firstPersonOut = () => {
    if (this.state.people.length <= 1) {
      clearInterval(this.timer); 
      return
    }
    return fetch('http://localhost:8000/api/people', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        this.getAllPeople()
      })
  }


  pushName = (ev) => {
    ev.preventDefault();
    const { name } = ev.target;
    const people = this.state.people;
    fetch('http://localhost:8000/api/people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value
      })
    })
      .then(() => {
        this.setState({ people: [...this.state.people, name.value] })
        this.timer = setInterval(() => {
          this.firstPersonOut()
          if (this.state.pets.cats.length) {
            console.log('cats')
            this.adoptCats();
          }
          else {
            console.log('dogs')
            this.adoptDogs();
          }
        }, 5000);
      })
  }

  adopt = () => {
    this.firstPersonOut()
    if (this.state.pets.cats.length) {
      console.log('cats')
      this.adoptCats();
    }
    else {
      console.log('dogs')
      this.adoptDogs();
    }
    console.log('hello')
  }


  componentWillUnmount() {
    clearInterval(this.timer);
  }


  getAllPets = () => {
    return fetch('http://localhost:8000/api/pets')
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
    return fetch('http://localhost:8000/api/people')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        else {
          throw new Error('Bad response')
        }
      })
      .then((data) => {
        this.setState({ people: data })
      })
  }

  adoptCats = () => {
    return fetch('http://localhost:8000/api/pets/cats', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        console.log('cat deleted')
        this.getAllPets()
      })
  }


  adoptDogs = () => {
    return fetch('http://localhost:8000/api/pets/dogs', {
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
          adopt : this.adopt
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