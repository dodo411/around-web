import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { GEO_OPTIONS} from "../constants";

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
