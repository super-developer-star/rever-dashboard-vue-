function isCoach (store) {
  let account = store.getters.getAccount

  if (account.isOwner) {
    return true
  }
  else if (account.isAdmin) {
    return true
  }
  else if (account.isCoach) {
    return true
  }
  else {
    return false
  }
}

export default isCoach
