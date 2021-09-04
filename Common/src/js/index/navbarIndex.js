import { connect } from 'react-redux';
import Navbar from '../components/navbar';

function mapStoreToProps(store) {
    return {
        nav: store.App.nav,
        id: store.App.id
    };
}

export default connect(mapStoreToProps)(Navbar);