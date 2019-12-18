import React from 'react';
import { sendMessageCreator, deleteMessage } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux'

let mapStateToProps = (state) => {
    return{
        dialogsPage: state.dialogsPage,
    }
};

let mapDispatchToProps = (dispatch) => {
    return{
        sendMessage: (newMessageBody) => {
            dispatch( sendMessageCreator(newMessageBody) )
        },
        deleteMessage: (messageId) => {
            dispatch( deleteMessage(messageId) )
        } ,
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)