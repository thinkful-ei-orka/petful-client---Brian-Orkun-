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
        if (pets.cats.length === 0 || pets.dogs.length === 0) {
            return <div>Loading...</div>
        }
        return (
            <section className="LandingPage-wrapper">
                <h1>Welcome to<br />PetFul</h1>
                <h2>Adoption Process:</h2>
                <p>Please get in line to adopt the next dog or cat waiting to be adopted.</p>
                <p>If you choose to adopt a cat or a dog when it's your turn, select adopt, and our friendly system will walk you through the process of adoption.</p>
                <p>All of our animals are current on shot and health records and are played with daily to keep them accustomed to being around people.</p>
                {pets !== null ? <div><h3>Next Cat In Line:</h3><img className="first-cat" src={pets.cats[0].imageURL}></img><h3>Next Dog In Line:</h3><img className="first-dog" src={pets.dogs[0].imageURL}></img></div> : <div>Loading...</div>}
                <button onClick={e => this.props.history.push('/adoption')}>Start Adoption Process</button>
            </section>
        )
    }
} 