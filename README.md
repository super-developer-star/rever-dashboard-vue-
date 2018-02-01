# rever-dashboard

The application is located in the /src directory. The entrypoint is the main.js file, which is going to use the div id="app" element to insert the HTML.

The router is located at src/routes.js and all components need to be imported in this file. The file should be easy to understand.

The main component is App.vue, which acts as the parent component of the rest of the components. It includes several methods that can be used inside any child component.

Directories:

#### /src/api
This directory includes method calls to the API. The directory is organized by endpoints. The index.js is a placeholder so we don't have to reference each file inside the API on each of the components. If you need to add a new file to the api directory, add the file here as well so the api object has a reference to each of the files in src/api.

#### /src/lib
The lib directory has utils and helper methods.

#### /src/components
The components directory has all the components organized by feature. Each of the directories may have several components.

Each '.vue' file is a component. The .vue file will have three sections, a template section with all the HTML, a style section with custom CSS styles and a script section with an object that is exported.

## About Vue
Vue is organized in components. Each component will have multiple properties that are defined on the API. It is not possible to define custom properties on the object.

### Properties

#### data
The data property is how we reference a v-model on the template. It must be a method that returns an object with all the properties that we use on our template component. We need to define the property before we can use it on the template.

#### created / mounted
The created and mounted methods are moments defined during the component cycle. Created is called before mounted, and mounted is called just before the component has completed loading. We can use these methods to validate or perform actions.

#### components
This is where we reference any child compoment that we need to call. If we want to use a `<menu>` element on the template, we must define a Menu component.

#### methods
Any method that we need on our component must be defined here. If we want to call any method from another method, we will use this.methodName.

#### computed and asyncComputed
These are properties, just like data, that we want to use on our template. The difference is that computed is sync and asyncComputed is async.

### Parent component
At all times, we can access the parent component using this.$parent, so if we have a method 'showLoader' on the parent component, we can call it with this.$parent.showLoader()

## Store
The store is a special place where we keep the state of the application. The store is instantiated on the src/store/index.js file. All the possible mutations are registered on globalMutations-types.js and inside the modules directory, we have each of the possible states and actions that we want to perform.

An action will perform a mutation using the method context.commit and pass a payload to the mutation. On the mutations, we will set the state using the payload that we get from the action.

An action can be async, a mutation cannot. An action is executed by calling this.$store.dispatch

A good example of how the store is used is the Access.vue component.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Git Strategy
We use Git Rebase instead of Git Merge and we work directly on master.

Workflow:

1. Code
2. Commit
3. Before doing any push do `git fetch origin master`
4. Then do `git rebase origin/master`
5. Now push with `git push origin master`

If you use local branches, don't push them to the server, rebase to master by doing `git rebase my-local-dev-branch` and then sync with the server.

_If you have a merge conflict, just fix it_
