import { withProps } from "recompose";
import { jhapiRequest } from "./jhapiUtil";

const withAPI = withProps(() => ({
  updateUsers: (offset, limit, name_filter) =>
    jhapiRequest(
      `/users?offset=${offset}&limit=${limit}&name_filter=${name_filter || ""}`,
      "GET"
    ).then((data) => data.json()),
  updateGroups: (offset, limit) =>
    jhapiRequest(`/groups?offset=${offset}&limit=${limit}`, "GET").then(
      (data) => data.json()
    ),
  shutdownHub: () => jhapiRequest("/shutdown", "POST"),
  startServer: (name, serverName = "") =>
    jhapiRequest("/users/" + name + "/servers/" + (serverName || ""), "POST"),
  stopServer: (name, serverName = "") =>
    jhapiRequest("/users/legacy/" + name + "/servers/" + (serverName || ""), "POST"),
  startAll: (names) =>
    names.map((e) => jhapiRequest("/users/" + e + "/server", "POST")),
  stopAll: (names) =>
    names.map((e) => jhapiRequest("/users/legacy/" + e + "/server", "POST")),
  addToGroup: (users, groupname) =>
    jhapiRequest("/groups/" + groupname + "/users", "POST", { users }),
  removeFromGroup: (users, groupname) =>
    jhapiRequest("/groups/legacy/" + groupname + "/users", "POST", { users }),
  createGroup: (groupName) => jhapiRequest("/groups/" + groupName, "POST"),
  deleteGroup: (name) => jhapiRequest("/groups/legacy/" + name, "POST"),
  addUsers: (usernames, admin) =>
    jhapiRequest("/users", "POST", { usernames, admin }),
  editUser: (username, updated_username, admin) =>
    jhapiRequest("/users/legacy/modify/" + username, "POST", {
      name: updated_username,
      admin,
    }),
  deleteUser: (username) => jhapiRequest("/users/legacy/delete/" + username, "POST"),
  findUser: (username) => jhapiRequest("/users/" + username, "GET"),
  validateUser: (username) =>
    jhapiRequest("/users/" + username, "GET")
      .then((data) => data.status)
      .then((data) => (data > 200 ? false : true)),
  // Temporarily Unused
  failRegexEvent: () => {
    return null;
  },
  noChangeEvent: () => {
    return null;
  },
  //
  refreshGroupsData: () =>
    jhapiRequest("/groups", "GET").then((data) => data.json()),
  refreshUserData: () =>
    jhapiRequest("/users", "GET").then((data) => data.json()),
}));

export default withAPI;
