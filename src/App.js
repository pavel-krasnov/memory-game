import React from 'react';
import Card from './Card';
import { pickCardPairsWithRandomColor } from './utils';
import './App.css';

const CARDS_NUMBER = 16;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: pickCardPairsWithRandomColor(CARDS_NUMBER),
            openCard: null,
            canClick: true
        };
    }

    onCardClick = (event) => {
        const {cards, openCard} = this.state;
        const id = Number(event.target.id.split('-')[1]);
        const newOpenCard = {...cards[id], open: true};
        let newCards = cards.map((item, index) => index === id ? newOpenCard : item);
        this.setState({...this.state, cards: newCards, canClick: false}, () => {
            if (openCard) { 
                if (openCard.color === newOpenCard.color) {
                    console.log('Color match!');
                    this.setState({...this.state, openCard: null, canClick: true});
                } else {
                    setTimeout(() => {
                        console.log('No match!');
                        newCards = cards.map((item, index) => index === id || index === openCard.id ? {...item, open: false} : item);
                        this.setState({...this.state, cards: newCards, openCard: null, canClick: true});
                    }, 1000);
                }
            } else {
                console.log('New open card!');
                this.setState({...this.state, openCard: newOpenCard, canClick: true});
            }
        });
    };

    onNewGameBtnClick = (event) => {
        event.preventDefault();
        this.setState({cards: pickCardPairsWithRandomColor(CARDS_NUMBER), openCard: null});
    };

    render() {
        const cardElements = this.state.cards.map((item, index) =>
            <Card
                key={index}
                id={item.id}
                color={item.color}
                open={item.open}
                onClick={this.state.canClick ? this.onCardClick : null} 
            />);
        return (
            <div id="app-container">
                <button id="new-game-btn" onClick={this.onNewGameBtnClick}>New game</button>
                <div id="cards-container">
                    {cardElements}
                </div>
            </div>
        );
    }
};