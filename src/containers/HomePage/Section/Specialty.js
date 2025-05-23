import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
// import css files
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
class Specialty extends Component {
    render() {
        let settings = {
            dots : false,
            infinite: true,
            speed: 500, 
            slidesToShow: 1,
            slidesToScroll: 1,
        }
        return (
            <div className='section-specialty' >
                <div className='section-content'>
                    <Slider {...settings}>
                    <div className='img-customize'>
                        <h3>1</h3>
                    </div>
                    <div className='img-customize'>
                        <h3>2</h3>
                    </div>
                    <div className='img-customize'>
                        <h3>3</h3>
                    </div>
                    <div className='img-customize'>
                        <h3>4</h3>
                    </div>
                    <div className='img-customize'>
                        <h3>5</h3>
                    </div>
                    <div className='img-customize'>
                        <h3>6</h3>
                    </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => { //tác dụng của hàm này có thể truy cập được changeLanguageAppRedux thông qua this.props 
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty); // connect redux with react component
