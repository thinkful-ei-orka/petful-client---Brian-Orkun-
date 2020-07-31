import React, { Component, NavLink } from 'react';
import './LandingPage.css';
import UserContext from '../ContextProvider';



export default class LandingPage extends Component {

    static contextType = UserContext;

  

    render() {
        let pets = this.context.pets;
        let people = this.context.people;
        console.log(pets)
        console.log(people)
        // if (pets.cats.length === 0 || pets.dogs.length === 0) {
        //     return <div>Loading...</div>
        // }
        return (
            <section className="LandingPage-wrapper">
                <h1>Welcome to<br />PetFul</h1>
                <h2>Adoption Process:</h2>
                <p>Please get in line to adopt the next dog or cat waiting to be adopted.</p>
                <p>If you choose to adopt a cat or a dog when it's your turn, select adopt, and our friendly system will walk you through the process of adoption.</p>
                <p>All of our animals are current on shot and health records and are played with daily to keep them accustomed to being around people.</p>
                <h3>Cats Up For Adoption:</h3>
                {pets !== null ? pets.cats.map(cat => <div key={cat.name}><img src={cat.imageURL} alt={cat.name} /></div>)  : <div>Loading...</div>}
                <h3>Dogs Up For Adoption:</h3>
                {pets !== null ? pets.dogs.map(dog => <div key={dog.name}><img src={dog.imageURL} alt={dog.name} /></div>)  : <div>Loading...</div>}
                <button onClick={e => this.props.history.push('/adoption')}>Start Adoption Process</button>
            </section>
        )
    }
} 

