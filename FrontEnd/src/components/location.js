import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        position: 'absolute',
        width: '100%',
        height: '90%'
    }
};
export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);

		const lat = this.props.panLat;
		const lng = this.props.panLng;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }
	
	//Centers arround current location if centerAroundCurrentLocation == true and proceeds to load map
    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

	//Checks on state and prop updates, takes actions accordingly
    componentDidUpdate(prevProps, prevState) {
		
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
		if (prevProps.panLat !== this.props.panLat || prevProps.panLng !== this.props.panLng) {
            this.recenterMap();
        }
		if (prevProps.users != this.props.users) {
			this.renderChildren();
		}
    }

	//Creates a new Map object
    loadMap() {
        if (this.props && this.props.google) {
            // checks if google is available
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;

            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);

            let { zoom } = this.props;
			const current = this.state.currentLocation;
            const center = new maps.LatLng(current.lat, current.lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );
            // maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
        }
    }

	//Recenters an existing map object
    recenterMap() {
        const map = this.map;
        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(this.props.panLat, this.props.panLng);
            map.panTo(center);
        }
    }
    
	//Renders map
    renderChildren() {
        const { children } = this.props;

        if (!children) return;


        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);

        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}
export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 48.305862,
        lng: 14.286444
    },
    centerAroundCurrentLocation: true,
    visible: true
};
