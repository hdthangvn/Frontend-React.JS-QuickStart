import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions'; 

class HomeHeader extends Component {
    changeLanguage = (language) => { // call redux action
        this.props.changeLanguageAppRedux(language); // change language in redux
        // fire redux event : action
    }
    render() {
        console.log('check props', this.props);
        let language = this.props.language; // cái props này được lấy trong Redux ra chứ không phải truyền từ cha sang con (conponent)
        console.log('check language', language);
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} />
                        </div>
                        <div className="center-content">
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.speciality'/></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.health-facility'/></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-room"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.doctor'/></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-doctor"/></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.fee'/></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.check-health"/></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className='support'><i className="fas fa-question-circle"></i>Hỗ trợ</div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : "language-vi"}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : "language-en"}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1"/></div>
                        <div className='title2'><FormattedMessage id="banner.title2"/></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm kiếm...' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-hospital"></i></div>
                            <div className='text-child'><FormattedMessage id="banner.child1"/></div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'><i className="fa-solid fa-phone-volume"></i></div>
                            <div className='text-child'><FormattedMessage id="banner.child2"/></div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-procedures"></i></div>
                            <div className='text-child'><FormattedMessage id="banner.child3"/></div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-flask"></i></div>
                            <div className='text-child'><FormattedMessage id="banner.child4"/></div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-user-md"></i></div>
                            <div className='text-child'><FormattedMessage id="banner.child5"/></div>
                        </div>

                        <div className='option-child'>
                            <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                            <div className='text-child'><FormattedMessage id="banner.child6"/></div>
                        </div>
                        </div>
                    </div>  
                </div>
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)), 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader); // connect redux with react component
