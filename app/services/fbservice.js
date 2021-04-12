import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const phoneNumberSend = (
  phoneNumber,
  thenCb = () => {},
  catchCb = () => {},
  finallyCb = () => {},
) => {
  auth()
    .signInWithPhoneNumber(phoneNumber)
    .then(thenCb)
    .catch(catchCb)
    .finally(finallyCb);
};

export const verifyPhoneNumber = (confirmation, code) => {
  let isSuccess = false;
  try {
    confirmation.confirm(code);
    isSuccess = true;
  } catch {
    isSuccess = false;
  }
  return {isSuccess: isSuccess};
};

export const login = (
  userId,
  thenCb = () => {},
  catchCb = () => {},
  finallyCb = () => {},
) => {
  database()
    .ref('users/' + userId)
    .once('value')
    .then(thenCb)
    .catch(catchCb)
    .finally(finallyCb);
};

export const register = (
  userId,
  phoneNumber,
  name,
  email,
  thenCb = () => {},
  catchCb = () => {},
  finallyCb = () => {},
) => {
  database()
    .ref('users/' + userId)
    .set({
      phoneNumber: phoneNumber,
      name: name,
      email: email,
    })
    .then(thenCb)
    .catch(catchCb)
    .finally(finallyCb);
};

export const getProfile = (
  userId,
  thenCb = () => {},
  catchCb = () => {},
  finallyCb = () => {},
) => {
  database()
    .ref('users/' + userId)
    .once('value')
    .then((result) => {
      const {name, avatar, items} = result.val();
    })
    .catch((error) => {});
};

export const getFeedItems = () => {};

export const createItem = (
  ownerId,
  title,
  category,
  size,
  description,
  image,
) => {};

export const updateItem = (
  userId,
  itemId,
  title,
  category,
  size,
  description,
  image,
) => {};

export const deleteItem = (itemId) => {};

export const voteItem = (userId, ownerId, itemId, vote) => {};

export const acceptChat = (chatId) => {};

export const rejectChat = (chatId) => {};

export const sendMessage = (userId, chatId, messageId, text, image) => {};

export const deleteMessage = (userId, chatId, messageId) => {};

export const editMessage = (userId, chatId, messageId, text) => {};

export const getMessages = (userId, chatId) => {};

export const getChats = (userId) => {};
