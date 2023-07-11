const handleSignUp = async (values, { resetForm }) => {
    const { login, email, password } = values;
    let userProfile = {};
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userData.user;

      if (avatar) {
        const storage = getStorage();
        const storageRef = ref(storage, avatars/${user.uid});
        const response = await fetch(avatar);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const avatarURL = await getDownloadURL(storageRef);

        await updateProfile(user, {
          displayName: login,
          photoURL: avatarURL,
        });
      } else {
        await updateProfile(user, {
          displayName: login,
        });
      }
      userProfile = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        // accessToken: user.accessToken,
        photoURL: user.photoURL,
      };

      dispatch(getUser(userProfile));
      console.log("Hello,", user.displayName);

      setAvatar(null);
      resetForm();
    } catch (error) {
      console.error("Sorry, error occurred. Message:", error);
      console.error("Error details:", error.serverResponse);
      alert(error.message);
    }
};
  
   const userProfile = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      };

      dispatch(addCurrentUser(userProfile));