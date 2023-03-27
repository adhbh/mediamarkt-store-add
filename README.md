# Medimark Store App

Submited by: Adheesh Bhatia

Email: adheeshbhatia@gmail.com

## How to run Demo

#### Prerequisites
Install [Expo Go](https://expo.dev/client) app on Android phone. Note that the app has been tested on Android on actual device and on IOS simulator. Hence, some features like Barcode Scanner might not work on IOS.

#### Installation and running demo

1. Clone the repository
```bash
$ git clone git@github.com:adhbh/mediamarkt-store-add.git
```
2. Install dependencies
```bash
$ yarn install
```
3. Run the demo
```bash
$ yarn start
```
4. QR code will display in terminal. Scan the displayed QR code using Expo Go app

## User stories

### 1. Add Parcel Manually

#### Add new parcels by entering the parcel id and carrier id manually.

#### There can only be one carrier assigned to a parcel

### 2. Add Parcel using Barcode

#### Add new parcels by scanning the parcel barcode

### 3. Show Parcels Lists

#### Show the full list of available parcels grouped by pickup date

#### Show the parcel and items details inside of parcel lists

### 4. Show Parcels Lists

#### Show the full list of available parcels grouped by pickup date

#### Show the parcel and items details inside of each parcel list

### 5. Parcel Handover

#### Handover with the entry of the driver's name and its license plate.

#### Validate if the supplied carrier exists

#### Validate if the correct carrier is picking up the parcel
