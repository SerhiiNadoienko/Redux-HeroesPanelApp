# Redux-HeroesPanelApp

## **Please notice**

I've been working with a local JSON-server, so you won't be able to see heroes or filters when [deploying](https://redux-app-sandy.vercel.app/).
Below I described how you can use the application, thank you so much for understanding.

![screenshot](https://psv4.userapi.com/c237031/u143424630/docs/d11/585dddc81190/redux_errors.png?extra=E4kCHVSIX7ObdoVkQrdAmp_riq7vBo4vZWquinMWcQt1LRCzRDXoqdoJzfUvMsQu8RpzdA6fceIKnYElFAQTorUuFmpAagPoLbElhgCTn-qqtOaZ-1Hx5d6JLg5DWLQfsJ24KdLweVkUDEC17SExyt9d)

### **Usage tutorial**

1. To work correctly with the JSON server, download or clone this repository, please

```
git clone https://github.com/SerhiiNadoienko/Redux-HeroesPanelApp.git newFolder
```

2. Make sure that you are in the *newFolder* folder and enter the `npm install` command in the console

```
   npm install
```

3.Enter `npm start` in the console.You don't need to run the JSON-server because I used the library [**concurrently**](https://www.npmjs.com/package/concurrently). And now I'm running a JSON-server and a project at the same time.

```
npm start
```

---

## **Description**

**HeroesPanelApp -** is an application for creating characters and assigning elements to them.

At first, the application was completely written in regular Redux, but later it was rewritten in Redux Toolkit, which is much more convenient and helped to reduce the code at times.

**Functionality**

- Adding and removing a character and selecting an item
- filtering by elements

### **Details**

- I used createEntityAdapter to work with Slice, which made the code clearer and shorter
- I divided into separate Slices the work with filtering and the creation of heroes
- By deleting or adding a character, it is also deleted and added to the local-server
- I used **RTK Query** to communicate with the server. Location: `src/api/apiSlice.js`

### **Tools**

![React](https://img.shields.io/badge/-React-090909?style=for-the-badge&logo=React&logoColor=61DBFB)
![Redux](https://img.shields.io/badge/-Redux-090909?style=for-the-badge&logo=Redux&logoColor=563d7c)
![SCSS](https://img.shields.io/badge/-SCSS-090909?style=for-the-badge&logo=SASS&logoColor=CD6799)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-090909?style=for-the-badge&logo=Bootstrap&logoColor=563d7c)

---

## **Deployment:** [Click here](https://redux-app-sandy.vercel.app/)
