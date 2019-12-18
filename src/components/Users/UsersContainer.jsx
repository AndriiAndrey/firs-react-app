import React from 'react';
import classes from './Users.module.css';
import {connect} from 'react-redux';
import {follow, unfollow, setCurrentPage,toggleFollowingProgress,requestUsers} from '../../redux/users-reducer';
import Users from './Users';
import * as axios from 'axios';
import Preloader from '../../Common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsers,getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, } from '../../redux/users-selectors';

class UsersContainer extends React.Component {

    componentDidMount(){

        const {requestUsers, currentPage, pageSize} = this.props;
        requestUsers(currentPage, pageSize);
        }

        onPageChanged = (pageNumber) => {
            const {requestUsers,pageSize } = this.props;
            requestUsers(pageNumber, pageSize);
        }

    render(){
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            
            <Users 
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
        />
        </>
        }
}
 

let mapStateToProps = (state) => {
    return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    //withAuthRedirect,
    connect(mapStateToProps,
    {follow, unfollow,setCurrentPage,toggleFollowingProgress,requestUsers})
)(UsersContainer)