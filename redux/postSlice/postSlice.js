import { createSlice } from "@reduxjs/toolkit";

const postInitialState = {
  postContent: {
    imageURI: "",
    title: "",
    location: "",
    position: {
      latitude: "",
      longitude: "",
    },
  },
  likes: 0,
  comments: {
    count: 0,
    content: {
      author: "",
      text: "",
    },
  },
};

export const postSlice = createSlice({
  name: "postSlice",
  initialState: postInitialState,
  reducers: {
    addPost(state, action) {
      state.postContent.imageURI = action.payload.imageURI;
      state.postContent.title = action.payload.title;
      state.postContent.location = action.payload.location;
    },
    addPosition(state, action) {
      state.postContent.position.latitude = action.payload.latitude;
      state.postContent.position.longitude = action.payload.longitude;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchLogout.fulfilled, (state, action) => {
  //         state.contacts.items = [];
  //         state.contacts.isLoading = false;
  //         state.filter = "";
  //       })
  //       .addCase(fetchAllContacts.fulfilled, (state, action) => {
  //         state.contacts.items = action.payload;
  //       })
  //       .addCase(addContact.fulfilled, (state, action) => {
  //         state.contacts.items.push(action.payload);
  //       })
  //       .addCase(deleteContact.fulfilled, (state, action) => {
  //         const itemIndex = state.contacts.items.findIndex(
  //           (contact) => contact.id === action.payload
  //         );
  //         state.contacts.items.splice(itemIndex, 1);
  //       })
  //       .addMatcher(
  //         (action) => action.type.endsWith("/pending"),
  //         (state, action) => {
  //           state.contacts.error = null;
  //           state.contacts.isLoading = true;
  //         }
  //       )
  //       .addMatcher(
  //         (action) => action.type.endsWith("/rejected"),
  //         (state, action) => {
  //           state.contacts.isLoading = false;
  //           state.contacts.error = action.payload;
  //         }
  //       )
  //       .addMatcher(
  //         (action) => action.type.endsWith("/fulfilled"),
  //         (state, action) => {
  //           state.contacts.isLoading = false;
  //           state.contacts.error = null;
  //         }
  //       );
  //   },
});

export const { addPost, addPosition } = postSlice.actions;
