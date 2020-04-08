import React from 'react';

const DEFAULT_COLOR = 'grey';

export default class Card extends React.Component {
    render() {
        const { id, color, open, onClick } = this.props;
        return (
            <div
                key={id}
                className="card"
                id={'card-' + id}
                style={{backgroundColor: open ? color : DEFAULT_COLOR}}
                onClick={open ? null : onClick}
            ></div>
        );
    }
};