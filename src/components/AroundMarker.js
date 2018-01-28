import React from 'react';
import {Marker, InfoWindow} from 'react-google-maps';

export class AroundMarker extends React.Component {
    state = {
        isOpen: false,
    }

    onToggleOpen = () => {
        console.log('onToggleOpen start ' + this.state.isOpen);
        this.setState((prevState) => ({ isOPen: !prevState.isOpen }));
        console.log('onToggleOpen end ' + this.state.isOpen);
    }

    render() {
        const post = this.props.post;
        const { location, user, message} = post;
        const {lat, lon} = location;
        return (
            <Marker
                position={{ lat: lat, lng: lon }}
                onMouseOver={this.onToggleOpen}
                onMouseOut={this.onToggleOpen}
            >
                {this.state.isOpen ?
                    <InfoWindow onCloseClick={this.onToggleOpen}>
                        <div>
                            <img className="around-marker-image" src={post.url} alt="Image"/>
                            <p>{`${user}: ${message}`}</p>
                        </div>
                        {console.log('isOpen = true')}
                    </InfoWindow> : console.log('isOpen = false')}
            </Marker>
        )
    }
}