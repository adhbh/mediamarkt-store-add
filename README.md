# Medimark Store App

Submited by: Adheesh Bhatia

Email: adheeshbhatia@gmail.com

## How to run Demo

#### Prerequisites
Install [Expo Go](https://expo.dev/client) app on Android phone. Note that the app has been tested on Android on actual device and on IOS simulator. Hence, some features like Barcode Scanner might not work on IOS.

#### Installation and running demo locally

1. Clone the repository
```bash
$ git clone git@github.com:adhbh/mediamarkt-store-add.git
```
2. Install dependencies
3.
```bash
$ yarn install
```
3. Run the demo
```bash
$ yarn start
```
4. QR code will display in terminal. Scan the displayed QR code using Expo Go app

#### Installation using Demo apk

Note: The apk is old but has all the features as listed below. I was not able to generate another build using Expo EAS because of quota limit. However, you can still test it using this build because it covers all the User Stories mentioned below.

1. [Download apk](https://drive.google.com/file/d/1R0UoPgghhzGWv_9P27LaRhIreMaL_C5I/view?usp=sharing)

2. Install on Android Device

3. Open `ts-expo-skeleton` app installed on your device.

## User stories

### 1. Add Parcel Manually

#### Add new parcels by entering the parcel id and carrier id manually.

- User can click the "+" button to enter new parcel id manually

![alt text](https://i.postimg.cc/T3rygnhq/Screenshot-2023-03-28-at-00-20-07.png)

- An easy interface that lets user choose from list of Carriers. So he does not need to remember Carrier Ids.

![alt text](https://i.postimg.cc/q7qzYSjQ/Screenshot-2023-03-28-at-00-25-45.png)

#### Validations

- Parcel that does not exist in the system can not be added.

- There can only be one carrier assigned to a parcel. If Parcel is already added and assigned to a carrier, then it can not be added again.

![alt text](https://i.postimg.cc/KvYSnbz9/Screenshot-2023-03-28-at-00-29-11.png)

- Carrier Id has to be selected, otherwise user sees the error.


### 2. Add Parcel using Barcode

#### Add new parcels by scanning the parcel barcode

- User can click on "Scan" button to open barcode scanner and scan a parcel label.

![alt text](https://i.postimg.cc/jSRkhztQ/Screenshot-2023-03-28-at-01-55-00.png)

- User can select the Carrier and add the parcel to the Parcels lists.

![alt text](https://i.postimg.cc/SsKh1B4d/Screenshot-2023-03-28-at-02-05-00.png)


#### Validations

- Only parcel ids can be scanned. If user scans some other barcode, then he sees error.

![alt text](https://i.postimg.cc/MKHnfLjy/Screenshot-2023-03-28-at-01-58-29.png)

- All other validations of manual user story like also exist here


### 3. Show Parcels Lists

#### Show the full list of available parcels grouped by pickup date

- User can view the full list of parcels lists grouped and sorted by pickup date

- User can click on a list to view all the parcels for a particular date

![alt text](https://i.postimg.cc/kX7gWp6j/Screenshot-2023-03-28-at-00-33-53.png)

### 4. Parcel Handover

#### Handover with the entry of the driver's name and its license plate

- At time of delivery, user can select a Parcel to view item details

- User can click on Deliver button to initiate handover to Carrier

- User has to manually add Driver's Name and License Plate to handover the courier

![alt text](https://i.postimg.cc/fLx0RSpk/Screenshot-2023-03-28-at-00-41-40.png)

- After parcel is handed over, user can go back to the parcel list to see the updated delivery status

![alt text](https://i.postimg.cc/bvvhv75n/Screenshot-2023-03-28-at-00-48-25.png)

- If parcel is already handed over, user can not handover the same parcel again

![alt text](https://i.postimg.cc/GpS4KwTP/Screenshot-2023-03-28-at-03-06-56.png)


#### Validations

- User sees the error if Carrier doesn't exist with the provider driver name and license plate.

- User sees the error if Carrier was assigned to a different Carrier, but user provided a a different name and license plate.

![alt text](https://i.postimg.cc/7PnmB5hx/Screenshot-2023-03-28-at-00-51-59.png)

## Technical Documentation

### 1. Folder Structure

- `./app`: Folder contains all the Screens
- `./App.tsx`: Start file of the app, it contains the Screen routes
- `./service`: Placeholder for service layer. This is where all the api request handlers will go. Currently, it contains mock APIs
- `./shared`: Components that are shared across screens
- `./storage`: Persistent storage for the App powered by AsyncStorage
- `./types`: Shared Typescript interfaces
- `./contexts`: React contexts

### 2. Routing

Project uses [React Navigation](https://reactnavigation.org/) for navigating between Screens. All the screens can be found in [App.tsx](https://github.com/adhbh/mediamarkt-store-add/blob/main/App.tsx#L31).

### 3. Persistent Storage Strategy

Project uses [Async Storage](https://react-native-async-storage.github.io/async-storage/docs/usage/) as persistent storage to save Parcel to Carrier mapping. I strongly believe that this must be also persisted to backend but I didnt implement it because of shortage of time.

### 4. Assets

Project uses [Expo Vector Icons](https://icons.expo.fyi/) for icons and images.

### 5. Linting and formating

Project uses esLint and Prettier for code formating.

```bash
$ yarn run format
```


### 6. Shared Components and Styles

I have tried to build my own design system for this app and avoided using third-party components.

Following shared components are used across different Screens:

[Alert](https://github.com/adhbh/mediamarkt-store-add/tree/main/shared/Alert): It is used in all screens to show validation errors and success notifications.

[CustomTextInput](https://github.com/adhbh/mediamarkt-store-add/tree/main/shared/TextInput): This is a styled TextInput component with cool animation inspired by Material UI.

[Selector](https://github.com/adhbh/mediamarkt-store-add/tree/main/shared/Selector): Dropdown and Picker components sucks for mobile phones. Hence, I designed my own Selector component. It has mobile-first design and is super user friendly. It has similar animation as CustomTextInput

[BottomSheet](https://github.com/adhbh/mediamarkt-store-add/tree/main/shared/BottomSheet): It is fully customizable BottomSheet component which can be used across screens to take user inputs.

[ListDivider](https://github.com/adhbh/mediamarkt-store-add/tree/main/shared/ListDivider) and Backdrop(https://github.com/adhbh/mediamarkt-store-add/tree/main/shared/Backdrop) are other shared components.

### 6. "Fake" Service Layer

Due to time constraints, I didn't get time to build backend service for this app. Hence, I have mocked the provided JSON data in `./service` folder.

### 7. Carriers Context

Carriers data is fetched using "fake" service layer on the Parcel Lists screen. But I realised that this data is required in Parcel Lists screen, Parcel Detail screen, Carrier Parcel List screen and also in several child components like list items. Hence, it made sense to use React's [Context API](https://legacy.reactjs.org/docs/context.html) to pass data through the component tree.

Hence I created:
a. [ContextProvider](https://github.com/adhbh/mediamarkt-store-add/blob/main/contexts/CarriersContext.tsx#L47): and [wrapped](https://github.com/adhbh/mediamarkt-store-add/blob/main/App.tsx#L21) full app with it so that every component has access to
b. useCarriersState: which is used inside many components to get latest Carriers state.
c. useCarriersDispatch: which is used inside [Parcel Lists](https://github.com/adhbh/mediamarkt-store-add/blob/main/app/parcel-lists/index.tsx#L78) screen to update Carriers state.

### 8. Typescript interfaces

There are [shared interfaces](https://github.com/adhbh/mediamarkt-store-add/tree/main/types) which are in `./types` folder. Component prop types are defined within the component files itself. Most of the code in the project has type definitions and type checking, including for [react navigation stack](https://github.com/adhbh/mediamarkt-store-add/blob/main/types/RootStackParamList.ts).



