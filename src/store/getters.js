const getters = {
  userInfo: (state) => state.user.userInfo,
  token: (state) => state.user.token,
  collapse: (state) => state.setting.collapse,
  pageHeaderHeight: (state) => state.user.pageHeaderHeight
};
export default getters;
