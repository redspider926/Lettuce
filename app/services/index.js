import request from './request';
import {Api} from './api';

function register(phoneNumber, name, email) {
  const data = {
    phoneNumber: phoneNumber,
    name: name,
    email: email,
  };
  return request(Api.API_BASE, {
    url: Api.REGISTER,
    method: 'POST',
    data,
  });
}

function login(phoneNumber) {
  const data = {
    phoneNumber: phoneNumber,
  };
  return request(Api.API_BASE, {
    url: Api.LOGIN,
    method: 'POST',
    data,
  });
}

function updateAvatar(token, avatar) {
  const data = {
    token: token,
    avatar: avatar,
  };
  return request(Api.API_BASE, {
    url: Api.UPDATE_AVATAR,
    method: 'POST',
    data,
  });
}

function updateName(token, name) {
  const data = {
    token: token,
    name: name,
  };
  return request(Api.API_BASE, {
    url: Api.UPDATE_NAME,
    method: 'POST',
    data,
  });
}

function updateEmail(token, email) {
  const data = {
    token: token,
    email: email,
  };
  return request(Api.API_BASE, {
    url: Api.UPDATE_EMAIL,
    method: 'POST',
    data,
  });
}

function createItem(token, image, title, category, size, description) {
  const data = {
    token: token,
    image: image,
    title: title,
    category: category,
    size: size,
    description: description,
  };
  return request(Api.API_BASE, {
    url: Api.CREATE_ITEM,
    method: 'POST',
    data,
  });
}

function updateItem(token, _id, image, title, category, size, description) {
  const data = {
    token: token,
    _id: _id,
    image: image,
    title: title,
    category: category,
    size: size,
    description: description,
  };
  return request(Api.API_BASE, {
    url: Api.UPDATE_ITEM,
    method: 'POST',
    data,
  });
}

function deleteItem(token, _id) {
  const data = {
    token: token,
    _id: _id,
  };
  return request(Api.API_BASE, {
    url: Api.DELETE_ITEM,
    method: 'POST',
    data,
  });
}

function getUserItems(token, owner) {
  const data = {
    token: token,
    owner: owner,
  };
  return request(Api.API_BASE, {
    url: Api.GET_USER_ITEMS,
    method: 'POST',
    data,
  });
}

function getFeedItems(token) {
  const data = {
    token: token,
  };
  return request(Api.API_BASE, {
    url: Api.GET_FEED_ITEMS,
    method: 'POST',
    data,
  });
}

function voteItem(token, owner, product, isLiked) {
  const data = {
    token: token,
    owner: owner,
    product: product,
    isLiked: isLiked,
  };
  return request(Api.API_BASE, {
    url: Api.VOTE_ITEM,
    method: 'POST',
    data,
  });
}

function updateSetting(token, setting) {
  const data = {
    token: token,
    setting: setting,
  };
  return request(Api.API_BASE, {
    url: Api.UPDATE_SETTING,
    method: 'POST',
    data,
  });
}

export default {
  register,
  login,
  updateAvatar,
  createItem,
  updateItem,
  deleteItem,
  getUserItems,
  getFeedItems,
  voteItem,
  updateName,
  updateEmail,
  updateSetting,
};
