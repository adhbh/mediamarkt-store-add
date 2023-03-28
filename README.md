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

- User can click the "+" button to enter new parcel id manually

![alt text](https://i.postimg.cc/T3rygnhq/Screenshot-2023-03-28-at-00-20-07.png)

- An easy interface that lets user choose from list of Carriers. So he does not need to remember Carrier Ids.

![alt text](https://i.postimg.cc/q7qzYSjQ/Screenshot-2023-03-28-at-00-25-45.png)

#### Validations

- Parcel that does not exist in the system can not be added.

- There can only be one carrier assigned to a parcel. If Parcel is already added and assigned to a carrier, then it can not be added again.

![alt text](https://i.postimg.cc/KvYSnbz9/Screenshot-2023-03-28-at-00-29-11.png)


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


#### Validations

- User sees the error if Carrier doesn't exist with the provider driver name and license plate.

- User sees the error if Carrier was assigned to a different Carrier, but user provided a a different name and license plate.

![alt text](https://i.postimg.cc/7PnmB5hx/Screenshot-2023-03-28-at-00-51-59.png)

