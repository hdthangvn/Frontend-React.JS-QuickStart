import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:''
        };
    }

    componentDidMount() {}

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
    handleAddNewUser = () => {
      this.checkValideInput();
        let isValid = this.checkValideInput();
        if(isValid === true) {
            console.log('check props', this.props);
            this.props.createNewUser(this.state);
        }
    }
    

    render() {
        console.log('check child open modal', this.props.isOpen);
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => this.toggle()} 
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>
                    
                            <div className='modal-user-body'>
                                <div className='input-container '>
                                    <label>Email</label>
                                    <input type="text" onChange={(event)=> {this.handleOnChangeInput(event, "email")}}
                                    value={this.state.email}/>
                                </div>
                                <div className='input-container'>
                                    <label>Password</label>
                                    <input type="password" onChange={(event)=> {this.handleOnChangeInput(event, 'password')}}
                                    value={this.state.password}/> 
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
                    <Button color="primary" className='px-3' onClick={() => this.handleAddNewUser()}>Add new</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
