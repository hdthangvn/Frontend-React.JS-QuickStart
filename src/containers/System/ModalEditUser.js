import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter'; // import emitter từ utils/emitter.js
import _ from 'lodash'; // import lodash để sử dụng hàm cloneDeep



class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:''
        };
        
    }

    componentDidMount() {
        let user = this.props.currentUser; // lấy dữ liệu từ props truyền vào
        if(user && !_.isEmpty(user)) { // kiểm tra xem user có tồn tại và không phải là object rỗng
            this.setState({
                id: user.id, // dung id để sửa user
                email: user.email,
                password: 'hardcode', // không cho phép sửa password
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        
        console.log('didmount edit modal', this.props.currentUser);     
    }

    toggle = () => {
        this.props.toggleFromParent()
        // Thêm logic đóng modal nếu bạn có props truyền vào
    }

    handleOnChangeInput = (event, id) => {
        // bad code.modify state 
        /*
        this.state = {
            email:'',
            password:'',
        }
            this.state.email === this.state.['email']
            Why have '...' in the code ? nó sẽ copy nguyên cái state
            -> tại sao , vì trước đấy mình đã motify state rồi
            -> tại sao nó là BAD CODE , vì sau này mình làm dự án lớn ,component của mình lớn hơn (1 thằng cha sẽ có nhiều tk con, những thằng con nó độc lập dữ liệu với nhau) 
            -> khi mình thay đổi state của tk cha , thì những tk con nó sẽ không biết được là mình đã thay đổi state của tk cha rồi.
            -> dữ liệu sẽ tk đc tk mất
        */

        // this.state.[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state', this.state)
        // })

        /*
        this.setState({
            [id]: event.target.value
        }, () => {
            console.log('check state', this.state);
        });
        // setState là bất đồng bộ, nên mình sẽ không biết được state của mình đã thay đổi hay chưa.
        
        */ 

        // GOOD CODE
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState  
        });
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i = 0; i < arrInput.length; i++) {
            console.log('check input', this.state[arrInput[i]], arrInput[i]);
            if(!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid; 
    }
    handleSaveUser = () => {
      this.checkValideInput();
        let isValid = this.checkValideInput();
        if(isValid === true) {
            // call API edit user
            this.props.editUser(this.state);
        }
    }
    

    render() {
        
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => this.toggle()} 
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Edit a new user</ModalHeader>
                <ModalBody>
                    
                            <div className='modal-user-body'>
                                <div className='input-container '>
                                    <label>Email</label>
                                    <input type="text" onChange={(event)=> {this.handleOnChangeInput(event, "email")}}
                                    value={this.state.email}
                                    disabled/>// không cho phép sửa email
                                </div>
                                <div className='input-container'>
                                    <label>Password</label>
                                    <input type="password" onChange={(event)=> {this.handleOnChangeInput(event, 'password')}}
                                    value={this.state.password}
                                    disabled/> // không cho phép sửa password
                                </div>
                                <div className='input-container '>
                                    <label>Firsts Name</label>
                                    <input type="text" onChange={(event)=> {this.handleOnChangeInput(event, 'firstName')}}
                                    value={this.state.firstName}/>
                                </div>
                                <div className='input-container'>
                                    <label>Last Name</label>
                                    <input type="text" onChange={(event)=> {this.handleOnChangeInput(event, 'lastName')}}
                                    value={this.state.lastName}/>
                                </div>
                                <div className='input-container max-width-input'>
                                    <label>Address</label>
                                    <input type="text" onChange={(event)=> {this.handleOnChangeInput(event, 'address')}}
                                    value={this.state.address}/>
                                </div>
                            </div>
                            
                        
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => this.handleSaveUser()}>Save changes</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => this.toggle()}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
