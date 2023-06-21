<Tab.Navigator
  screenOptions={({ route, navigation }) => ({
    title: "Публікації",
    headerStyle: {
      borderBottomColor: "#E8E8E8",
      borderBottomWidth: 1,
      height: 60,
      backgroundColor: "#FFFFFF",
    },
    headerTintColor: "#212121",
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.408,
    },
    headerRight: () => {
      if (route.name === "Posts") {
        return (
          <LogoutButton onPress={() => alert("This is a button!")}>
            <LogoutSVG />
          </LogoutButton>
        );
      } else {
        return null;
      }
    },
    headerLeft: () => {
      if (route.name === "CreatePost" || route.name === "Comments") {
        return (
          <TouchableOpacity
            style={{ marginLeft: 16 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={24} color="#212121" />
          </TouchableOpacity>
        );
      } else {
        return null;
      }
    },
    tabBarStyle: {
      height: 60,
      paddingRight: 90,
      paddingLeft: 90,
      paddingTop: 9,
      paddingBottom: 0,
    },
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === "Posts") {
        iconName = "grid-outline";
      } else if (route.name === "CreatePost") {
        iconName = "ios-add-sharp";
      } else if (route.name === "UserProfile") {
        iconName = "person-outline";
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveBackgroundColor: "#FF6C00",
    tabBarItemStyle: {
      height: 40,
      borderRadius: 20,
    },
    tabBarContentContainerStyle: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: 70,
    },
    tabBarShowLabel: false,
    tabBarActiveTintColor: "#FFFFFF",
    tabBarInactiveTintColor: "gray",
  })}
>
  <Tab.Screen
    name="Posts"
    component={Posts}
    options={{
      headerRight: () => (
        <LogoutButton onPress={() => alert("Sure?")}>
          <LogoutSVG />
        </LogoutButton>
      ),
    }}
  />
  <Tab.Screen
    name="CreatePost"
    component={CreatePost}
    options={{
      title: "Створити публікацію",
      tabBarStyle: { display: "none" },
    }}
  />
  <Tab.Screen
    name="UserProfile"
    component={UserProfileScreen}
    options={{ headerShown: false, tabBarVisible: false }}
  />
  <Tab.Screen
    name="Comments"
    component={CommentsScreen}
    options={{
      tabBarVisible: false,
      title: "Коментарі",
      tabBarStyle: { display: "none" },
    }}
  />
</Tab.Navigator>;
