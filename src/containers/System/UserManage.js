import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';  // import { emitter } from '../../utils/emitter'; // import emitter từ utils/emitter.js


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }
    }

    async componentDidMount() {
         await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        console.log("API response:", response);
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
        
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    createNewUser = async(data) => {
        try {
            let response = await createNewUserService(data);
            if(response && response.errCode === 0) {
                this.setState({
                    isOpenModalUser: false
                })
                await this.getAllUsersFromReact(); // gọi lại API để lấy danh sách mới
                emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id': 'your id'}); // clear data modal
            } else {
                alert(response.errMessage);
            }
            console.log("check response", response);
        } catch (e) {
            console.log(e);
        }
        console.log('check data', data)
        
    }

    handleDeleteUser = async(user) => {
        console.log('delete user', user);
        try {
            let response = await deleteUserService(user.id);
            console.log('check delete user', response);
            if(response && response.errCode === 0) {
                await this.getAllUsersFromReact(); // gọi lại API để lấy danh sách mới

            } else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e)  ;
        }
    }
    /*  Life cyce
        Run conponent:
        1. Run construct -> init state
        2. Did mount (set state) : unmount , nó did mount chỉ 1 lần 
        3. Render (re-render) nhưng nó của thể render nhiều lần , muốn nó chạy lại phải dùng setState
    */ 
    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal} // dùng funcsion bình thường ko cần thiết dùng arron fun
                    createNewUser={this.createNewUser} // dùng arron fun để truyền tham số cho nó
                />
                <div className="title text-center">Manage users with DucThang</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                    onClick={()=>this.handleAddNewUser()}><i className="fas fa-plus"></i>Add new users</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>

                    
                    {arrUsers && arrUsers.map((item, index) => {
                            return (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                    <button className="btn-delete" onClick={()=>this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                            );
                        })} 
                    </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
