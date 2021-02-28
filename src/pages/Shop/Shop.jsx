import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';

class ShopPage extends React.Component{

    componentDidMount() {

        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();


        // const collectionRef = firestore.collection('collections');

        //Using Observables and observer pattern  
        // collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});
        // });

        //Alternative approach using promises pattern
            // collectionRef.get().then(snapshot => {
            // const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // updateCollections(collectionsMap);
            // this.setState({loading: false});
            // });
        

        //We can use fetch too but it will be highly nested.
    }

    render() {
        const { match } = this.props;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    component={CollectionOverviewContainer}
                />

                <Route 
                    path={`${match.path}/:collectionId`} 
                    component = {CollectionPageContainer}
                /> 
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);