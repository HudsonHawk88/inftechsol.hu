import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header/Header'
import PublicHeader from '../components/Header/PublicHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';

const Full = (props) => {
    return(
        <>
            {props && props.authenticated && props.isAdmin ? (
                <>
                    <Header {...props} />
                    <Sidebar {...props} />
                </>
            ) : (
                !props.isAdmin && <PublicHeader {...props} />
            )}
            <main id={props.authenticated && props.isAdmin ? "content" : "public-content"} className={props.authenticated && props.isAdmin ? "content" : "public-content container-fluid"}>
                {props.children}
            </main>
            {!props.isAdmin && (
                <Footer />
            )}
        </>
    );
}

export default Full;

Full.propTypes = {
    children: PropTypes.object
}