import React from 'react';
import $ from 'jquery';
import { Tabs, Button, Spin } from 'antd';
import {API_ROOT, AUTH_PREFIX, GEO_OPTIONS, POS_KEY, TOKEN_KEY} from "../constants";

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;


export class Home extends React.Component {

    state = {
        loadingGeoLocation: false,
        error: '',
    }

    componentDidMount() {
        // use this.setState to change state
        this.setState({ loadingGeoLocation: true , error: '' }); //pass {} object literal
        this.getGeoLocation();
    } // don't write life cycle function as => function

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            this.setState({ error: 'Your browser does not support geolocation!'});
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({ loadingGeoLocation: false , error: '' }); // need set error '' in case it has error msg content
        const { latitude, longitude } = position.coords;
        localStorage.setItem('POS_KEY', JSON.stringify({lat: latitude, lon: longitude}));
        this.loadNearbyPosts();
    }

    onFailedLoadGeoLocation = () => {
        this.setState({ loadingGeoLocation: false, error: 'Failed to load geolocation!'});
    }

    getGalleryPanelGeolocation = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading geo location..."/>;
        } else {
            return null;
        }
    }

    loadNearbyPosts = () => {
        //const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        const lat = 37.7915953;
        const lon = -122.3937977;
        $.ajax({
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=20`,
            method: 'GET',
            headers: {
                Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`
            }
        }).then((response) => {
            console.log(response);
        },(error) => {
            console.log(error);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (

                <Tabs tabBarExtraContent={operations} className = "main-tabs">
                    <TabPane tab="Posts" key="1">
                        {this.getGalleryPanelGeolocation()}
                    </TabPane>
                    <TabPane tab="Map" key="2">Content of tab 2</TabPane>
                </Tabs>
        );
    }
}
