import Organizations from './components/Organizations/Organizations.vue'
import OrganizationView from './components/Organizations/OrganizationView.vue'
import OrganizationEdit from './components/Organizations/OrganizationEdit.vue'
import OrganizationCreate from './components/Organizations/OrganizationCreate.vue'
import People from './components/People/People.vue'
import Profile from './components/People/Profile.vue'
import OrganizationStream from './components/Stream/OrganizationStream.vue'
import UserStream from './components/Stream/UserStream.vue'
import Challenger from './components/Challenger/Challenger.vue'
// import RevCreate from './components/Rev/RevCreate.vue'
import RevCreateFlow from './components/Rev/RevCreateFlow.vue'
import RevView from './components/Rev/RevView.vue'
import Access from './components/Access/Access.vue'
import Register from './components/Access/Register.vue'
import Logout from './components/Access/Logout.vue'
import Error404 from './components/Errors/404.vue'
import Error500 from './components/Errors/500.vue'
import UserSettings from './components/User/UserSettings.vue'
// import Sandbox from './components/utils/Sandbox.vue'

const routes = [{
  path: '/',
  component: OrganizationStream
}, {
  path: '/404',
  component: Error404
}, {
  path: '/500',
  component: Error500
}, {
  path: '/organizations',
  component: Organizations
}, {
  path: '/organizations/create',
  component: OrganizationCreate
}, {
  path: '/organizations/:organizationId',
  component: OrganizationView
}, {
  path: '/organizations/:organizationId/edit',
  component: OrganizationEdit
}, {
  path: '/challenger',
  component: Challenger
}, {
  path: '/access',
  component: Access
}, {
  path: '/register/:invitationId',
  component: Register
}, {
  path: '/logout',
  component: Logout
}, {
  path: '/stream',
  component: OrganizationStream
}, {
  path: '/stream/user',
  component: UserStream
}, {
  path: '/people',
  component: People
}, {
  path: '/profile/:userId',
  component: Profile
}, {
  path: '/rev/create',
  component: RevCreateFlow
}, {
  path: '/rev/:revId',
  component: RevView
}, {
  path: '/settings',
  component: UserSettings
}]

export default routes
