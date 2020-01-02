const SEND_MESSAGE = 'SEND-MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimyan'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
],
    messages: [
    {id: 1,message: 'Hi'},
    {id: 2,message: 'How are you?'},
    {id: 3,message: 'Cepaso paradocs'},
    {id: 4,message: 'Yo'},
    {id: 5,message: 'BlaBlaBla'},
    ],
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE :
                let body = action.newMessageBody;
                return {
                    ...state,
                    messages: [...state.messages, {id: 6, message: body}]
                };

                case DELETE_MESSAGE: 
                    return {...state, messages: state.messages.filter(m => m.id !== action.messageId) }
                ;

        default :
             return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export const deleteMessage = (messageId) => ({type: DELETE_MESSAGE, messageId});

export default dialogsReducer;