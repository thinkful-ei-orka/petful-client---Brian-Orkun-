import React, { Component } from 'react';
import UserContext from '../ContextProvider';
import './AdoptionPage.css';

export default class AdoptionPage extends Component {

    static contextType = UserContext;



    render() {
        const { pets, people, pushName, adopt } = this.context;
        const cat = pets.cats[0];
        const dog = pets.dogs[0];
   
        console.log(people)
        return (
            <div>
                <section className="people-in-line">
                    <h3>People in line:</h3>
                    {people.map((person) =>
                        <p key={person}>{person}</p>
                    )}
                </section>

                <form onSubmit={(ev) => pushName(ev)}>
                    <label htmlFor="enter-name">Enter your name to get in the list</label>
                    <input name="name" id="enter-name" type="text"></input>
                    <button type="submit">Enter</button>
                </form>

                <section className="cats">
                    <h4>Cats</h4>
                    <ul className="petsList">
                        {cat === undefined ? <p>No more cats :(</p> :
                            <li key={cat.name}>
                                <img src={cat.imageURL}></img>
                                <p>Name: {cat.name}</p>
                                <p>Sex: {cat.sex}</p>
                                <p>Age: {cat.age}</p>
                                <p>Breed: {cat.breed}</p>
                                <p>{cat.name}'s Story: {cat.story}</p>
                                {people[people.length - 1] !== people[0] ? <button disabled>Adoption Not Available</button> : <button onClick={() => adopt()}>Adopt Now!</button>}
                            </li>}
                    </ul>
                </section>
                <section className="dogs">
                    <h4>Dogs</h4>
                    <ul className="petsList">
                        {dog === undefined ? <p>No more dogs :(</p> :
                            <li key={dog.name}>
                                <img src={dog.imageURL}></img>
                                <p>Name: {dog.name}</p>
                                <p>Sex: {dog.sex}</p>
                                <p>Age: {dog.age}</p>
                                <p>Breed: {dog.breed}</p>
                                <p>{dog.name}'s Story: {dog.story}</p>
                                <button>Adopt</button>
                            </li>}
                    </ul>
                </section>

            </div>
        )
    }
}