import { connect } from 'react-redux';
import App from '../app';

function mapStoreToProps(store) {
    return {
        nav: store.App.nav,
        id: store.App.id
    };
}

export default connect(mapStoreToProps)(App);